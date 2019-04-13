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
}
module.exports = WebService
