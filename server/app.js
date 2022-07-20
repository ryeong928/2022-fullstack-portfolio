require('dotenv').config()
const ENV = process.env
const PORT = ENV.PORT || 5000
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Router = require('./routes')

// 미들웨어
app.use(cors({origin: true, credentials: true}))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
// app.use('/img', express.static('img'))

// 라우터
app.use('/users', Router.users)
app.use('/posts', Router.posts)
app.use('/comments', Router.comments)
app.use('/shopping', Router.shopping)

// 헤로쿠배포
if(ENV.NODE_ENV === "production"){
  app.use(express.static(`${__dirname}/build`))
  app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/build/index.html`)
  })
}

// 몽고디비
mongoose.connect(ENV.DB_URI).then(()=>{
  console.log("데이터베이스 연결 성공")
  // 서버 실행
  app.listen(PORT, () => console.log(`포트 ${PORT} 서버 실행`))
}).catch(err => console.log("서버 실행 에러: ", err))

// 비동기요청 주소 '/' 로 변경
// 프로젝트 package.json stript 작성
// client -> npm ci -> npm run build -> build폴더를 server로 이동
// server -> npm ci -> tsc -> node app.js
// 헤로쿠 설정 config vars에 .env 값 할당