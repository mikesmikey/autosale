const express = require('express')
const UserRouter = express.Router()
// const app = express()
const User = require('../dao/UserDAO')
const AuthService = require('../service/AuthService')

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

UserRouter.route('/student/:username').get((req, res) => {
  User.findOne({ 'username': req.params.username,typeOfUser:'student'}).then(function (users) {
    if (users) {
      res.json(users)
    } else {
      res.json(false)
    }
  })
})
UserRouter.route('/serach/:firstName/:lastName').get((req, res) => {
  User.find({ 'firstName': req.params.firstName,'lastName':req.params.lastName,'typeOfUser': 'professor'}).then(function (users) {
    if (users) {
      res.json(users)
    } else {
      res.sendStatus(404)
    }
  })
})

UserRouter.route('/subjectid=:subjectid/courseid=:courseid').get((req, res) => {
  const user = new User()
  user.getAllStudentByRegisteredCourse(req.params.subjectid, req.params.courseid, (err, users) => {
    if (err) {
      throw err
    }
    if (users) {
      res.json(users)
    } else {
      res.sendStatus(404)
    }
  })
})

UserRouter.route('/examiner/:username').get((req, res) => {
  User.find({ username: req.params.username, isExaminer: true }).select({ '_id': 0, 'password': 0 }).then(function (users) {
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
  const startPos = req.params.startPos <= 0 ? 0 : req.params.startPos
  const limit = req.params.limit <= 0 ? Number.MAX_SAFE_INTEGER : req.params.limit
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
  const startPos = req.params.startPos <= 0 ? 0 : req.params.startPos
  const limit = req.params.limit <= 0 ? Number.MAX_SAFE_INTEGER : req.params.limit
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
  const user = new User(req.body.userData)
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
  const newUserData = req.body.userData
  // User.findOneAndUpdate({ 'username': newUserData.username }, { '$set': newUserData }).then((result) => {
  //   if (result) {
  //     res.send(true)
  //   } else {
  //     res.send(false)
  //   }
  // })
  const user = new User()
  user.updateUserData(newUserData, (err, result) => {
    if (err) {
      throw err
    }
    if (result) {
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
UserRouter.route('/add/course/:subjectId/:userId/:courseId/:groups').post((req, res) => {
  User.findOneAndUpdate({ 'username': req.params.userId }, { '$push': { 'courses': {group:Number.parseInt(req.params.groups),subjectId:req.params.subjectId,courseId:Number.parseInt(req.params.courseId)} } }).then((result) => {
    if (result) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})
UserRouter.route('/token').post((req, res) => {
  const service = new AuthService()
  service.verifyToken(req.body.token).then((verifyResult) => {
    if (verifyResult) {
      const user = new User()
      user.getUserByUsername(verifyResult.username).then((result) => {
        res.send(result)
      })
    } else {
      res.send(verifyResult)
    }
  })
})
module.exports = UserRouter
