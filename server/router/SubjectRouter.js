const express = require('express')
const SubjectRouter = express.Router()
// const app = express()
const Subject = require('../dao/SubjectDAO')
// const GlobalData = require('../dao/GlobalData')

SubjectRouter.route('/').get((req, res) => {
  Subject.find().select({ '_id': 0 }).then(function (subjects) {
    if (subjects) {
      res.json(subjects)
    } else {
      res.sendStatus(404)
    }
  })
})

SubjectRouter.route('/findone/id/:subjectId').get((req, res) => {
  Subject.find({ '$or': [{ 'subjectId': req.params.subjectId }] }).limit(16).select({ '_id': 0 }).then(function (subjects) {
    if (subjects) {
      res.json(subjects)
    } else {
      res.sendStatus(404)
    }
  })
})

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

SubjectRouter.route('/add').get((req, res) => {
  const subject = new Subject(req.body.subjectForm)
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

// SubjectRouter.route('/find/course/with/year/:year/semester/:semester').get((req, res) => {
//   Subject.aggregate([
//     {
//       '$match': { '$and':
//       [
//         { 'courses.school_year': Number.parseInt(year) },
//         { 'courses.semester': Number.parseInt(semester) }
//       ] }
//     },
//     {
//       '$project': {
//         '_id': 0,
//         'subjectId': 1,
//         'subjectName': 1,
//         'courses': {
//           '$filter': {
//             'input': '$courses',
//             'as': 'course',
//             'cond': {
//               '$and': [
//                 { '$eq': ['$$course.school_year', Number.parseInt(year)] },
//                 { '$eq': ['$$course.semester', Number.parseInt(semester)] }
//               ]
//             }
//           }
//         }
//       }
//     }
//   ]).then(function (subjects) {
//     if (subjects) {
//       res.json(subjects)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

// SubjectRouter.route('/find/course/with/year/:year/semester/:semester/id/:subjectId/options/:startPos/:limit').get((req, res) => {
//   var subId = req.params.subjectId
//   var lim = req.params.limit

//   if (subId === 'none') {
//     subId = ''
//   }
//   if (lim <= 0) {
//     lim = Number.MAX_SAFE_INTEGER
//   }

//   const regex = new RegExp(`${req.params.subId}`)
//   Subject.aggregate([
//     {
//       '$match': {
//         '$and':
//           [
//             { 'subjectId': { '$regex': regex } },
//             { 'courses.school_year': Number.parseInt(year) },
//             { 'courses.semester': Number.parseInt(semester) }
//           ]
//       }
//     },
//     {
//       '$project': {
//         '_id': 0,
//         'subjectId': 1,
//         'subjectName': 1,
//         'courses': {
//           '$filter': {
//             'input': '$courses',
//             'as': 'course',
//             'cond': {
//               '$and': [
//                 { '$eq': ['$$course.school_year', Number.parseInt(year)] },
//                 { '$eq': ['$$course.semester', Number.parseInt(semester)] }
//               ]
//             }
//           }
//         }
//       }
//     }
//   ])
//     .skip(Number.parseInt(req.param.startPos)).limit(Number.parseInt(lim))
//     .then(function (subjects) {
//       if (subjects) {
//         res.json(subjects)
//       } else {
//         res.sendStatus(404)
//       }
//     })
// })

// getYearAndTerm () {
//   return new Promise((resolve, reject) => {
//     mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//       if (err) { resolve(null) }
//       const db = client.db(dbName)
//       if (!client) return resolve(null)
//       db.collection('GlobalData').findOne({}, (err, data) => {
//         if (err) { throw err }
//         client.close()
//         return resolve(data)
//       })
//       client.close()
//     })
//   })
// }

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

module.exports = SubjectRouter

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
