const express = require('express')
const expPretty = require('express-prettify')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const UserRouter = require('./router/UserRouter')
const ExamRouter = require('./router/ExamRouter')
const AuthRouter = require('./router/AuthRouter')

const app = express()
const port = 5000
// const cors= require('cors')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(expPretty({ query: 'pretty' }))
// app.use(cors())
// disable cors due to the server will not using cross origin feature.

const dbname = 'ooad_kob'
mongoose.Promise = global.Promise
mongoose.connect(`mongodb+srv://jeff:jeff123@cluster0-mumpe.mongodb.net/${dbname}?retryWrites=true`, { useNewUrlParser: true })

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('connected to mongoose')
})

app.use('/user', UserRouter)
app.use('/exam', ExamRouter)
app.use('/auth', AuthRouter)

const WebDAO = require('./WebDAO')
const WebService = require('./WebService')

const WebDAOObj = new WebDAO()
const WebServiceObj = new WebService()

// app.get('/users', (req, res) => {
//   WebDAOObj.getAllUser().then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

// app.get('/users/count/:type', (req, res) => {
//   WebDAOObj.countUserInCollectionByType(req.params.type).then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

// app.get('/users/count/:type/:username', (req, res) => {
//   WebDAOObj.countUserInCollectionByTypeAndUsername(req.params.type, req.params.username).then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

// app.get('/users/type/:userType/:startPos/:limit', (req, res) => {
//   WebDAOObj.getAllUserByType(req.params.userType, req.params.startPos, req.params.limit).then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

// app.get('/users/:type/:username/:startPos/:limit', (req, res) => {
//   WebDAOObj.getAllUserByTypeAndUsername(req.params.type, req.params.username, req.params.startPos, req.params.limit).then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

// app.get('/users/examinercount/:type', (req, res) => {
//   WebDAOObj.countUserInCollectionByType(req.params.type).then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

// app.get('/users/examinercount/:type/:name', (req, res) => {
//   WebDAOObj.countUserInCollectionByTypeAndName(req.params.type, req.params.name).then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

// app.get('/users/examiner/type/:userType/:startPos/:limit', (req, res) => {
//   WebDAOObj.getAllUserByType(req.params.userType, req.params.startPos, req.params.limit).then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

// app.get('/users/examiner/:type/:name/:startPos/:limit', (req, res) => {
//   WebDAOObj.getAllUserByTypeAndName(req.params.type, req.params.name, req.params.startPos, req.params.limit).then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

// app.post('/exam/examiner', (req, res) => {
//   WebDAOObj.addExaminerIntoRoom(req.body.Id, req.body.Data).then((pass) => {
//     if (pass) {
//       res.send(pass)
//     }
//   })
// })

app.get('/subjects/id_:subjid/:subjname', (req, res) => {
  WebDAOObj.getAllSubjectBySubjectIdOrSubjectName(req.params.subjid, req.params.subjname).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

// app.post('/user', (req, res) => {
//   WebDAOObj.insertUser(req.body.registerForm).then((pass) => {
//     res.send(pass)
//   })
// })

// app.get('/user/:username', (req, res) => {
//   WebDAOObj.getUserByUsername(req.params.username).then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

// app.post('/login', (req, res) => {
//   WebServiceObj.loginAuth(req.body.loginInfo).then((pass) => {
//     res.send(pass)
//   })
// })

// app.post('/user/remove/:username', (req, res) => {
//   WebDAOObj.deleteUserByUsername(req.params.username).then((pass) => {
//     res.send(pass)
//   })
// })

// app.post('/user/add', (req, res) => {
//   WebDAOObj.insertUser(req.body.userData).then((pass) => {
//     res.send(pass)
//   })
// })

// app.post('/user/edit', (req, res) => {
//   WebDAOObj.editUser(req.body.userData).then((pass) => {
//     res.send(pass)
//   })
// })

// app.post('/autogenerate', (req, res) => {
//   WebServiceObj.autoGenerateSampleUserData().then((pass) => {
//     res.send(pass)
//   })
// })

app.get('/facultys', (req, res) => {
  WebDAOObj.getAllFaculty().then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

// app.post('/user/addmany', (req, res) => {
//   WebDAOObj.addManyStudents(req.body.usersData).then((pass) => {
//     res.send(pass)
//   })
// })

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

app.get('/subjects/nm_:subjname', (req, res) => {
  WebDAOObj.getAllSubjectBySubjectName(req.params.subjname).then((data) => {
    if (data != null) {
      // data.push({ found: true })
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/subjects/id_:subjid', (req, res) => {
  WebDAOObj.getAllSubjectBySubjectIdMoreOne(req.params.subjid).then((data) => {
    if (data != null) {
      // data.push({ found: true })
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/subject/id_:subjid', (req, res) => {
  WebDAOObj.getAllSubjectBySubjectId(req.params.subjid).then((data) => {
    if (data != null) {
      data.push({ found: true })
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/subject/:subjname/courses/', (req, res) => {
  WebDAOObj.getAllCourseByThisSubject(req.params.subjname).then((data) => {
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

app.post('/subject/id_:subjid/course/add', (req, res) => {
  WebDAOObj.insertCourseByThisSubject(req.params.subjid, req.body.courseData).then((pass) => {
    res.send(pass)
  })
})

// app.post('/token', (req, res) => {
//   WebServiceObj.verifyToken(req.body.token).then((verifyResult) => {
//     if (verifyResult) {
//       WebDAOObj.getUserByUsername(verifyResult.username).then((result) => {
//         res.send(result)
//       })
//     } else {
//       res.send(verifyResult)
//     }
//   })
// })

app.get('/yearAndTerm', (req, res) => {
  WebDAOObj.getYearAndTerm().then(data => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/yearAndTerms', (req, res) => {
  WebDAOObj.getAllYearAndTerm().then(data => {
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

// app.get('/exam/username/:username', (req, res) => {
//   WebDAOObj.getAllExamByUsername(req.params.username).then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

// app.get('/exam/:username/:SubjectId', (req, res) => {
//   WebDAOObj.getAllExamBySubjectId(req.params.SubjectId, req.params.username).then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

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
app.get('/getDataUserExaminer/:username', (req, res) => {
  WebDAOObj.getUserExaminerByUserName(req.params.username).then(data => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})
app.get('/getDataExam/:ObjectId', (req, res) => {
  WebDAOObj.getExamDataByObjectId(req.params.ObjectId).then(data => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})
app.get('/checkSubjectCurrent/:subjectId', (req, res) => {
  WebDAOObj.checkSubjectCurrent(req.params.subjectId).then(data => {
    res.json(data)
  })
})
app.get('/courses/year=:year/semester=:semester/subject=:subjectId/start=:startPos/limit=:limit', (req, res) => {
  let params = req.params
  WebDAOObj.getAllCourseByYearSemesterAndSubjectId(params.year, params.semester, params.subjectId, params.startPos, params.limit).then(data => {
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

// app.get('/exams/subject=:subjectId/course=:courseId', (req, res) => {
//   WebDAOObj.getAllExamBySubjectIdAndCourseId(req.params.subjectId, req.params.courseId).then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

app.get('/registerCourse/teachar/:subjecId', (req, res) => {
  WebDAOObj.getNameTeacherInRegisterCourseBySubjectId(req.params.subjecId).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/registerCourse/:subjecId', (req, res) => {
  WebDAOObj.getObjectRegisterCourseBySubjectId(req.params.subjecId).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/subbjec/current', (req, res) => {
  WebDAOObj.checkSubjectCurrent().then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

// app.post('/exam', (req, res) => {
//   WebDAOObj.insertExam(req.body.examData).then((pass) => {
//     res.send(pass)
//   })
// })

// app.delete('/exam/:objectid', (req, res) => {
//   WebDAOObj.deleteExam(req.params.objectid).then((pass) => {
//     res.send(pass)
//   })
// })

// app.get('/exams/date=:day/:month/:year/room=:roomId', (req, res) => {
//   const strDate = `${req.params.day}/${req.params.month}/${req.params.year}`
//   WebDAOObj.getAllExamByDateAndRoom(strDate, req.params.roomId).then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

app.post('/course/delete/:a/:b', (req, res) => {
  WebDAOObj.deleteCourse(req.params.a, req.params.b).then((data) => {
    console.log(data)
    res.send(data)
  })
})

// app.post('/exam/room', (req, res) => {
//   WebDAOObj.addRoomIntoExam(req.body.examId, req.body.roomData).then((pass) => {
//     if (pass) {
//       res.send(pass)
//     }
//   })
// })

app.post('/examRoom/remove/:objId/:roomId/:startTime', (req, res) => {
  WebDAOObj.deleteExamRoom(req.params.objId, req.params.roomId, req.params.startTime).then((pass) => {
    res.send(pass)
  })
})

// app.get('/exam/:objId', (req, res) => {
//   WebDAOObj.getExamByObjId(req.params.objId).then((data) => {
//     if (data != null) {
//       res.json(data)
//     } else {
//       res.sendStatus(404)
//     }
//   })
// })

// app.post('/exam/room/update', (req, res) => {
//   WebDAOObj.updateExamData(req.body.examId, req.body.examData).then((pass) => {
//     if (pass) {
//       res.send(pass)
//     }
//   })
// })

// app.post('/exam/confirm', (req, res) => {
//   WebServiceObj.confirmExam(req.body.examId).then((result) => {
//     if (result) {
//       res.send(result)
//     }
//   })
// })

// app.post('/exam/seatType/update/:objId/:seatLineUpType/:seatOrderType', (req, res) => {
//   WebDAOObj.updateExamSeatType(req.params.objId, req.params.seatLineUpType, req.params.seatOrderType).then((pass) => {
//     if (pass) {
//       res.send(pass)
//     }
//   })
// })

app.get('/course/subject=:subjectId/course=:courseId', (req, res) => {
  WebDAOObj.getCourseBySubjectAndCourseId(req.params.subjectId, req.params.courseId).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/room/id=:roomId', (req, res) => {
  WebDAOObj.getRoomByRoomId(req.params.roomId).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})

app.listen(port, () => {
  console.log(`App listening on ${port}`)
})
