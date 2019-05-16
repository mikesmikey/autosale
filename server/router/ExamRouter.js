const express = require('express')
const ObjectId = require('mongodb').ObjectID
const ExamRouter = express.Router()
const ExamService = require('../service/ExamService')
// const app = express()
const Exam = require('../dao/ExamDAO')

ExamRouter.route('/username/:username').get((req, res) => {
  Exam.find({ 'ExamSeat.studentCode': req.params.username }).then(function (exams) {
    if (exams) {
      res.json(exams)
    } else {
      res.sendStatus(404)
    }
  })
})

ExamRouter.route('/username/:username').get((req, res) => {
  Exam.find({ 'ExamSeat.studentCode': req.params.username }).then(function (exams) {
    if (exams) {
      res.json(exams)
    } else {
      res.sendStatus(404)
    }
  })
})

ExamRouter.route('/subject=:subjectId/course=:courseId').get((req, res) => {
  Exam.find({ '$and': [{ 'subjectId': req.params.subjectId }, { 'courseId': Number.parseInt(req.params.courseId) }] }).then(function (exams) {
    if (exams) {
      res.json(exams)
    } else {
      res.sendStatus(404)
    }
  })
})

ExamRouter.route('/').post((req, res) => {
  const exam = new Exam(req.body.examData)
  Exam.findOne({ 'subjectId': exam.subjectId, 'courseId': exam.courseId, 'date': exam.date }).then((data) => {
    if (!data) {
      exam.save()
        .then(exam => {
          if (exam) {
            res.send(exam._id)
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

ExamRouter.route('/:objectid').delete((req, res) => {
  Exam.findOneAndDelete({ '_id': new ObjectId(req.params.objectid) }).then((result) => {
    if (result) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

ExamRouter.route('/date=:day/:month/:year/room=:roomId').get((req, res) => {
  const strDate = `${req.params.day}/${req.params.month}/${req.params.year}`
  Exam.aggregate(
    [
      {
        '$match': { '$and':
      [
        { 'date': strDate },
        { 'rooms.roomId': req.params.roomId }
      ] }
      },
      {
        '$addFields': {
          'rooms': {
            '$filter': {
              'input': '$rooms',
              'as': 'room',
              'cond': { '$eq': [ '$$room.roomId', req.params.roomId ] }
            }
          }
        }
      }
    ]
  ).then(function (exams) {
    if (exams) {
      res.json(exams)
    } else {
      res.sendStatus(404)
    }
  })
})

ExamRouter.route('/room').post((req, res) => {
  Exam.findOneAndUpdate({ '_id': new ObjectId(req.body.examId) }, { '$push': { 'rooms': req.body.roomData } }).then((result) => {
    if (result) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

ExamRouter.route('/room/update').post((req, res) => {
  var exam = new Exam()
  exam.updateExamData(req.body.examId, req.body.examData, (result) => {
    if (result) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

ExamRouter.route('/room/delete/:objId/:roomId/:startTime').post((req, res) => {
  const findQuery = { '_id': new ObjectId(req.params.objId), 'rooms': { '$elemMatch': { 'roomId': req.params.roomId, 'startTime': Number.parseInt(req.params.startTime) } } }
  const removeRoomQuery = { $pull: { 'rooms': { 'roomId': req.params.roomId, 'startTime': Number.parseInt(req.params.startTime) } } }
  Exam.findByIdAndUpdate(findQuery, removeRoomQuery, (_err, result) => {
    if (result) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

ExamRouter.route('/objectid=:objectid').get((req, res) => {
  var exam = new Exam()
  exam.getExamByObjId(req.params.objectid, (err, exam) => {
    if (err) {
      console.log(err)
      return
    }
    if (exam) {
      res.json(exam)
    } else {
      res.sendStatus(404)
    }
  })
})

ExamRouter.route('/confirm').post((req, res) => {
  const service = new ExamService()
  service.confirmExam(req.body.examId).then((result) => {
    if (result) {
      res.send(result)
    }
  })
})

ExamRouter.route('/examiner').post((req, res) => {
  Exam.findOneAndUpdate({ '_id': new ObjectId(req.body.Id) }, { '$set': { 'rooms': req.body.Data } }).then((result) => {
    if (result) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

ExamRouter.route('/seatType/update/:objId/:seatLineUpType/:seatOrderType').post((req, res) => {
  Exam.findOneAndUpdate({ '_id': new ObjectId(req.params.objId) }, { $set: { 'seatLineUpType': req.params.seatLineUpType, 'seatOrderType': req.params.seatOrderType } }).then((result) => {
    if (result) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

module.exports = ExamRouter
