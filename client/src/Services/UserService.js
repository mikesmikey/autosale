import axios from 'axios'
import User from '../Objects/User'
import Student from '../Objects/Student'
import Professor from '../Objects/Professor'
import Staff from '../Objects/Staff'

class UserService {
  userObjFormCheck (userObj) {
    return userObj.validMethod()
  }

  createUserObjectByType (userData) {
    if (userData.typeOfUser === 'student') return new Student(userData)
    else if (userData.typeOfUser === 'professor') return new Professor(userData)
    else if (userData.typeOfUser === 'staff') return new Staff(userData)
    else return new User(userData)
  }

  getAllUserBySelectType (type, startPos, limit) {
    return new Promise((resolve, reject) => {
      axios.get(`/user/type/${type}/${startPos || 0}/${limit || 0}`).then((result) => {
        resolve(result.data)
      })
    })
  }

  searchAllUserByTypeAndUsername (type, userId, startPos, limit) {
    return new Promise((resolve, reject) => {
      var url = `/user/${userId.length === 0 ? `type/${type}` : `${type}/${userId}`}/${startPos || 0}/${limit || 0}`
      axios.get(url).then((result) => {
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

  editUser (newUserData) {
    return new Promise((resolve, reject) => {
      axios.post(`/user/edit`, { 'userData': newUserData }).then((result) => {
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
      axios.post(`/user/token`, { 'token': token }).then((result) => {
        resolve(result.data)
      })
    })
  }

  countUserByTypeAndUsername (type, username) {
    return new Promise((resolve, reject) => {
      var url = `/user/count/${username.length === 0 ? `${type}` : `${type}/${username}`}`
      axios.get(url).then((result) => {
        resolve(result.data)
      })
    })
  }

  getUserByUsername (username) {
    return new Promise((resolve, reject) => {
      var url = `/user/${username}`
      axios.get(url).then((result) => {
        resolve(result.data)
      })
    })
  }
}

export default UserService
