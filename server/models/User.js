const {Schema, model} = require('mongoose')

const UserSchema = new Schema(
  {
    session: {type: String, default: ""},
    id: {type: String, required: true, unique: true},
    ps: {type: String, required: true},
    nickname: {type: String, required: true, unique: true},
    img: {type: String, default: ""},
    points: {type: Number, default: 0},
    private: {
      sex: {type: String, default: ""},
      birth: {type: String, default: ""},
      address: {type: String, default: ""},
    }
  },
  {timestamps: true}
)

const User = model("user", UserSchema)

module.exports = {User}