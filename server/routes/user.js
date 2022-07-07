const user = require('express').Router()
const Bcrypt = require("bcryptjs")
const {imageUpload} = require('../middlewares')
const Model = require('../models')

// 회원가입
// 여러개의 사진 업로드시 imageUpload.array("image", 최대갯수), req.file은 배열 형태가 된다
user.post("", imageUpload.single("image"), async(req, res) => {
  try{
    const rest = JSON.parse(req.body.params)
    const hash = await Bcrypt.hash(rest.ps, 5)
    const user = await new Model.User({...rest, ps: hash, img: req.file ? req.file.filename : ""}).save()
    return res.json({session: user.session})
  }catch(err){
    console.log(err)
    return res.status(400).send(err)
  }
})
// 로그인
user.post("/login", async(req, res) => {
  try{
    const {id, ps} = req.body
    const user = await Model.User.findOne({id})
    if(!user) throw ("존재하지 않는 유저입니다")
    const isValid = await Bcrypt.compare(ps, user.ps)
    if(!isValid) throw ("비밀번호가 일치하지 않습니다")
    const session = new Date().getTime()
    user.session = session
    user.save()
    return res.json({session})
  }catch(err){
    console.log(err)
    return res.status(400).send(err)
  }
})
// 개인정보
user.get("/:session", async (req, res) => {
  try{
    const {session} = req.params
    const user = await Model.User.findOne({session})
    if(!user) throw ("재로그인 해주세요")
    const created = new Date(user.createdAt)
    const temp = {
      _id: user._id.toHexString(),
      id: user.id,
      nickname: user.nickname,
      img: user.img,
      points: user.points,
      date: `${created.getFullYear()}-${String(created.getMonth()+1).padStart(2, "0")}-${String(created.getDate()).padStart(2, "0")}`
    }
    return res.json(temp)
  }catch(err){
    console.log(err)
    return res.status(400).send(err)
  }
})
// 로그아웃
user.patch("/logout", async (req, res) => {
  try{
    const {session} = req.body
    const user = await Model.User.findOneAndUpdate({session}, {session: ""})
    if(!user) throw ("이미 로그아웃 되었습니다")
    return res.json({result: true})
  }catch(err){
    console.log(err)
    return res.status(400).send(err)
  }
})
module.exports = {user}