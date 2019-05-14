const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID
const Schema = mongoose.Schema

var Exam = new Schema({
  subjectId: {
    type: String
  },
  subjectName: {
    type: String
  },
  examName: {
    type: String
  },
  courseId: {
    type: Number
  },
  date: {
    type: String
  },
  maxScore: {
    type: String
  },
  examConfirm: {
    type: Boolean
  },
  status: {
    type: String
  },
  seatLineUpType: {
    type: String
  },
  seatOrderType: {
    type: String
  },
  maxStudent: {
    type: String
  },
  roomId: {
    type: String
  },
  rooms: {
    type: Object
  }
}, {
  collection: 'Exam'
})

Exam.methods.getExamByObjId = function (objId, callback) {
  return this.model('Exam').findOne({ '_id': new ObjectId(objId) }, callback)
}

Exam.method.updateExamData = function (examId, newData, callback) {
  return this.model('Exam').findOneAndUpdate({ '_id': new ObjectId(examId) }, { '$set': newData }, callback)
}

module.exports = mongoose.model('Exam', Exam)
