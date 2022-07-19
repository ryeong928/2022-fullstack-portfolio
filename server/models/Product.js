const {Schema, model} = require('mongoose')

const ProductSchema = new Schema(
  {
    name: {type: String, required: true, unique: true},
    type: {type: String, required: true},
    price: {type: Number, required: true}
  }
)

const Product = model('product', ProductSchema)

module.exports = {Product}