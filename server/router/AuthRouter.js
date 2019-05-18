const express = require('express')
const AuthRouter = express.Router()
// const app = express()
const AuthService = require('../service/AuthService')

AuthRouter.route('/login').post((req, res) => {
  const service = new AuthService()
  service.loginAuth(req.body.loginInfo).then((result) => {
    res.send(result)
  })
})

module.exports = AuthRouter
