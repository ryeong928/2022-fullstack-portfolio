require('dotenv').config()
const ENV = process.env
const express = require("express")
const app = express()
const mongoose = require('mongoose')
// 미들웨어
const cors = require('cors')
// 라우터
const Router = require('./routes')

mongoose.connect(ENV.DB_URI).then(()=>{
  console.log("몽고디비 데이터베이스 연결")
  // 미들웨어
  app.use(cors({origin: true, credentials: true}))
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use('/images', express.static('images'))
  // 라우터
  app.use('/user', Router.user)
  // 서버 실행
  app.listen(ENV.PORT, () => console.log(`포트 ${ENV.PORT} 서버 실행`))
}).catch((err) => {console.log("몽고디비 데이터베이스 연결 실패: ", err)})