const express = require('express')
const ExamRouter = express.Router()
// const app = express()
const Exam = require('../dao/ExamDAO')

ExamRouter.route('/').get((req, res) => {
  Exam.find().then(function (users) {
    if (users) {
      res.json(users)
    } else {
      res.sendStatus(404)
    }
  })
})

module.exports = ExamRouter
