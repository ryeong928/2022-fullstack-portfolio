const comments = require('express').Router()
const {auth} = require('../middlewares')
const Model = require('../models')
const mongoose = require('mongoose')

// 댓글 생성
comments.post("", auth, async (req, res) => {
  try{
    const {post_id, content} = req.body
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")
    const isValid = mongoose.isValidObjectId(post_id)
    if(!isValid) throw new Error("게시글이 없습니다")
    const dateObj = new Date()
    const comment = {
      post_id,
      writer: user._id,
      content,
      likes: 0,
      isLike: [],
      date: `${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")} ${String(dateObj.getHours()).padStart(2,"0")}:${String(dateObj.getMinutes()).padStart(2,"0")}:${String(dateObj.getSeconds()).padStart(2,"0")}`
    }
    const post = await Model.Post.findByIdAndUpdate(post_id, {$push: {comments: comment}}, {new: true}).select({comments: 1}).populate('comments.writer', '_id nickname img')
    return res.json(post.comments)
  }catch(err){
    console.log("댓글 생성 에러: ", err)
    return res.status(400).send(err.message)
  }
})
// 댓글 좋아요
comments.patch("/like/:_id", auth, async (req, res) => {
  try{
    const {_id} = req.params
    const {post_id, isLike} = req.body
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")
    const isValid = mongoose.isValidObjectId(post_id)
    if(!isValid) throw ("존재하지 않는 게시글입니다")
    const post = await Model.Post.findById(post_id)
    console.log(post)
    return res.json(true)
  }catch(err){
    console.log("댓글 좋아요 에러: ", err)
    return res.status(400).send(err.message)
  }
})
// 댓글 수정
comments.patch('/:_id', auth, async (req, res) => {
  try{
    const {_id} = req.params
    const {content} = req.body
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")
    const post = await Model.Post.findOneAndUpdate({'comments._id': _id}, {'comments.$.content': content}, {new: true}).select({comments: 1})
    if(!post) throw ("존재하지 않는 게시글입니다")
    return res.json(true)
  }catch(err){
    console.log("댓글 수정 에러: ", err)
    return res.status(400).send(err.message)
  }
})
// 댓글 삭제
comments.delete('/:_id', auth, async (req, res) => {
  try{
    const {_id} = req.params
    const {post_id} = req.query
    const user = req.user
    if(!user) throw ("재 로그인 해주세요")
    const post = await Model.Post.findByIdAndUpdate(post_id, {$pull: {comments: {_id}}}, {new: true}).select({comments: 1})
    return res.json(true)
  }catch(err){
    console.log("댓글 삭제 에러: ", err)
    return res.status(400).send(err.message)
  }
})

module.exports = {comments}