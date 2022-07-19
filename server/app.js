require('dotenv').config()
const ENV = process.env
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Router = require('./routes')

mongoose.connect(ENV.DB_URI).then(()=>{
  console.log("데이터베이스 연결 성공")
  // 미들웨어
  app.use(cors({origin: true, credentials: true}))
  app.use(express.json()) // for parsing application/json
  app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
  app.use('/img', express.static('img'))
  // 라우터
  app.use('/users', Router.users)
  app.use('/posts', Router.posts)
  app.use('/comments', Router.comments)
  app.use('/shopping', Router.shopping)
  // 서버 실행
  app.listen(ENV.PORT, () => console.log(`포트 ${ENV.PORT} 서버 실행`))
}).catch(err => console.log("서버 실행 에러: ", err))