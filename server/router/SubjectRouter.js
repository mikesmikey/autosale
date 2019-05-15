const express = require('express')
const SubjectRouter = express.Router()
// const app = express()
const Subject = require('../dao/SubjectDAO')
const User = require('../dao/UserDAO')
const GlobalData = require('../dao/GlobalDataDAO')
// const GlobalData = require('../dao/GlobalData')

// [================= AddSubject =================]

// route done
SubjectRouter.route('/').get((req, res) => {
  Subject.find().select({ '_id': 0 }).then(function (subjects) {
    if (subjects) {
      res.json(subjects)
    } else {
      res.sendStatus(404)
    }
  })
})

// route done
SubjectRouter.route('/find/name/:subjectName').get((req, res) => {
  const regex = new RegExp(`${req.params.subjectName}`)
  Subject.find({ 'subjectName': regex }).limit(16).select({ '_id': 0 }).then(function (subjects) {
    if (subjects) {
      res.json(subjects)
    } else {
      res.sendStatus(404)
    }
  })
})

// route done
SubjectRouter.route('/find/id/:subjectId').get((req, res) => {
  const regex = new RegExp(`${req.params.subjectId}`)
  Subject.find({ 'subjectId': regex }).limit(16).select({ '_id': 0 }).then(function (subjects) {
    if (subjects) {
      res.json(subjects)
    } else {
      res.sendStatus(404)
    }
  })
})

// route done
SubjectRouter.route('/add').post((req, res) => {
  const subject = new Subject(req.body.subjectData)
  Subject.findOne({ '$or': [{ 'subjectId': subject.subjectId }, { 'subjectName': subject.subjectName }] }).then((data) => {
    if (!data) {
      subject.save().then(subject => {
        if (subject) {
          res.send(true)
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

// [================= AddCourse =================]

// route done
SubjectRouter.route('/findone/id/:subjectId').get((req, res) => {
  Subject.findOne({ 'subjectId': req.params.subjectId }).limit(16).select({ '_id': 0 }).then(function (subjects) {
    if (subjects) {
      res.json(subjects)
    } else {
      res.sendStatus(404)
    }
  })
})

// route done
SubjectRouter.route('/findone/name/:subjectName').get((req, res) => {
  Subject.findOne({ 'subjectName': req.params.subjectName }).limit(16).select({ '_id': 0 }).then(function (subjects) {
    if (subjects) {
      res.json(subjects)
    } else {
      res.sendStatus(404)
    }
  })
})

// route done
SubjectRouter.route('/add/id/:subjectId/course').post((req, res) => {
  Subject.findOneAndUpdate({ 'subjectId': req.params.subjectId }, { '$push': { 'courses': req.body.courseData } }).then((result) => {
    if (result) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})

// getAllCurrentCourse()
SubjectRouter.route('/find/courses/year/:year/semester/:semester').get((req, res) => {
  Subject.aggregate([
    {
      '$match': { '$and':
      [
        { 'courses.school_year': Number.parseInt(req.params.year) },
        { 'courses.semester': Number.parseInt(req.params.semester) }
      ] }
    },
    {
      '$project': {
        '_id': 0,
        'subjectId': 1,
        'subjectName': 1,
        'courses': {
          '$filter': {
            'input': '$courses',
            'as': 'course',
            'cond': {
              '$and': [
                { '$eq': ['$$course.school_year', Number.parseInt(req.params.year)] },
                { '$eq': ['$$course.semester', Number.parseInt(req.params.semester)] }
              ]
            }
          }
        }
      }
    }
  ]).then(function (subjects) {
    if (subjects) {
      res.json(subjects)
    } else {
      res.sendStatus(404)
    }
  })
})

// searchAllCurrentCourseBySubjectId()
SubjectRouter.route('/find/courses/year/:year/semester/:semester/id/:subjectId/:startPos/:limit').get((req, res) => {
  var subId = req.params.subjectId
  var lim = req.params.limit

  if (subId === 'none') {
    subId = ''
  }
  if (lim <= 0) {
    lim = Number.MAX_SAFE_INTEGER
  }

  const regex = new RegExp(`${req.params.subId}`)
  Subject.aggregate([
    {
      '$match': {
        '$and':
          [
            { 'subjectId': { '$regex': regex } },
            { 'courses.school_year': Number.parseInt(req.params.year) },
            { 'courses.semester': Number.parseInt(req.params.semester) }
          ]
      }
    },
    {
      '$project': {
        '_id': 0,
        'subjectId': 1,
        'subjectName': 1,
        'courses': {
          '$filter': {
            'input': '$courses',
            'as': 'course',
            'cond': {
              '$and': [
                { '$eq': ['$$course.school_year', Number.parseInt(req.params.year)] },
                { '$eq': ['$$course.semester', Number.parseInt(req.params.semester)] }
              ]
            }
          }
        }
      }
    }
  ])
    .skip(Number.parseInt(req.param.startPos)).limit(Number.parseInt(lim))
    .then(function (subjects) {
      if (subjects) {
        res.json(subjects)
      } else {
        res.sendStatus(404)
      }
    })
})

// getAllCouresCurrent()
SubjectRouter.route('/findone').get((req, res) => {
  GlobalData.findOne().then((NowCurrent) => {
    Subject.find({ 'courses': { $elemMatch: { school_year: NowCurrent.currentStudyYear, semester: NowCurrent.currentStudyTerm } } }).then((data) => {
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].courses.length; j++) {
          if (data[i].courses[j].school_year === NowCurrent.currentStudyYear &&
            data[i].courses[j].semester === NowCurrent.currentStudyTerm) {
            data[i].indexCouresCurrent = data[i].courses[j].courseId - 1
          }
        }
        var date = [NowCurrent.currentStudyYear, NowCurrent.currentStudyTerm]
        data.push(date)
        res.json(data)
      }
    })
  })
})

// SubjectRouter.route('findone/courses/id/:subjectId').get((req, res) => {
//   GlobalData.findOne().then((NowCurrent) => {
//     Subject.findOne({ 'subjectId': req.params.subjectId, 'courses': { school_year: NowCurrent.currentStudyYear, semester: NowCurrent.currentStudyTerm } }).then((data) => {
//       if (!data) {
//         res.send(false)
//       } else {
//         res.send(true)
//       }
//     })
//   })
// })

// getObjectCountRegisterCourseBySubjectId()
SubjectRouter.route('/regCourse/find/id/:subjectId').get((req, res) => {
  User.find({ typeOfUser: 'student', 'RegisteredCourse': { $elemMatch: { subjectId: req.params.subjectId } } }).count((StudentData) => {
    User.find({ typeOfUser: 'professor', 'RegisteredCourse': { $elemMatch: { subjectId: req.params.subjectId } } }).then((TeacherData) => {
      let ObjectData = []
      ObjectData.push({ student: StudentData })
      let listTecher = []
      for (var i = 0; i < TeacherData.length; i++) {
        listTecher.push({ firstName: TeacherData[i].firstName, lastName: TeacherData[i].lastName })
      }
      ObjectData.push(listTecher)
      res.send(ObjectData)
    })
  })
})

// getNameteacherFormRegisterCourseBySubjectId()
SubjectRouter.route('/regCourse/find/teacher/id/:subjectId').get((req, res) => {
  User.find({ typeOfUser: 'professor', 'RegisteredCourse': { $elemMatch: { subjectId: req.params.subjectId } } }).then((data) => {
    var listData = []
    for (var i = 0; i < data.length; i++) {
      var obj = { firstName: data[i].firstName, lastName: data[i].lastName }
      listData.push(obj)
    }
    res.send(listData)
  })
})

// deleteCourse()
SubjectRouter.route('/remove/course/id/:subjectId/courseId/:courseId').post((req, res) => {
  Subject.updateMany({ subjectId: req.params.subjectId }, { $pull: { courses: { courseId: Number.parseInt(req.params.courseId) } } }).then((data) => {
    User.updateMany({ '$or': [{ typeOfUser: 'professor' }, { typeOfUser: 'student' }] }, { $pull: { RegisteredCourse: { subjectId: req.params.subjectId } } }).then((data) => {
      res.send(true)
    })
  })
})

// getCourseByIdAndSubjectId()
SubjectRouter.route('/find/course/id/:subjectId/courseId/:courseId').get((req, res) => {
  Subject.aggregate([
    {
      '$match': { '$and':
      [
        { 'subjectId': req.params.subjectId },
        { 'courses.courseId': Number.parseInt(req.params.courseId) }
      ] }
    },
    {
      '$project': {
        '_id': 0,
        'subjectId': 1,
        'subjectName': 1,
        'courses': {
          '$filter': {
            'input': '$courses',
            'as': 'course',
            'cond': { '$eq': [ '$$course.courseId', Number.parseInt(req.params.courseId) ] }
          }
        }
      }
    }
  ]).then((data) => {
    res.json(data)
  })
})

module.exports = SubjectRouter

// getAllSubjectCurrent () {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//       if (err) { resolve(null) }
//       const db = client.db(dbName)
//       this.getYearAndTerm().then((NowCurrent) => {
//         db.collection('Subject').find({ 'courses': { $elemMatch: { school_year: NowCurrent.currentStudyYear, semester: NowCurrent.currentStudyTerm } } }).toArray((err, data) => {
//           if (err) { throw err }
//           for (var i = 0; i < data.length; i++) {
//             for (var j = 0; j < data[i].courses.length; j++) {
//               if (data[i].courses[j].school_year === NowCurrent.currentStudyYear &&
//                 data[i].courses[j].semester === NowCurrent.currentStudyTerm) {
//                 data[i].indexCouresCurrent = data[i].courses[j].courseId - 1
//               }
//             }
//           }
//           var date = [NowCurrent.currentStudyYear, NowCurrent.currentStudyTerm]
//           data.push(date)
//           client.close()
//           return resolve(data)
//         })
//       })
//       // client.close()
//     })
//   })
// }

// checkSubjectCurrent (subjectId) {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//       if (err) { resolve(null) }
//       const db = client.db(dbName)
//       this.getYearAndTerm().then((NowCurrent) => {
//         db.collection('Subject').findOne({ 'subjectId': subjectId, 'courses': { school_year: NowCurrent.currentStudyYear, semester: NowCurrent.currentStudyTerm } }, (err, data) => {
//           if (err) { throw err }
//           if (!data) {
//             return resolve(true)
//           } else { client.close(); return resolve(false) }
//         })
//       })
//     })
//   })
// }

// getAllCourseByYearAndSemester (year, semester) {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//       if (err) { resolve(null) }

//       const db = client.db(dbName)
//       db.collection('Subject').aggregate(
//         [
//           {
//             '$match': { '$and':
//             [
//               { 'courses.school_year': Number.parseInt(year) },
//               { 'courses.semester': Number.parseInt(semester) }
//             ] }
//           },
//           {
//             '$project': {
//               '_id': 0,
//               'subjectId': 1,
//               'subjectName': 1,
//               'courses': {
//                 '$filter': {
//                   'input': '$courses',
//                   'as': 'course',
//                   'cond': {
//                     '$and': [
//                       { '$eq': ['$$course.school_year', Number.parseInt(year)] },
//                       { '$eq': ['$$course.semester', Number.parseInt(semester)] }
//                     ]
//                   }
//                 }
//               }
//             }
//           }
//         ]
//       ).toArray((err, data) => {
//         if (err) { throw err }
//         client.close()
//         return resolve(data)
//       })
//       client.close()
//     })
//   })
// }

// getAllCourseByYearSemesterAndSubjectId (year, semester, subjectId, startPos, limit) {
//   if (subjectId === 'none') {
//     subjectId = ''
//   }
//   if (limit <= 0) {
//     limit = Number.MAX_SAFE_INTEGER
//   }

//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//       if (err) { resolve(null) }

//       const db = client.db(dbName)

//       const regex = new RegExp(`${subjectId}`)
//       db.collection('Subject').aggregate(
//         [
//           {
//             '$match': {
//               '$and':
//                 [
//                   { 'subjectId': { '$regex': regex } },
//                   { 'courses.school_year': Number.parseInt(year) },
//                   { 'courses.semester': Number.parseInt(semester) }
//                 ]
//             }
//           },
//           {
//             '$project': {
//               '_id': 0,
//               'subjectId': 1,
//               'subjectName': 1,
//               'courses': {
//                 '$filter': {
//                   'input': '$courses',
//                   'as': 'course',
//                   'cond': {
//                     '$and': [
//                       { '$eq': ['$$course.school_year', Number.parseInt(year)] },
//                       { '$eq': ['$$course.semester', Number.parseInt(semester)] }
//                     ]
//                   }
//                 }
//               }
//             }
//           }
//         ]
//       ).skip(Number.parseInt(startPos)).limit(Number.parseInt(limit)).toArray((err, data) => {
//         if (err) { throw err }
//         client.close()
//         return resolve(data)
//       })
//       client.close()
//     })
//   })
// }

// getAllSubjectBySubjectName (subjname) {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
//       const db = client.db(dbName)
//       const regex = new RegExp(`${subjname}`)
//       db.collection('Subject').find({ 'subjectName': regex }).limit(16).project({ '_id': 0 }).toArray((err, data) => {
//         if (err) { throw err }
//         client.close()
//         return resolve(data)
//       })
//       client.close()
//     })
//   })
// }

// getAllSubjectBySubjectIdMoreOne (subjid) {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
//       const db = client.db(dbName)
//       const regex = new RegExp(`${subjid}`)
//       db.collection('Subject').find({ 'subjectId': regex }).limit(16).project({ '_id': 0 }).toArray((err, data) => {
//         if (err) { throw err }
//         client.close()
//         return resolve(data)
//       })
//       client.close()
//     })
//   })
// }

// getAllSubjectBySubjectId (subjid) {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
//       const db = client.db(dbName)
//       db.collection('Subject').find({ '$or': [{ 'subjectId': subjid }] }).limit(16).project({ '_id': 0 }).toArray((err, data) => {
//         if (err) { throw err }
//         client.close()
//         return resolve(data)
//       })
//       client.close()
//     })
//   })
// }

// getAllSubject () {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
//       const db = client.db(dbName)
//       db.collection('Subject').find({}).project({ '_id': 0 }).toArray((err, data) => {
//         if (err) { throw err }
//         client.close()
//         return resolve(data)
//       })
//       client.close()
//     })
//   })
// }

// insertSubject (subject) {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
//       const db = client.db(dbName)
//       db.collection('Subject').findOne({ '$or': [{ 'subjectId': subject.subjectId }, { 'subjectName': subject.subjectName }] }, (err, data) => {
//         if (err) { throw err }
//         if (!data) {
//           db.collection('Subject').insertOne(subject, (err, result) => {
//             if (err) { throw err }
//             client.close()
//             return resolve(true)
//           })
//         } else {
//           client.close()
//           return resolve(false)
//         }
//       })
//       client.close()
//     })
//   })
// }

// getAllCourseByThisSubject (subjname) {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
//       const db = client.db(dbName)
//       db.collection('Subject').find({}).project({ '_id': 0 }).toArray((err, data) => {
//         if (err) { throw err }
//         client.close()
//         return resolve(data)
//       })
//       client.close()
//     })
//   })
// }

// insertCourseByThisSubject (subjid, courseData) {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
//       if (_err) { resolve(null) }
//       const db = client.db(dbName)
//       db.collection('Subject').findOneAndUpdate({ 'subjectId': subjid }, { '$push': { 'courses': courseData } }, (err, result) => {
//         if (err) { throw err }
//         if (result.value) {
//           client.close()
//           return resolve(true)
//         } else {
//           client.close()
//           return resolve(false)
//         }
//       })
//       client.close()
//     })
//   })
// }

// getObjectRegisterCourseBySubjectId (id) {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//       if (err) { resolve(null) }
//       const db = client.db(dbName)
//       db.collection('User').find({ typeOfUser: 'student', 'RegisteredCourse': { $elemMatch: { subjectId: id } } }).count((err, StudentData) => {
//         if (err) { throw err }
//         db.collection('User').find({ typeOfUser: 'professor', 'RegisteredCourse': { $elemMatch: { subjectId: id } } }).toArray((err, TeacherData) => {
//           if (err) { throw err }
//           client.close()
//           let ObjectData = []
//           ObjectData.push({ student: StudentData })
//           let listTecher = []
//           for (var i = 0; i < TeacherData.length; i++) {
//             listTecher.push({ firstName: TeacherData[i].firstName, lastName: TeacherData[i].lastName })
//           }
//           ObjectData.push(listTecher)
//           return resolve(ObjectData)
//         })
//       })
//       // client.close()
//     })
//   })
// }

// getNameTeacherInRegisterCourseBySubjectId (type) {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//       if (err) { resolve(null) }
//       const db = client.db(dbName)
//       db.collection('User').find(
//         { typeOfUser: 'professor', 'RegisteredCourse': { $elemMatch: { subjectId: type } } }).toArray((err, data) => {
//         if (err) { throw err }
//         var listData = []
//         for (var i = 0; i < data.length; i++) {
//           var obj = { firstName: data[i].firstName, lastName: data[i].lastName }
//           listData.push(obj)
//         }
//         client.close()
//         return resolve(listData)
//       })
//       // eslint-disable-next-line no-unused-expressions
//       // client.close()
//     })
//   })
// }

// getCountRegisterCourseStudentBySubjectId (id) {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//       if (err) { resolve(null) }
//       const db = client.db(dbName)
//       db.collection('User').find({ typeOfUser: 'student', 'RegisteredCourse': { $elemMatch: { subjectId: id } } }).count((err, data) => {
//         if (err) { throw err }
//         client.close()
//         return resolve(true)
//       })
//       // client.close()
//     })
//   })
// }

// deleteCourse (sjid, cid) {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//       if (err) { resolve(null) }
//       const db = client.db(dbName)
//       // eslint-disable-next-line no-undef
//       // eslint-disable-next-line no-undef
//       db.collection('Subject').updateMany({ subjectId: sjid }, { $pull: { courses: { courseId: Number.parseInt(cid) } } }, (err, data) => {
//         if (err) { throw err }
//         db.collection('User').updateMany({ '$or': [{ typeOfUser: 'professor' }, { typeOfUser: 'student' }] }, { $pull: { RegisteredCourse: { subjectId: sjid } } }, (err, data) => {
//           if (err) { throw err }
//           client.close()
//           return resolve(true)
//         })
//       })
//       // client.close()
//     })
//   })
// }

// getCourseBySubjectAndCourseId (subjectId, courseId) {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//       if (err) { resolve(null) }
//       const db = client.db(dbName)
//       db.collection('Subject').aggregate(
//         [
//           {
//             '$match': { '$and':
//             [
//               { 'subjectId': subjectId },
//               { 'courses.courseId': Number.parseInt(courseId) }
//             ] }
//           },
//           {
//             '$project': {
//               '_id': 0,
//               'subjectId': 1,
//               'subjectName': 1,
//               'courses': {
//                 '$filter': {
//                   'input': '$courses',
//                   'as': 'course',
//                   'cond': { '$eq': [ '$$course.courseId', Number.parseInt(courseId) ] }
//                 }
//               }
//             }
//           }
//         ]
//       ).toArray((err, data) => {
//         if (err) { throw err }
//         client.close()
//         return resolve(data)
//       })
//       client.close()
//     })
//   })
// }
