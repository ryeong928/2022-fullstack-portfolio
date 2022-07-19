const shopping = require('express').Router()
const Model = require('../models')
const {auth, auth2, imgUpload} = require('../middlewares')
const {v4:uuid} = require('uuid')
const fs = require('fs')
const {promisify} = require('util')
const fileUnlink = promisify(fs.unlink)

// 상품 등록
shopping.post("", imgUpload.single("img"), auth2, async(req, res) => {
  try{
    const {session, ...rest} = JSON.parse(req.body.params)
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")
    
    return res.json(true)
  }catch(err){
    console.log("상품 등록 에러: ", err)
    return res.status(400).send(err.message)
  }
})
// 상품 리스트 요청
shopping.get("", async (req, res) => {
  try{

  }catch(err){
    console.log("상품 리스트 요청 에러: ", err)
    return res.status(400).send(err.message)
  }
})
// 상품 수정
shopping.patch("/:_id",  imgUpload.single("img"), auth2, async(req, res) => {
  try{
    const {_id} = req.params
    const {session, ...rest} = JSON.parse(req.body.params)
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")

    return res.json(true)
  }catch(err){
    console.log("상품 등록 에러: ", err)
    return res.status(400).send(err.message)
  }
})
// 상품 삭제
shopping.delete("/:_id/:session", auth, async(req, res) => {
  try{
    const {_id} = req.params
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")

    return res.json(true)
  }catch(err){
    console.log("상품 등록 에러: ", err)
    return res.status(400).send(err.message)
  }
})
// 상품들 구매
shopping.post("/purchase", auth, async(req, res) => {
  try{
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")

    return res.json(true)
  }catch(err){
    console.log("상품 구매 에러: ", err)
    return res.status(400).send(err.message)
  }
})
// 상품 찜하기/취소
shopping.patch("/like", auth, async (req, res) => {
  try{
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")
    
    return res.json(true)
  }catch(err){
    console.log("상품 찜하기/취소 에러: ",err)
    return res.status(400).send(err.message)
  }
})
// 상품 구매 기록 요청
shopping.get("/purchase", auth, async (req, res) => {
  try{
    const user = req.user
    if(!user) throw new Error("재 로그인 해주세요")

    return res.json(true)
  }catch(err){
    console.log("상품 구매 기록 요청 에러: ", err)
    return res.status(400).send(err.message)
  }
})

module.exports = {shopping}