const Model = require('../models')

// FormData 형태의 req.body 데이터를 파싱
const auth2 = async (req, res, next) => {
  const {session} = JSON.parse(req.body.params)
  if(!session) return next()
  const user = await Model.User.findOne({session})
  req.user = user
  return next()
}

module.exports = {auth2}