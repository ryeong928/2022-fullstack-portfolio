const posts = require('express').Router()
const Model = require('../models')
const {auth, auth2, imgUpload} = require('../middlewares')
const fs = require('fs')
const {promisify} = require('util')
const fileUnlink = promisify(fs.unlink)

// 게시글 등록
posts.post("", imgUpload.array('img'), auth2, async (req, res) => {
  try{
    const {session, ...rest} = JSON.parse(req.body.params)
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")
    const img = req.files.map(file => file.filename)
    const temp = {
      writer: user._id,
      title: rest.title,
      content: rest.content,
      img,
      comments: []
    }
    const post = await new Model.Post(temp).save()
    return res.json(true)
  }catch(err){
    for(let i=0; i < img.length ;i++){
      try{
        await fileUnlink(`./img/${img[i]}`)
      }catch{
        console.log("게시글 등록 에러 이미지 삭제 에러: ", img[i])
      }
    }
    console.log("게시글 등록 에러: ", err)
    return res.status(400).send(err.message)
  }
})
// 게시글 리스트 요청 | 게시글 검색 리스트 요청
posts.get('/', async (req, res) => {
  try{
    const {search, page} = req.query
    const [posts, count] = await Promise.all([
      Model.Post.find(search === "" ? {} : {title: {$regex: search}}, {writer:1, title:1, likes:1, views:1, comments:1, createdAt:1}).sort({_id: -1}).skip((Number(page)-1)*5).limit(5).populate('writer', ['_id', 'nickname', 'img']),
      Model.Post.find(search === "" ? {} : {title: {$regex: search}}).count()
    ])
    const temp = posts.map(post => {
      const commentCount = post.comments.length
      const temp1 = post.toObject()
      const dateObj = new Date(temp1.createdAt)
      const date = `${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")} ${String(dateObj.getHours()).padStart(2,"0")}:${String(dateObj.getMinutes()).padStart(2,"0")}:${String(dateObj.getSeconds()).padStart(2,"0")}`
      const temp2 = {...temp1, date, commentCount}
      delete temp2.createdAt
      delete temp2.comments
      return temp2
    })
    return res.json({posts: temp, count})
  }catch(err){
    console.log('게시글 리스트 요청 에러: ', err)
    return res.status(400).send(err.message)
  }
})
// 내가 쓴 글 리스트 요청
posts.get('/my', async (req, res) => {
  try{
    const {writer_id, page} = req.query
    const [posts, count] = await Promise.all([
      Model.Post.find({writer: writer_id}, {writer:1, title:1, likes:1, views:1, comments:1, createdAt:1}).sort({_id: -1}).skip((Number(page)-1)*10).limit(10).populate('writer', ['_id', 'nickname', 'img']),
      Model.Post.find({writer: writer_id}).count()
    ])
    const temp = posts.map(post => {
      const commentCount = post.comments.length
      const temp1 = post.toObject()
      const dateObj = new Date(temp1.createdAt)
      const date = `${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")} ${String(dateObj.getHours()).padStart(2,"0")}:${String(dateObj.getMinutes()).padStart(2,"0")}:${String(dateObj.getSeconds()).padStart(2,"0")}`
      const temp2 = {...temp1, date, commentCount}
      delete temp2.createdAt
      delete temp2.comments
      return temp2
    })
    return res.json({posts: temp, count})
  }catch(err){
    console.log('내가 쓴 글 리스트 요청 에러: ', err)
    return res.status(400).send(err.message)
  }
})
// 게시글 요청
posts.get('/:_id', async (req, res) => {
  try{
    const {_id} = req.params
    const post = await Model.Post.findByIdAndUpdate(_id, {$inc: {views: 1}}, {new: true}).populate([{path: 'writer', select: '_id nickname img'}, {path: 'comments.writer', select: '_id nickname img'}])
    if(!post) throw new Error("해당 게시글이 없습니다")
    const temp = post.toObject()
    const dateObj = new Date(temp.createdAt)
    const date = `${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")} ${String(dateObj.getHours()).padStart(2,"0")}:${String(dateObj.getMinutes()).padStart(2,"0")}:${String(dateObj.getSeconds()).padStart(2,"0")}`
    temp.date = date
    delete temp.createdAt
    delete temp.updatedAt
    delete temp.__v
    // isLike 할당
    const {user_id} = req.query
    if(user_id === "undefined") temp.isLike = false
    else {
      const index = temp.isLike.findIndex(item => item.liker.toHexString() === user_id)
      if(index === -1) temp.isLike = false
      else temp.isLike = true
    }
    return res.json(temp)
  }catch(err){
    console.log('게시글 요청 에러: ', err)
    return res.status(400).send(err.message)
  }
})
// 게시글 좋아요/취소
posts.patch("/like", auth, async (req, res) => {
  try{
    const {_id, isLike} = req.body
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")
    const post = await Model.Post.findById(_id, {likes: 1, isLike: 1, _id: -1})
    if(!post) throw new Error("게시글이 없습니다")
    if(isLike){
      post.likes--
      const index = post.isLike.indexOf(user._id)
      post.isLike.splice(index, 1)
    }else{
      post.likes++
      post.isLike.push({liker: user._id})
    }
    await post.save()
    return res.json(true)
  }catch(err){
    console.log('게시글 좋아요/취소 에러: ', err)
    return res.status(400).send(err.message)
  }
})
// 게시글 수정하기
posts.patch("", imgUpload.array('img'), auth2, async (req, res) => {
  try{
    const {_id, deleteImg, title, content} = JSON.parse(req.body.params)
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")
    const post = await Model.Post.findById(_id)
    if(!post) throw new Error("게시글이 없습니다")
    // 제목 | 내용 수정로직
    post.title = title
    post.content = content
    // 이미지 수정로직
    const newImgs = req.files.map(file => file.filename)
    const prevImgs = post.img.toObject()
    for(let i=0; i < deleteImg.length; i++){
      try{
        if(deleteImg[i]) {
          const index = prevImgs.findIndex(img => {
            return img === deleteImg[i]
          })
          if(index !== -1) prevImgs.splice(index, 1)
          await fileUnlink(`./img/${deleteImg[i]}`);
        }
      }catch(err){
        console.log('게시글 이미지 수정 에러: ', err)
      }
    }
    const tempImgs = prevImgs.concat(newImgs)
    post.img = tempImgs
    await post.save()
    return res.json(true)
  }catch(err){
    for(let i=0; i < newImgs.length ;i++){
      try{
        await fileUnlink(`./img/${newImgs[i]}`)
      }catch{
        console.log("게시글 등록 에러 이미지 삭제 에러: ", newImgs[i])
      }
    }
    console.log("게시글 수정 에러: ", err)
    return res.status(400).send(err.message)
  }
})
// 게시글 삭제하기
posts.delete("/:_id/:session", auth, async (req, res) => {
  try{
    const {_id} = req.params
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")
    const post = await Model.Post.findByIdAndDelete(_id)
    for(let i=0; i < post.img.length; i++){
      try{
        if(post.img[i]) await fileUnlink(`./img/${post.img[i]}`)
      }catch{
        console.log("게시글 삭제 이미지 삭제 에러: ", post.img[i])
      }
    }
    return res.json(true)
  }catch(err){
    console.log("게시글 삭제 에러: ", err)
    return res.status(400).send(err.message)
  }
})

module.exports = {posts}