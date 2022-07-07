const multer = require('multer')
const mime = require("mime-types")
const {v4:uuid} = require('uuid')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./images"),
  filename: (req, file, cb) => cb(null, `${uuid()}.${mime.extension(file.mimetype)}`)
})
const imageUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if(["image/png", "image/jpeg"].includes(file.mimetype)) cb(null, true)
    else cb(new Error("유효하지 않은 이미지 타입입니다"), false)
  },
  limits: {fileSize: 1024*1024*5}
})

module.exports = {imageUpload}