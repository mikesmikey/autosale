/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const md5 = require('md5')

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

User.pre('save', function (next) {
  this.password = md5(this.password)
  next()
})

User.methods.getAllStudentByRegisteredCourse = function (subjectId, courseId, callback) {
  const query = { 'typeOfUser': 'student',
    'courses.subjectId': subjectId,
    'courses.courseId': Number.parseInt(courseId)
  }
  return this.model('User').find(query, callback).select({ '_id': 0, 'password': 0 })
}

User.methods.getUserByUsername = function (username, callback) {
  return this.model('User').findOne({ 'username': username }, callback)
}

User.methods.insertManyUser = function (users, callback) {
  return this.model('User').insertMany(users, callback)
}

User.methods.updateUserData = function (userData, callback) {
  // userData.password = md5(userData.password)
  return this.model('User').findOneAndUpdate({ 'username': userData.username }, { '$set': userData }, callback)
}

module.exports = mongoose.model('User', User)
