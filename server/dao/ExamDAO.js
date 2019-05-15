const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Exam = new Schema({
  sujectId: {
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

module.exports = mongoose.model('Exam', Exam)
