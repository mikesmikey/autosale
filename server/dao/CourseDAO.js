const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID
const Schema = mongoose.Schema

var Course = new Schema({
  subjectId: {
    type: String
  },
  subjectName: {
    type: String
  },
  credits: {
    type: String
  },
  facultyId: {
    type: String
  },
  branchId: {
    type: String
  },
  courses: {
    type: Object
  }
}, {
  collection: 'Course'
})

module.exports = mongoose.model('Course', Course)
