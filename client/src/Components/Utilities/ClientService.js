import axios from 'axios'
import Student from '../../Objects/Student'
import Professor from '../../Objects/Professor'
import Staff from '../../Objects/Staff'
import GlobalData from '../../Objects/GlobalData'

class ClientService {
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

  userObjFormCheck (userObj) {
    return userObj.validMethod()
  }

  createUserObjectByType (userData) {
    if (userData.typeOfUser === 'student') return new Student(userData)
    if (userData.typeOfUser === 'professor') return new Professor(userData)
    if (userData.typeOfUser === 'staff') return new Staff(userData)
  }

  getAllUserBySelectType (type) {
    return new Promise((resolve, reject) => {
      axios.get(`/users/type/${type}`).then((result) => {
        resolve(result.data)
      })
    })
  }

  getAllFaculty () {
    return new Promise((resolve, reject) => {
      axios.get(`/facultys`).then((result) => {
        resolve(result.data)
      })
    })
  }

  searchAllUserByTypeAndUsername (type, userId) {
    return new Promise((resolve, reject) => {
      var url = `/users/${userId.length === 0 ? `type/${type}` : `/${type}/${userId}`}`
      axios.get(url).then((result) => {
        resolve(result.data)
      })
    })
  }

  deleteUser (deleteUserId) {
    return new Promise((resolve, reject) => {
      axios.post(`/user/remove/${deleteUserId}`).then((result) => {
        resolve(result.data)
      })
    })
  }

  getUserByToken (token) {
    return new Promise((resolve, reject) => {
      axios.post(`/token`, { 'token': token }).then((result) => {
        resolve(result.data)
      })
    })
  }

  addUser (userData) {
    return new Promise((resolve, reject) => {
      axios.post(`/user/add`, { 'userData': userData }).then((result) => {
        resolve(result.data)
      })
    })
  }

  addManyUsers (userData) {
    return new Promise((resolve, reject) => {
      axios.post(`/user/addmany`, { 'userData': userData }).then((result) => {
        resolve(result.data)
      })
    })
  }

  editUser (newUserData) {
    return new Promise((resolve, reject) => {
      axios.post(`/user/edit`, { 'userData': newUserData }).then((result) => {
        resolve(result.data)
      })
    })
  }

  loginByToken (logoutCallBack) {
    return new Promise((resolve, reject) => {
      const token = this.getCurrentToken()
      if (token) {
        this.getUserByToken(token).then((result) => {
          if (result) {
            this.login(logoutCallBack(true, result), false)
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

  checkAuth (data) {
    return new Promise((resolve, reject) => {
      if (this.loginUsernameCheck(data.username) && this.loginPasswordCheck(data.password)) {
        const sendData = { 'loginInfo': data }
        axios.post('/login', sendData).then((result) => {
          resolve(result.data)
        })
      } else {
        resolve(false)
      }
    })
  }





  /* ===========[GlobalData Service]=================== */
  getYearAndTerm () {
    return new Promise((resolve, reject) => {
      axios.get(`/yearAndTerm`).then((result) => {

        resolve(result.data)
      })
    })
  }


  createGlobalDataObject (globalData) {
    return new GlobalData(globalData)
  }

  editGlobalData (newGlobalData) {
    return new Promise((resolve, reject) => {
      axios.post(`/yearAndTerm/edit`, { 'globalData': newGlobalData }).then((result) => {
        resolve(result.data)
      })
    })
  }

  getAllExamBySubjectId (SubjectId, username) {
    return new Promise((resolve) => {
      var url = `/exam/${SubjectId.length === 0 ? `username/${username}` : `/${username}/${SubjectId}`}`
      axios.get(url).then((result) => {
        resolve(result.data)
      })
    })
  }
  
  getAllSubject () {
    return new Promise((resolve) => {
      axios.get(`/subject`).then((result) => {
        resolve(result.data)
      })
    })
  }


 }



export default ClientService
