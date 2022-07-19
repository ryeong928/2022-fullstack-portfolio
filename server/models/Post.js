const {Schema, model, Types: {ObjectId}} = require('mongoose')

const PostSchema = new Schema(
  {
    writer: {type: ObjectId, required: true, ref: "user"},
    title: {type: String, required: true},
    content: {type: String, required: true},
    img: [{type: String, default: ""}],
    likes: {type: Number, default: 0},
    isLike: [{liker: {type: ObjectId}}],
    views: {type: Number, default: 0},
    comments: [{
      writer: {type: ObjectId, required: true, ref: "user"},
      content: {type: String, required: true},
      likes: {type: Number, default: 0},
      isLike: [{liker: {type: ObjectId}}],
      date: {type: String}
  }]
  },
  {timestamps: true}
)

const Post = model('post', PostSchema)

module.exports = {Post}