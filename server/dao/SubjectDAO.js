const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GlobalData = require('./GlobalData')

var Subject = new Schema({
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
  collection: 'Subject'
})

const gb = new GlobalData()

Subject.methods.getYearAndTerm = gb.getYearAndTerm()

// Subject.methods.getCourseBySubjectAndCourseId = function (subjectId, courseId, callback) {
//   return this.model('Subject').aggregate(
//     [
//       {
//         '$match': { '$and':
//           [
//             { 'subjectId': subjectId },
//             { 'courses.courseId': Number.parseInt(courseId) }
//           ] }
//       },
//       {
//         '$project': {
//           '_id': 0,
//           'subjectId': 1,
//           'subjectName': 1,
//           'courses': {
//             '$filter': {
//               'input': '$courses',
//               'as': 'course',
//               'cond': { '$eq': [ '$$course.courseId', Number.parseInt(courseId) ] }
//             }
//           }
//         }
//       }
//     ], callback)
// }

Subject.methods.getAllCourseByThisSubject = function () {
  return this.model('Subject').f
}

module.exports = mongoose.model('Subject', Subject)
