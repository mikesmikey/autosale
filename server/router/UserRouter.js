const express = require('express')
const UserRouter = express.Router()
// const app = express()
const User = require('../dao/UserDAO')

UserRouter.route('/all').get((req, res) => {
  User.find(function (err, users) {
    if (err) {
      console.log(err)
    } else {
      if (users) {
        res.json(users)
      } else {
        res.sendStatus(404)
      }
    }
  })
})

UserRouter.route('/count/:type').get((req, res) => {
  User.countDocuments({ 'typeOfUser': req.params.type }, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      res.json(result)
    }
  })
})

UserRouter.route('/count/:type/:username').get((req, res) => {
  const regex = new RegExp(`${req.params.username}`)
  User.countDocuments({ 'username': regex, 'typeOfUser': req.params.type }, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      res.json(result)
    }
  })
})

UserRouter.route('/type/:userType/:startPos/:limit').get((req, res) => {
  const type = req.params.userType
  const startPos = req.params.startPos
  const limit = req.params.limit
  User.find({ 'typeOfUser': type }).select({ '_id': 0, 'password': 0 }).skip(Number.parseInt(startPos)).limit(Number.parseInt(limit)).then((data) => {
    if (data) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

UserRouter.route('/:type/:username/:startPos/:limit').get((req, res) => {
  const type = req.params.type
  const username = req.params.username
  const startPos = req.params.startPos
  const limit = req.params.limit
  const regex = new RegExp(`${username}`)
  User.find({ 'username': regex, 'typeOfUser': type }).select({ '_id': 0, 'password': 0 }).skip(Number.parseInt(startPos)).limit(Number.parseInt(limit)).then((data) => {
    if (data) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

module.exports = UserRouter
