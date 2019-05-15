const express = require('express')
const UserRouter = express.Router()
// const app = express()
const User = require('../dao/UserDAO')

UserRouter.route('/').get((req, res) => {
  User.find().select({ '_id': 0, 'password': 0 }).then(function (users) {
    if (users) {
      res.json(users)
    } else {
      res.sendStatus(404)
    }
  })
})

UserRouter.route('/:username').get((req, res) => {
  User.findOne({ 'username': req.params.username }).select({ '_id': 0, 'password': 0 }).then(function (users) {
    if (users) {
      res.json(users)
    } else {
      res.sendStatus(404)
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
  const regex = new RegExp(username)
  User.find({ 'username': regex, 'typeOfUser': type }).select({ '_id': 0, 'password': 0 }).skip(Number.parseInt(startPos)).limit(Number.parseInt(limit)).then((data) => {
    if (data) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

UserRouter.route('/add').post((req, res) => {
  const user = new User(req.body.registerForm)
  User.findOne({ 'username': user.username }).then((data) => {
    if (!data) {
      user.save()
        .then(user => {
          if (user) {
            res.send(true)
          } else {
            res.send(false)
          }
        })
        .catch(_err => {
          res.status(400).send('unable to save to database')
        })
    } else {
      res.send(false)
    }
  })
})

UserRouter.route('/edit').post((req, res) => {
  const newUserData = req.params.userData
  User.findOneAndUpdate({ 'username': newUserData.username }, { '$set': newUserData }).then((result) => {
    if (result.value) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

UserRouter.route('/remove/:username').post((req, res) => {
  User.findOneAndDelete({ 'username': req.params.username }).then((result) => {
    if (result) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

UserRouter.route('/addmany').post((req, res) => {
  User.insertMany(req.body.usersData).then((result) => {
    if (result) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

module.exports = UserRouter
