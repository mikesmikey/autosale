const express = require('express')
const GlobalDataRouter = express.Router()
// const app = express()
const GlobalData = require('../dao/GlobalDataDAO')

GlobalDataRouter.route('/').get((req, res) => {
  GlobalData.find().select({ '_id': 0 }).then(function (globaldata) {
    if (globaldata) {
      res.json(globaldata)
    } else {
      res.sendStatus(404)
    }
  })
})

GlobalDataRouter.route('/findone').get((req, res) => {
  GlobalData.findOne().select({ '_id': 0 }).then(function (globaldata) {
    if (globaldata) {
      res.json(globaldata)
    } else {
      res.sendStatus(404)
    }
  })
})

GlobalDataRouter.route('/edit').post((req, res) => {
  GlobalData.findOneAndUpdate({}, { '$set': req.body.globalData }).then((result) => {
    if (result) {
      return res.send(true)
    } else {
      return res.send(false)
    }
  })
})

module.exports = GlobalDataRouter
