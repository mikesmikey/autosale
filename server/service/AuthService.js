const jwt = require('jsonwebtoken')
const fs = require('fs')
const User = require('../dao/UserDAO')
const secret = fs.readFileSync('secret.key').toString()
const md5 = require('md5')

class AuthService {
  loginAuth (loginInfo) {
    return new Promise((resolve, reject) => {
      const user = new User()
      user.getUserByUsername(loginInfo.username, (_err, result) => {
        if (result) {
          if (md5(loginInfo.password) === result.password) {
            return resolve({
              userData: result,
              token: this.provideToken(result)
            })
          } else {
            return resolve({ error: 'wrong-password' })
          }
        } else {
          return resolve({ error: 'wrong-username' })
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
      const nameTable = ['สมหมาย', 'สมหมาน', 'สมปอง', 'สมศรี', 'สมยศ', 'สมใจ', 'สมสู่', 'สมเศร็จ', 'สมบูรณ์', 'สมศิริ']
      const surnametable = ['จันอังคาร', 'จริงใจ', 'ใจดี', 'มูฮัมหมัด', 'ใจร้าย', 'บารัค', 'สมิธ', 'จอร์น', 'สมานฉันท์', 'ชินวัตร']
      const typeTable = ['student', 'professor', 'staff']

      var users = []
      for (var i = 0; i < 1000; i++) {
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
              subjectId: Number.parseInt(Math.random() * 2) === 0 ? '76930959' : '40550559',
              courseId: 1
            }
          ]
        }

        if (userData.typeOfUser === 'staff') {
          userData.standing = 'แม่บ้าน'
        }
        users[i] = userData
      }
      const user = new User()
      user.insertManyUser(users, (_err, result) => {
        if (result) {
          return resolve(true)
        }
        return resolve(false)
      })
    })
  }
}

module.exports = AuthService
