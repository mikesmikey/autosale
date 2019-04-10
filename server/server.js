const express = require('express')
const expPretty = require('express-prettify')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
// const cors= require('cors')
app.use(bodyParser.json())
app.use(expPretty({ query: 'pretty' }))
// app.use(cors())

// disable cors due to the server will not using cross origin feature.

const WebDAO = require('./WebDAO')
const WebService = require('./WebService')

const WebDAOObj = new WebDAO()
const WebServiceObj = new WebService()

app.get('/users', (req, res) => {
  WebDAOObj.getAllUser().then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/users/type/:userType', (req, res) => {
  WebDAOObj.getAllUserByType(req.params.userType).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/users/:type/:username', (req, res) => {
  WebDAOObj.getAllUserByTypeAndUsername(req.params.type, req.params.username).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/subjects/id_:subjid/:subjname', (req, res) => {
  WebDAOObj.getAllSubjectBySubjectIdOrSubjectName(req.params.subjid, req.params.subjname).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.post('/user', (req, res) => {
  WebDAOObj.insertUser(req.body.registerForm).then((pass) => {
    res.send(pass)
  })
})

app.get('/user/:username', (req, res) => {
  WebDAOObj.getUserByUsername(req.params.username).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.post('/login', (req, res) => {
  WebServiceObj.loginAuth(req.body.loginInfo).then((pass) => {
    res.send(pass)
  })
})

app.post('/user/remove/:username', (req, res) => {
  WebDAOObj.deleteUserByUsername(req.params.username).then((pass) => {
    res.send(pass)
  })
})

app.post('/user/add', (req, res) => {
  WebDAOObj.insertUser(req.body.userData).then((pass) => {
    res.send(pass)
  })
})

app.post('/user/edit', (req, res) => {
  WebDAOObj.editUser(req.body.userData).then((pass) => {
    res.send(pass)
  })
})

app.post('/autogenerate', (req, res) => {
  WebServiceObj.autoGenerateSampleUserData().then((pass) => {
    res.send(pass)
  })
})

app.get('/facultys', (req, res) => {
  WebDAOObj.getAllFaculty().then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.post('/user/addmany', (req, res) => {
  WebDAOObj.addManyStudents(req.body.usersData).then((pass) => {
    res.send(pass)
  })
})

app.get('/subjects', (req, res) => {
  WebDAOObj.getAllSubject().then((data) => {
    // console.log(data)
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.post('/subject/add', (req, res) => {
  WebDAOObj.insertSubject(req.body.subjectData).then((pass) => {
    res.send(pass)
  })
})

app.post('/token', (req, res) => {
  WebServiceObj.verifyToken(req.body.token).then((verifyResult) => {
    if (verifyResult) {
      WebDAOObj.getUserByUsername(verifyResult.username).then((result) => {
        res.send(result)
      })
    } else {
      res.send(verifyResult)
    }
  })
})

app.get('/yearAndTerm', (req, res) => {
  WebDAOObj.getYearAndTerm().then(data => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/subject', (req, res) => {
  WebDAOObj.getAllSubject().then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/exam/username/:username', (req, res) => {
  WebDAOObj.getAllExamByUsername(req.params.username).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/exam/:username/:SubjectId', (req, res) => {
  WebDAOObj.getAllExamBySubjectId(req.params.SubjectId, req.params.username).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/building', (req, res) => {
  WebDAOObj.getAllBuilding().then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/building/:building', (req, res) => {
  WebDAOObj.getAllBuilding().then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/building/:buildingname/:room', (req, res) => {
  WebDAOObj.getAllBuildingByRoom(req.params.buildingname, req.params.room).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.post('/building/edit', (req, res) => {
  WebDAOObj.editRoom(req.body.BuildingData).then((pass) => {
    res.send(pass)
  })
})

app.post('/yearAndTerm/edit', (req, res) => {
  WebDAOObj.editYearAndTerm(req.body.globalData).then((pass) => {
    res.send(pass)
  })
})

app.get('/courses/:year/:semester', (req, res) => {
  WebDAOObj.getAllCourseByYearAndSemester(req.params.year, req.params.semester).then(data => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/courses/:year/:semester/:subjectId', (req, res) => {
  WebDAOObj.getAllCourseByYearSemesterAndSubjectId(req.params.year, req.params.semester, req.params.subjectId).then(data => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/buildings', (req, res) => {
  WebDAOObj.getBuilding().then(data => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.post('/building/add', (req, res) => {
  WebDAOObj.insertBuilding(req.body.buildingData).then((pass) => {
    res.send(pass)
  })
})

app.post('/building/remove/:short_name', (req, res) => {
  WebDAOObj.deleteBuildingByShortName(req.params.short_name).then((pass) => {
    res.send(pass)
  })
})

app.get('/building/:short_name', (req, res) => {
  WebDAOObj.getBuildingByShortName(req.params.short_name).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/exams/subject=:subjectId/course=:courseId', (req, res) => {
  WebDAOObj.getAllExamBySubjectIdAndCourseId(req.params.subjectId, req.params.courseId).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.post('/exam', (req, res) => {
  WebDAOObj.insertExam(req.body.examData).then((pass) => {
    res.send(pass)
  })
})

app.delete('/exam/:objectid', (req, res) => {
  WebDAOObj.deleteExam(req.params.objectid).then((pass) => {
    res.send(pass)
  })
})

app.get('/exams/date=:day/:month/:year/room=:roomId', (req, res) => {
  const strDate = `${req.params.day}/${req.params.month}/${req.params.year}`
  WebDAOObj.getAllExamByDateAndRoom(strDate, req.params.roomId).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.post('/exam/room', (req, res) => {
  WebDAOObj.addRoomIntoExam(req.body.examId, req.body.roomData).then((pass) => {
    if (pass) {
      res.send(pass)
    }
  })
})

app.listen(port, () => {
  console.log(`App listening on ${port}`)
})
