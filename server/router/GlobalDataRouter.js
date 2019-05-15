const express = require('express')
const GlobalDataRouter = express.Router()
// const app = express()
const GlobalData = require('../dao/GlobalDataDAO')

GlobalDataRouter.route('/findone').get((req, res) => {
  GlobalData.findOne().select({ '_id': 0 }).then(function (globalData) {
    if (globalData) {
      res.json(globalData)
    } else {
      res.sendStatus(404)
    }
  })
})

GlobalDataRouter.route('/').get((req, res) => {
  GlobalData.find().select({ '_id': 0 }).then(function (globalData) {
    if (globalData) {
      res.json(globalData)
    } else {
      res.sendStatus(404)
    }
  })
})

module.exports = GlobalDataRouter
