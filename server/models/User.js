const {Schema, model, Types:{ObjectId}} = require('mongoose')

const UserSchema = new Schema(
  {
    id: {type: String, required: true, unique: true},
    ps: {type: String, required: true},
    nickname: {type: String, required: true, unique: true},
    img: {type: String, default: ""},
    points: {type: Number, default: 0},
    session: {type: String, default: new Date().getTime()},
    private: {
      sex: {type: String, default: ""},
      birth: {type: String, default: ""},
      email: {type: String, default: ""},
      phone: {type: String, default: ""},
      address: {type: String, default: ""},
      spending: {type: String, default: 0}
    }
  }
  ,{timestamps: true}
)
const User = model("user", UserSchema)
// save 메소드 이전에 실행되는 함수. this는 UserSchema를 가리킨다
//UserSchema.pre('save', (next) => {
//  const user = this
//})
module.exports = {User}