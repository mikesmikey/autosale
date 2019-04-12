import axios from 'axios'
import Student from '../../Objects/Student'
import Professor from '../../Objects/Professor'
import Staff from '../../Objects/Staff'
import GlobalData from '../../Objects/GlobalData'
import Building from '../../Objects/Building'
import BuildingData from '../../Objects/BuildingData'

class ClientService {
  // ==========[Auth Service]=================

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

  // ==========[User Service]=================

  userObjFormCheck (userObj) {
    return userObj.validMethod()
  }

  createUserObjectByType (userData) {
    if (userData.typeOfUser === 'student') return new Student(userData)
    if (userData.typeOfUser === 'professor') return new Professor(userData)
    if (userData.typeOfUser === 'staff') return new Staff(userData)
  }

  getAllUserBySelectType (type, startPos, limit) {
    return new Promise((resolve, reject) => {
      axios.get(`/users/type/${type}/${startPos || 0}/${limit || 0}`).then((result) => {
        resolve(result.data)
      })
    })
  }

  searchAllUserByTypeAndUsername (type, userId, startPos, limit) {
    return new Promise((resolve, reject) => {
      var url = `/users/${userId.length === 0 ? `type/${type}` : `${type}/${userId}`}/${startPos || 0}/${limit || 0}`
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
      axios.post(`/token`, { 'token': token }).then((result) => {
        resolve(result.data)
      })
    })
  }

  countUserByTypeAndUsername (type, username) {
    return new Promise((resolve, reject) => {
      var url = `/users/count/${username.length === 0 ? `${type}` : `${type}/${username}`}`
      axios.get(url).then((result) => {
        resolve(result.data)
      })
    })
  }

  // ==========[Faculty Service]=================

  getAllFaculty () {
    return new Promise((resolve, reject) => {
      axios.get('/facultys').then((result) => {
        resolve(result.data)
      })
    })
  }

  // ==========[Subject Service]=================

  getAllSubject () {
    return new Promise((resolve, reject) => {
      axios.get('/subjects').then((result) => {
        resolve(result.data)
      })
    })
  }

  addSubject (subjectData) {
    return new Promise((resolve, reject) => {
      axios.post(`/subject/add`, { 'subjectData': subjectData }).then((result) => {
        resolve(result.data)
      })
    })
  }

  searchAllSubjectBySubjectIdOrSubjectName (subjid, subjname) {
    return new Promise((resolve, reject) => {
      var url = `/subjects/${subjid.length === 0 ? `name/${subjname}` : `/id_${subjid}/${subjname}`}`
      axios.get(url)
        .then((result) => {
          resolve(result.data)
        })
    })
  }

  // ==========[Student Service]=================

  addManyStudents (users) {
    return new Promise((resolve, reject) => {
      axios.post(`/user/addmany`, { 'usersData': users }).then((result) => {
        resolve(result.data)
      })
    })
  }

  // ==========[Token Service]=================

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

  // ==========[Course Service]=================

  // coming with subject id, name :)
  getAllCurrentCourse () {
    return new Promise((resolve, reject) => {
      this.getYearAndTerm().then((timeData) => {
        if (!timeData) return null
        axios.get(`/courses/${timeData.currentStudyYear}/${timeData.currentStudyTerm}`).then((result) => {
          resolve(result.data)
        })
      })
    })
  }

  searchAllCurrentCourseBySubjectId (subjectId, startPos, limit) {
    return new Promise((resolve, reject) => {
      this.getYearAndTerm().then((timeData) => {
        if (!timeData) return null
        axios.get(`/courses/year=${timeData.currentStudyYear}/semester=${timeData.currentStudyTerm}/subject=${subjectId || 'none'}/start=${startPos || 0}/limit=${limit || 0}`).then((result) => {
          resolve(result.data)
        })
      })
    })
  }

  // ==========[Building Service]=================

  getAllBuildingByRoom (buildingname, room) {
    return new Promise((resolve) => {
      var url = `/building/${room.length === 0 ? `/${buildingname}` : `/${buildingname}/${room}`}`
      axios.get(url).then((result) => {
        resolve(result.data)
      })
    })
  }

  getAllBuilding () {
    return new Promise((resolve) => {
      axios.get(`/buildings`).then((result) => {
        resolve(result.data)
      })
    })
  }

  createBuildingDataObject (buildingData) {
    return new BuildingData(buildingData)
  }

  addBuilding (buildingData) {
    return new Promise((resolve, reject) => {
      axios.post(`/building/add`, { 'buildingData': buildingData }).then((result) => {
        resolve(result.data)
      })
    })
  }

  deleteBuilding (shortname) {
    return new Promise((resolve, reject) => {
      axios.post(`/building/remove/${shortname}`).then((result) => {
        resolve(result.data)
      })
    })
  }

  createBuilding (BuildingData) {
    return new Building(BuildingData)
  }

  // ==========[Room Service]=================

  editRoom (newBuildingData) {
    return new Promise((resolve, reject) => {
      axios.post(`/building/edit`, { 'BuildingData': newBuildingData }).then((result) => {
        resolve(result.data)
      })
    })
  }

  // ==========[Exam Service]=================

  getAllExamBySubjectAndCourse (subjectId, courseId) {
    return new Promise((resolve, reject) => {
      axios.get(`/exams/subject=${subjectId}/course=${courseId}`).then((result) => {
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

  createExam (examData) {
    return new Promise((resolve) => {
      axios.post(`/exam`, { 'examData': examData }).then((result) => {
        resolve(result.data)
      })
    })
  }

  deleteExam (objectId) {
    return new Promise((resolve) => {
      axios.delete(`/exam/${objectId}`).then((result) => {
        resolve(result.data)
      })
    })
  }

  getAllExamOnCurrentDateAndRoom (date, roomId) {
    return new Promise((resolve, reject) => {
      axios.get(`/exams/date=${date}/room=${roomId}`).then((result) => {
        resolve(result.data)
      })
    })
  }

  insertRoomIntoExam (examId, roomData) {
    console.log(roomData)
    return new Promise((resolve) => {
      axios.post(`/exam/room`, { 'examId': examId, 'roomData': roomData }).then((result) => {
        resolve(result.data)
      })
    })
  }

  // ==============[Course Service]====================
  deleteCourse (a, b) {
    return new Promise((resolve, reject) => {
      axios.post(`/course/delete/${a}/${b}`).then((result) => {
        resolve(result.data)
      })
    })
  }

  getNameteacherFormRegisterCourseBySubjectId (subjecId) {
    return new Promise((resolve, reject) => {
      axios.get(`/registerCourse/teachar/${subjecId}`).then((result) => {
        resolve(result.data)
      })
    })
  }

  getAllDataCoures () {
    return new Promise((resolve, reject) => {
      this.getAllCouresCurrent().then((ArrayObj) => {
        if (ArrayObj.length > 1) {
          ArrayObj.forEach(element => {
            this.getObjectCountRegisterCourseBySubjectId(element[0].subjectNumber).then((result) => {
              element[0].studentRegister = result[0].student
              element[0].teacherName = result[1]
            })
          })
        }
        resolve(ArrayObj)
      })
    })
  }

  getAllCouresCurrent () {
    return new Promise((resolve, reject) => {
      axios.get('/subbjec/current').then((result) => {
        var listCourse = []
        for (var i = 0; i < result.data.length - 1; i++) {
          var indexCourse = result.data[i].indexCouresCurrent
          var objarray = [{
            subjectNumber: result.data[i].subjectId,
            subjectName: result.data[i].subjectName,
            students: result.data[i].courses[indexCourse].max_students,
            courseId: result.data[i].courses[indexCourse].courseId,
            groups: result.data[i].courses[indexCourse].max_groups,
            year: result.data[result.data.length - 1][0],
            semater: result.data[result.data.length - 1][1],
            teacherName: [],
            studentRegister: 0
          }]
          listCourse.push(objarray)
        }
        resolve(listCourse)
      })
    })
  }
  getObjectCountRegisterCourseBySubjectId (subjecId) {
    return new Promise((resolve, reject) => {
      axios.get(`/registerCourse/${subjecId}`).then((result) => {
        resolve(result.data)
      })
    })
  }
}

export default ClientService
