import axios from 'axios'

import UserService from './UserService'
const UserServiceObj = new UserService()

class AuthService {
  loginUsernameCheck (username) {
    if (username === '') {
      return false
    }
    return true
  }

  loginPasswordCheck (password) {
    if (password === '') {
      return false
    }
    return true
  }

  loginByToken (loginCallBack) {
    return new Promise((resolve, reject) => {
      const token = this.getCurrentToken()
      if (token) {
        UserServiceObj.getUserByToken(token).then((result) => {
          if (result) {
            this.login(loginCallBack(true, result), false)
          }
          resolve(true)
        })
      } else {
        resolve(true)
      }
    })
  }

  login (loginCallBack, data) {
    if (data.token) {
      this.keepTokenInLocalStore(data.token)
    }

    if (loginCallBack) {
      loginCallBack()
    }
  }

  logout (logoutCallBack) {
    this.removeTokenFromLocalStore()
    if (logoutCallBack) {
      logoutCallBack()
    }
  }

  checkAuth (data) {
    return new Promise((resolve, reject) => {
      if (!this.loginUsernameCheck(data.username)) {
        resolve({ error: 'username-blank' })
      } else if (!this.loginPasswordCheck(data.password)) {
        resolve({ error: 'password-blank' })
      } else {
        const sendData = { 'loginInfo': data }
        console.log(sendData)
        axios.post('/auth/login', sendData).then((result) => {
          console.log(result.data)
          resolve(result.data)
        })
      }
    })
  }

  getCurrentToken () {
    const token = localStorage.getItem('iAMToken')
    if (typeof (token) !== 'undefined' && token !== null) {
      return token
    } else { return false }
  }

  keepTokenInLocalStore (token) {
    localStorage.setItem('iAMToken', token)
  }

  removeTokenFromLocalStore () {
    localStorage.removeItem('iAMToken')
  }
}

export default AuthService
