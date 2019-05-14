const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  typeOfUser: {
    type: String
  },
  isExaminer: {
    type: Boolean
  },
  branchId: {
    type: Number
  },
  facultyId: {
    type: Number
  },
  year: {
    type: Number
  },
  standing: {
    type: String
  },
  courses: {
    type: Object
  },
  examList: {
    type: Object
  }
}, {
  collection: 'User'
})

module.exports = mongoose.model('User', User)
