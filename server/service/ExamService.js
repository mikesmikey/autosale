const Exam = require('../dao/ExamDAO')
const User = require('../dao/UserDAO')
const Subject = require('../dao/SubjectDAO')
const Building = require('../dao/BuildingDAO')

class ExamService {
  confirmExam (examId) {
    return new Promise((resolve, reject) => {
      const examDAO = new Exam()
      examDAO.getExamByObjId(examId).then((exam) => {
        this.validExamData(exam).then(result => {
          const validResult = this.checkExamConfirmError(result)
          if (typeof (validResult) === 'object') {
            console.log(`SYSTEM: Exam Valid Successful but found 'ERROR'. returning error to client . . .`)
            resolve({ examConfirm: false, validResult })
          } else {
            console.log('SYSTEM: Exam Valid Successful. about to start generate seats . . .')
            this.generateSeat(exam).then((generateResult) => {
              if (generateResult) {
                console.log('SYSTEM: generate seats succussfully.')
                console.log('SYSTEM: CONFIRMING EXAM . . . .')
                examDAO.updateExamData(examId, { examConfirm: true }, (_err, result) => {
                  if (result) {
                    console.log('SYSTEM: Update examiner data . . .')
                    this.assignExaminer(exam).then(() => {
                      console.log('SYSTEM: Exam Confirmed. returning to client.')
                      resolve({ examConfirm: true })
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  }

  checkExamConfirmError (errorArr) {
    for (let i = 0; i < errorArr.length; i++) {
      for (let key in errorArr[i]) {
        if (!errorArr[i][key]) {
          return { [key]: errorArr[i][key] }
        }
      }
    }
    return true
  }

  validExamData (exam) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.validCourse(exam),
        this.validExamSimpleData(exam),
        this.validRoomData(exam)
      ]).then(result => {
        resolve(result)
      })
    })
  }

  validCourse (exam) {
    return new Promise((resolve, reject) => {
      const CourseDAO = new Subject()
      CourseDAO.getCourseBySubjectAndCourseId(exam.subjectId, exam.courseId, function (err, course) {
        if (err) {
          throw err
        }
        if (course.length > 0) { resolve({ 'courseExist': true }) } else resolve({ 'courseExist': false })
      })
    })
  }

  validExamSimpleData (exam) {
    return new Promise((resolve, reject) => {
      if (new Date(exam.date).toDateString() === 'Invalid Date') {
        resolve({ 'validDate': false })
      }
      if (exam.examName === '' || exam.examName.length === 0) {
        resolve({ 'validExamName': false })
      }
      if (exam.maxScore <= 0 || exam.maxScore % 1 !== 0) {
        resolve({ 'validMaxScore': false })
      }
      resolve({ 'validSimpleData': true })
    })
  }

  validRoomData (exam) {
    return new Promise((resolve, reject) => {
      this.validRoom(exam).then(roomResult => {
        if (roomResult.roomExist) {
          Promise.all([
            this.validAvailableSeat(exam),
            this.validExaminerInRoom(exam)
          ]).then(insideRoomResult => {
            insideRoomResult.forEach(item => {
              for (let key in item) {
                roomResult[key] = item[key]
              }
            })
            resolve(roomResult)
          })
        } else {
          resolve(roomResult)
        }
      })
    })
  }

  validRoom (exam) {
    return new Promise((resolve, reject) => {
      if (exam.rooms && exam.rooms.length > 0) {
        resolve({ 'roomExist': true })
      } else {
        resolve({ 'roomExist': false })
      }
    })
  }

  validAvailableSeat (exam) {
    return new Promise((resolve, reject) => {
      var totalSeat = 0
      exam.rooms.forEach(room => {
        totalSeat += Number.parseInt(room.maxStudent)
      })
      const CourseDAO = new Subject()
      CourseDAO.getCourseBySubjectAndCourseId(exam.subjectId, exam.courseId).then((result) => {
        if (result.length >= 1) {
          const userDAO = new User()
          userDAO.getAllStudentByRegisteredCourse(exam.subjectId, exam.courseId, (_err, students) => {
            if (_err) {
              throw _err
            }
            if (students) {
              if (totalSeat >= students.length) {
                resolve({ 'enoughSeat': true })
              } else {
                resolve({ 'enoughSeat': false })
              }
            }
          })
        } else {
          resolve({ 'courseExist': false })
        }
      })
    })
  }

  validExaminerInRoom (exam) {
    return new Promise((resolve, reject) => {
      let flag = true
      exam.rooms.forEach(room => {
        if (!room.examiners || room.examiners.length <= 0) {
          flag = false
        }
      })
      if (flag) {
        resolve({ 'enoughExaminer': true })
      } else {
        resolve({ 'enoughExaminer': false })
      }
    })
  }

  shuffle (a) {
    var j, x, i
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = a[i]
      a[i] = a[j]
      a[j] = x
    }
    return a
  }

  generateSeat (exam) {
    return new Promise((resolve, reject) => {
      const userDAO = new User()
      userDAO.getAllStudentByRegisteredCourse(exam.subjectId, exam.courseId, (_err, students) => {
        let startColumn = 0
        let startRow = 0
        let lastColumn = 0
        let lastRow = 0
        let startStudent = 0
        let lastStudent = 0

        if (exam.seatOrderType === 'shuffle') {
          students = this.shuffle(students)
        }

        const quit = () => {
          resolve(true)
        }
        for (let i = 0, p = Promise.resolve(); i < exam.rooms.length; i++) {
          p = p.then((_) => new Promise(resolve => {
            let room = exam.rooms[i]
            let calculateStart = () => {
              if (lastColumn !== 0 && lastRow !== 0) {
                if (lastColumn + 1 > room.column - 1) {
                  if (lastRow + 1 <= room.row - 1) {
                    startRow = lastRow + 1
                  }
                } else {
                  startColumn = lastColumn + 1
                }
              }
              if (lastStudent !== 0 && startStudent <= students.length - 1) {
                startStudent = lastStudent + 1
              }
            }
            calculateStart()
            // console.log(`student amount: ${students.length} start column : ${startColumn} start row : ${startRow} start student : ${startStudent} max student : ${room.maxStudent}`)
            this.mappingDefaultSeat(room).then((seatArr) => {
              if (typeof (seatArr) === 'object') {
                this.mappingAlreadyAssignSeat(exam, room, seatArr).then((mappedSeatArr) => {
                  this.assignStudent(exam.seatLineUpType, students, mappedSeatArr, startColumn, startRow, startStudent, room.maxStudent).then((assignedResult) => {
                    // console.log('student length ' + students.length)
                    exam.rooms[i].examSeats = assignedResult.seatArr
                    lastColumn = assignedResult.lastColumn
                    lastRow = assignedResult.lastRow
                    lastStudent = assignedResult.lastStudent
                    const examDAO = new Exam()
                    // console.log(`last column : ${lastColumn} last row : ${lastRow} last student : ${lastStudent} max student : ${room.maxStudent}`)
                    examDAO.updateExamData(exam._id, { 'rooms': exam.rooms }).then(() => {
                      if (i === exam.rooms.length - 1) {
                        resolve()
                        quit()
                      }
                      resolve()
                    })
                  })
                })
              } else {
                if (i === exam.rooms.length - 1) {
                  resolve()
                  quit()
                }
                resolve()
              }
            })
          })
          )
        }
      })
    })
  }

  mappingDefaultSeat (room) {
    return new Promise((resolve, reject) => {
      const roomDAO = new Building()
      roomDAO.getRoomByRoomId(room.roomId, (_err, result) => {
        if (result.length === 1) {
          let seatArr = []
          let roomInfo = result[0].rooms[0]
          let char = 65 // A
          for (let i = 0; i < roomInfo.column; i++) {
            seatArr[i] = []
            for (let j = 0; j < roomInfo.row; j++) {
              seatArr[i][j] = { seatNumber: `${j + 1}${String.fromCharCode(char)}` }
            }
            char++
          }
          resolve(seatArr)
        } else {
          resolve()
        }
      })
    })
  }

  mappingAlreadyAssignSeat (exam, room, seatArr) {
    return new Promise((resolve, reject) => {
      var examDAO = new Exam()
      examDAO.getAllExamByDateAndRoom(exam.date, room.roomId, (_err, exams) => {
        if (exams.length > 0) {
          exams.forEach(otherExam => {
            if (otherExam.rooms || otherExam.rooms.length > 0) {
              if (exam._id.toString() !== otherExam._id.toString()) {
                otherExam.rooms.forEach(otherExamRoom => {
                  if (otherExamRoom.startTime === room.startTime && otherExam.examConfirm) {
                    for (let i = 0; i < otherExamRoom.examSeats.length; i++) {
                      for (let j = 0; j < otherExamRoom.examSeats[i].length; j++) {
                        if (otherExamRoom.examSeats[i][j]) {
                          if (otherExamRoom.examSeats[i][j].studentCode) {
                            seatArr[i][j] = otherExamRoom.examSeats[i][j]
                          }
                        }
                      }
                    }
                  }
                })
              }
            }
          })
        }
        resolve(seatArr)
      })
    })
  }

  assignStudent (lineUpType, students, seatArr, startColumn, startRow, startStudent, maxStudent) {
    return new Promise((resolve, reject) => {
      let studentCount = startStudent
      if (students.length > seatArr.length * seatArr[0].length) {
        console.log('WARNING: SEAT NOT ENOUGH.')
      }
      let lastColumn = startColumn; let lastRow = startRow
      let ownedSeatArr = []

      console.log(`start student: ${startStudent}, max student: ${maxStudent}`)
      console.log(`start count: ${studentCount}, max student: ${students.length - 1}`)
      if (lineUpType === 'vertical') {
        for (let i = 0; i < seatArr.length; i++) {
          ownedSeatArr[i] = []
          if (studentCount === (startStudent + maxStudent) - 1) {
            ownedSeatArr[i][0] = {}
            ownedSeatArr[i][0].seatNumber = seatArr[i][0].seatNumber
            ownedSeatArr[i][0].studentCode = students[studentCount].username
            ownedSeatArr[i][0].status = 'unregistered'
            lastColumn = i + startColumn
            lastRow = 0 + startRow
            resolve({ seatArr: ownedSeatArr, lastColumn: lastColumn, lastRow: lastRow, lastStudent: studentCount })
            break
          }
          for (let j = 0; j < seatArr[i].length; j++) {
            if (!seatArr[i][j].studentCode) {
              if (studentCount <= students.length - 1) {
                if (studentCount === (startStudent + maxStudent) - 1) {
                  // console.log(students[studentCount].username)
                  ownedSeatArr[i][j] = {}
                  ownedSeatArr[i][j].seatNumber = seatArr[i][j].seatNumber
                  ownedSeatArr[i][j].studentCode = students[studentCount].username
                  ownedSeatArr[i][j].status = 'unregistered'
                  lastColumn = i + startColumn
                  lastRow = j + startRow
                  resolve({ seatArr: ownedSeatArr, lastColumn: lastColumn, lastRow: lastRow, lastStudent: studentCount })
                  break
                }
                if (studentCount <= students.length - 1) {
                  ownedSeatArr[i][j] = {}
                  ownedSeatArr[i][j].seatNumber = seatArr[i][j].seatNumber
                  ownedSeatArr[i][j].studentCode = students[studentCount].username
                  ownedSeatArr[i][j].status = 'unregistered'
                  lastColumn = i + startColumn
                  lastRow = j + startRow
                  studentCount++
                } else {
                  resolve({ seatArr: ownedSeatArr, lastColumn: lastColumn, lastRow: lastRow, lastStudent: studentCount })
                  break
                }
              }
            }
          }
        }
      } else if (lineUpType === 'horizontal') {
        for (let i = 0; i < seatArr[0].length; i++) {
          if (studentCount === (startStudent + maxStudent) - 1) {
            resolve({ seatArr: ownedSeatArr, lastColumn: lastColumn, lastRow: lastRow, lastStudent: studentCount })
            break
          }
          for (let j = 0; j < seatArr.length; j++) {
            if (!ownedSeatArr[j]) {
              ownedSeatArr[j] = []
            }
            if (!seatArr[j][i].studentCode) {
              if (studentCount <= students.length - 1) {
                if (studentCount === (startStudent + maxStudent) - 1) {
                  ownedSeatArr[j][i] = {}
                  ownedSeatArr[j][i].seatNumber = seatArr[j][i].seatNumber
                  ownedSeatArr[j][i].studentCode = students[studentCount].username
                  ownedSeatArr[j][i].status = 'unregistered'
                  lastColumn = i + startColumn
                  lastRow = j + startRow
                  resolve({ seatArr: ownedSeatArr, lastColumn: lastColumn, lastRow: lastRow, lastStudent: studentCount })
                  break
                }
                if (studentCount <= students.length - 1) {
                  ownedSeatArr[j][i] = {}
                  ownedSeatArr[j][i].seatNumber = seatArr[j][i].seatNumber
                  ownedSeatArr[j][i].studentCode = students[studentCount].username
                  ownedSeatArr[j][i].status = 'unregistered'
                  lastColumn = j + startColumn
                  lastRow = i + startRow
                  studentCount++
                } else {
                  resolve({ seatArr: ownedSeatArr, lastColumn: lastColumn, lastRow: lastRow, lastStudent: studentCount })
                  break
                }
              }
            }
          }
        }
      }
      resolve({ seatArr: ownedSeatArr, lastColumn: lastColumn, lastRow: lastRow, lastStudent: studentCount })
    })
  }

  assignExaminer (exam) {
    return new Promise((resolve, reject) => {
      const userDAO = new User()
      exam.rooms.forEach(room => {
        room.examiners.forEach(examiners => {
          userDAO.getUserByUsername(examiners.username, (err, result) => {
            if (err) {
              throw err
            }
            if (result) {
              var examListArr = []
              if (result.examList) {
                examListArr = examListArr.concat(result.examList)
              }
              examListArr.push(exam._id.toString())
              result.examList = examListArr
              result.password = null //prevent md5 encrypt
              userDAO.updateUserData(result, (err, result) => {
                if (err) {
                  throw err
                }
                resolve(true)
              })
            } else {
              resolve(false)
            }
          })
        })
      })
    })
  }
}

module.exports = ExamService
