const {Schema, model, Types:{ObjectId}} = require('mongoose')

const PurchaseSchema = new Schema(
  {
    buyer: {type: ObjectId, required: true, ref: "user"},
    purchase: [{
      pay: {type: Number, required: true},
      date: {type: String, required: true},
      list: [{
        item: {type: ObjectId, required: true, ref: "product"},
        count: {type: Number, required: true},
      }]
    }]
  }
)

const Purchase = model('purchase', PurchaseSchema)

module.exports = {Purchase}