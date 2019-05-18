/* eslint-disable no-unused-vars */
const express = require('express')
const SubjectRouter = express.Router()
// const app = express()
const Subject = require('../dao/SubjectDAO')
const User = require('../dao/UserDAO')
const GlobalData = require('../dao/GlobalDataDAO')
// const GlobalData = require('../dao/GlobalData')

// [================= Subject =================]

// route done
SubjectRouter.route('/').get((req, res) => {
  Subject.find().select({ '_id': 0 }).then(function (subjects) {
    if (subjects.length > 0) {
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

// [================= Course =================]

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
  var skipNum = req.params.startPos

  if (subId === 'none') {
    subId = ''
  }
  if (lim <= 0) {
    lim = Number.MAX_SAFE_INTEGER
  }

  const regex = new RegExp(`${subId}`)
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
    .skip(Number.parseInt(skipNum)).limit(Number.parseInt(lim))
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
    Subject.find().elemMatch('courses', { 'school_year': Number.parseInt(NowCurrent.currentStudyYear), 'semester': Number.parseInt(NowCurrent.currentStudyTerm) }).then((data) => {
      let date = [NowCurrent.currentStudyYear, NowCurrent.currentStudyTerm]
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].courses.length; j++) {
          if (data[i].courses[j].school_year === Number.parseInt(NowCurrent.currentStudyYear) &&
            data[i].courses[j].semester === Number.parseInt(NowCurrent.currentStudyTerm)) {
            let qury = { 'indexCouresCurrent': data[i].courses[j].courseId - 1 }
            data[i].indexCouresCurrent = data[i].courses[j].courseId - 1
          }
        }
      }
      data.push(date)
      res.json(data)
      // res.json(data)
    })
  })
})

SubjectRouter.route('/current/:subjectId').get((req, res) => {
  GlobalData.findOne().then((NowCurrent) => {
    Subject.findOne({ 'subjectId': req.params.subjectId, 'courses': { school_year: NowCurrent.currentStudyYear, semester: NowCurrent.currentStudyTerm } }, (_err, data) => {
      if (!data) {
        res.send(true)
      } else {
        res.send(false)
      }
    })
  })
})

// getObjectCountRegisterCourseBySubjectId()
SubjectRouter.route('/regCourse/find/id/:subjectId').get((req, res) => {
  User.find({ typeOfUser: 'student', 'RegisteredCourse': { $elemMatch: { subjectId: req.params.subjectId } } }).count((StudentData) => {
    User.find({ typeOfUser: 'professor' }).elemMatch('RegisteredCourse', { subjectId: req.params.subjectId }).then(function (TeacherData) {
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
  const subject = new Subject()
  subject.getCourseBySubjectAndCourseId(req.params.subjectId, req.params.courseId).then((data) => {
    res.json(data)
  })
})

module.exports = SubjectRouter
