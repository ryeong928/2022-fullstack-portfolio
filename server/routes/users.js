const users = require('express').Router()
const Model = require('../models')
const Bcrypt = require('bcryptjs')
const {auth, imgUpload} = require('../middlewares')
const {v4:uuid} = require('uuid')
const fs = require('fs')
const {promisify} = require('util')
const fileUnlink = promisify(fs.unlink)

// 회원가입
users.post("", imgUpload.single("img"), async (req, res) => {
  try{
    const params = JSON.parse(req.body.params)
    const session = uuid()
    const img = req.file ? req.file.filename: ""
    const hash = await Bcrypt.hash(params.ps, 5)
    const [id, nickname] = await Promise.all([
      Model.User.find({id: params.id}),
      Model.User.find({nickname: params.nickname})
    ])
    if(id[0]) throw new Error("이미 사용된 아이디입니다")
    if(nickname[0]) throw new Error("이미 사용된 닉네임입니다")
    const user = await new Model.User({...params, session, ps: hash, img}).save()
    return res.json({session})
  }catch(err){
    // 회원가입 실패시, 저장된 프로필 이미지 삭제
    if(req.file) await fileUnlink(`./img${req.file.filename}`)
    console.log('회원가입 에러: ', err)
    return res.status(400).send(err.message)
  }
})
// 로그인
users.patch('/login', async (req, res) => {
  try{
    const {id, ps} = req.body
    const user = await Model.User.findOne({id})
    if(!user) throw new Error("존재하지 않는 아이디입니다")
    const isValid = await Bcrypt.compare(ps, user.ps)
    if(!isValid) throw new Error("비밀번호가 일치하지 않습니다")
    const session = uuid()
    user.session = session
    await user.save()
    return res.json({session})
  }catch(err){
    console.log("로그인 에러: ", err)
    return res.status(400).send(err.message)
  }
})
// 회원정보
users.get("/:session", auth, async (req, res) => {
  try{
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")
    const {_id, nickname, img, createdAt} = user.toObject()
    const dateObj = new Date(createdAt)
    const date = `${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")} ${String(dateObj.getHours()).padStart(2,"0")}:${String(dateObj.getMinutes()).padStart(2,"0")}:${String(dateObj.getSeconds()).padStart(2,"0")}`
    const temp = {_id, nickname, img, date}
    return res.json(temp)
  }catch(err){
    console.log("session 회원정보 에러: ", err)
    return res.status(400).send(err.message)
  }
})
// 사적정보
users.get("/private/:session", auth, async (req, res) => {
  try{
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")
    const {private} = user
    return res.json(private)
  }catch(err){
    console.log("사적정보 요청 에러: ", err)
    return res.status(400).send(err.message)
  }
})
// 로그아웃
users.patch('/logout', async (req, res) => {
  try{
    const {session} = req.body
    const user = await Model.User.findOneAndUpdate({session}, {session: ""})
    if(!user) throw new Error("이미 로그아웃 되었습니다")
    return res.json(true) 
  }catch(err){
    console.log('로그아웃 에러: ', err)
    return res.status(400).send(err.message)
  }
})
// 회원수정
users.patch("", imgUpload.single("img"), async (req, res) => {
  try{
    const {session, deleteImg, ...rest} = JSON.parse(req.body.params)
    if(req.file) rest.img = req.file.filename
    if(rest.ps) rest.ps = await Bcrypt.hash(rest.ps, 5)
    else delete rest.ps
    const user = await Model.User.findOneAndUpdate({session}, {...rest})
    if(!user) throw new Error("재 로그인 해주세요")
    if(deleteImg[0]) await fileUnlink(`./img/${deleteImg}`)
    return res.json(true)
  }catch(err){
    console.log("회원수정 에러: ", err)
    return res.status(400).send(err.message)
  }
})
// 회원탈퇴
users.delete("/:session", async (req, res) => {
  try{
    const {session} = req.params
    const {id, ps} = req.query
    const user = await Model.User.findOne({session})
    if(!user) throw new Error("재 로그인 해주세요")
    if(id !== user.id) throw new Error("아이디가 일치하지 않습니다")
    const isValid = await Bcrypt.compare(ps, user.ps)
    if(!isValid) throw new Error("비밀번호가 일치하지 않습니다")
    // 유저의 댓글 및 댓글 좋아요 삭제
    await Promise.all([
      Model.Post.updateMany({}, {$pull: {comments: {writer: user._id}}}),
      Model.Post.updateMany({'isLike.liker': user._id}, {$inc: {likes: -1}, $pull: {isLike: {liker: user._id}}}),
    ])
    // 유저의 게시글 및 게시글의 이미지 삭제
    const posts = await Model.Post.find({writer: user._id}, {img: 1})
    posts.forEach(async (post) => {
      await post.delete()
      for(let i=0; post.img.length ;i++){
        try{
          await fileUnlink(`./img/${post.img[i]}`)
        }catch{
          console.log("회원탈퇴 이미지 삭제 에러: ", img[i])
        }
      }
    })
    // 유저의 구매 기록 삭제
    await Model.Purchase.deleteMany({buyer: user._id})
    // 유저 프로필 이미지 삭제
    if(user.img) await fileUnlink(`./img/${user.img}`)
    // 유저 삭제
    await user.delete()
    return res.json(true)
  }catch(err){
    console.log("회원탈퇴 에러: ", err)
    return res.status(400).send(err.message)
  }
})

module.exports = {users}