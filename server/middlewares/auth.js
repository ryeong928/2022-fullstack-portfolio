const Model = require('../models')

const auth = async (req, res, next) => {
  let session = undefined
  if(req.body.session) session = req.body.session
  else if(req.params.session) session = req.params.session
  else if(req.query.session) session = req.query.session
  if(!session) return next()
  const user = await Model.User.findOne({session})
  req.user = user
  return next()
}

module.exports = {auth}