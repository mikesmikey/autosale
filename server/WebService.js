const jwt = require('jsonwebtoken')
const fs = require('fs')

const WebDAO = require('./WebDAO')

const secret = fs.readFileSync('secret.key').toString()

class WebService {
  loginAuth (loginInfo) {
    return new Promise((resolve, reject) => {
      var DAO = new WebDAO()
      DAO.getUserByUsername(loginInfo.username).then((result) => {
        if (result) {
          if (loginInfo.password === result.password) {
            return resolve({
              userData: result,
              token: this.provideToken(result)
            })
          }
          return resolve(false)
        } else {
          return resolve(false)
        }
      })
    })
  }

  provideToken (userData) {
    const token = jwt.sign({ username: userData.username }, secret, { expiresIn: 60 * 60 })
    return token
  }

  verifyToken (token) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(jwt.verify(token, secret))
      } catch (err) {
        return resolve(false)
      }
    })
  }

  autoGenerateSampleUserData () {
    return new Promise((resolve, reject) => {
      var DAO = new WebDAO()

      const nameTable = ['สมหมาย', 'สมหมาน', 'สมปอง', 'สมศรี', 'สมยศ', 'สมใจ', 'สมสู่', 'สมเศร็จ', 'สมบูรณ์', 'สมศิริ']
      const surnametable = ['จันอังคาร', 'จริงใจ', 'ใจดี', 'มูฮัมหมัด', 'ใจร้าย', 'บารัค', 'สมิธ', 'จอร์น', 'สมานฉันท์', 'ชินวัตร']
      const typeTable = ['student', 'professor', 'staff']

      var users = []
      for (var i = 0; i < 500; i++) {
        var userData = {}
        userData.username = '59100' + i
        userData.password = Number.parseInt(Math.random() * 100000000).toString()
        userData.firstName = nameTable[Number.parseInt(Math.random() * 10)]
        userData.lastName = surnametable[Number.parseInt(Math.random() * 10)]
        userData.typeOfUser = typeTable[Number.parseInt(Math.random() * 3)]
        userData.isExaminer = false

        if (userData.typeOfUser === 'student' || userData.typeOfUser === 'professor') {
          userData.facultyId = 1 + Number.parseInt(Math.random() * 3)
          userData.branchId = 1 + Number.parseInt(Math.random() * 3)
        }

        if (userData.typeOfUser === 'student') {
          userData.year = 3
          userData.isScore = false

          userData.courses = [
            {
              group: 1,
              subjectId: '76930959',
              courseId: 1
            }
          ]
        }

        if (userData.typeOfUser === 'staff') {
          userData.standing = 'แม่บ้าน'
        }
        users[i] = userData
      }
      DAO.insertManyUser(users).then((result) => {
        if (result) {
          return resolve(true)
        }
        return resolve(false)
      })
    })
  }

  confirmExam (examId) {
    return new Promise((resolve, reject) => {
      const DAO = new WebDAO()
      DAO.getExamByObjId(examId).then((exam) => {
        this.validExamData(exam).then(result => {
          const validResult = this.checkExamConfirmError(result)
          if (typeof (validResult) === 'object') {
            resolve(validResult)
          } else {
            this.generateSeat(exam.rooms)
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
      const DAO = new WebDAO()
      DAO.getCourseBySubjectAndCourseId(exam.subjectId, exam.courseId).then((course) => {
        if (course) { resolve({ 'courseExist': true }) } else resolve({ 'courseExist': false })
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
      const DAO = new WebDAO()
      DAO.getCourseBySubjectAndCourseId(exam.subjectId, exam.courseId).then((result) => {
        if (result.length === 1) {
          if (totalSeat > result[0].courses[0].max_students) {
            resolve({ 'enoughSeat': true })
          } else {
            resolve({ 'enoughSeat': false })
          }
        }
        resolve({ 'courseExist': false })
      })
    })
  }

  validExaminerInRoom (exam) {
    return new Promise((resolve, reject) => {
      exam.rooms.forEach(room => {
        if (room.examiners && room.examiners.length > 0) {
          resolve({ 'enoughExaminer': true })
        } else {
          resolve({ 'enoughExaminer': false })
        }
      })
    })
  }

  generateSeat (rooms) {
    return new Promise((resolve, reject) => {
      console.log(rooms)
      for (let i = 0; i < rooms.length; i++) {
        let room = rooms[i]
        console.log(room)
        for (let j = 0; j < room.maxStudent; j++) {
        }
      }
    })
  }

  assignStudent () {

  }
}
module.exports = WebService
