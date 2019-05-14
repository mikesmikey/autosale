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

Exam.methods.getAllExamByDateAndRoom = function (date, roomId, callback) {
  return this.model('Exam').aggregate(
    [
      {
        '$match': { '$and':
              [
                { 'date': date },
                { 'rooms.roomId': roomId }
              ] }
      },
      {
        '$addFields': {
          'rooms': {
            '$filter': {
              'input': '$rooms',
              'as': 'room',
              'cond': { '$eq': [ '$$room.roomId', roomId ] }
            }
          }
        }
      }
    ], callback)
}

Exam.methods.updateExamData = function (examId, newData, callback) {
  return this.model('Exam').findOneAndUpdate({ '_id': new ObjectId(examId) }, { '$set': newData }, callback)
}

module.exports = mongoose.model('Exam', Exam)
