import axios from 'axios'
class ExaminerService {
  getDataUserExamnier (user) {
    return new Promise((resolve, reject) => {
      axios.get(`/user/${user}`).then((result) => {
        if (result.data.isExaminer) {
          resolve(result.data)
        } else {
          resolve(null)
        }
      })
    })
  }
  checkSubjecetCurrent (subjectId) {
    return new Promise((resolve, reject) => {
      axios.get(`/subject/current/${subjectId}`).then((result) => {
        console.log(result.data)
        resolve(result.data)
      })
    })
  }
  getDataExam (objecId) {
    return new Promise((resolve, reject) => {
      axios.get(`/exam/objectid=${objecId}`).then((result) => {
        resolve(result.data)
      })
    })
  }
  getNumberRoom (username, array) {
    var result = []
    for (var i = 0; i < array.rooms.length; i++) {
      for (var j = 0; j < array.rooms[i].examiners.length; j++) {
        if (array.rooms[i].examiners[j].username === username) {
          result.push(i)
        }
      }
    }
    return result
  }
  countUserByTypeAndName (type, name) {
    return new Promise((resolve, reject) => {
      var url = `/user/count/${name.length === 0 ? `${type}` : `${type}/${name}`}`
      axios.get(url).then((result) => {
        resolve(result.data)
      })
    })
  }

  searchAllUserByTypeAndName (type, name, startPos, limit) {
    return new Promise((resolve, reject) => {
      var url = `/user/${name.length === 0 ? `type/${type}` : `${type}/${name}`}/${startPos || 0}/${limit || 0}`
      axios.get(url).then((result) => {
        resolve(result.data)
      })
    })
  }

  insertExaminerIntoRoom (Id, Data) {
    return new Promise((resolve) => {
      axios.post(`/exam/examiner`, { 'Id': Id, 'Data': Data }).then((result) => {
        resolve(result.data)
      })
    })
  }
}
export default ExaminerService
