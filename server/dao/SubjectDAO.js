const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Subject = new Schema({
  sujectId: {
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
  collection: 'Subject'
})

module.exports = mongoose.model('Subject', Subject)
