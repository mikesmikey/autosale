import axios from 'axios'
class SubjectService {
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
    console.log('on client => ', subjid, subjname)
    return new Promise((resolve, reject) => {
      var url = '/subjects'
      if (subjid.length === 0 && subjname.trim().length > 0) {
        url = `/subjects/nm_${subjname}` // search by specified only name
      } else if (subjid.length > 0 && subjname.trim().length === 0) {
        url = `/subjects/id_${subjid}` // search by specified only id
      }
      axios.get(url)
        .then((result) => {
          resolve(result.data)
        })
    })
  }

  searchAllSubjectBySubjectId (subjid) {
    return new Promise((resolve, reject) => {
      var url = `/subject/id_${subjid}`
      axios.get(url)
        .then((result) => {
          resolve(result.data)
        })
    })
  }

  getAllCourseByThisSubject (subjname) {
    return new Promise((resolve, reject) => {
      var url = `/subject/${subjname}/courses/`
      axios.get(url)
        .then((result) => {
          resolve(result.data)
        })
    })
  }

  addCourseToThisSubject (subjid, courseData) {
    return new Promise((resolve, reject) => {
      axios.post(`/subject/id_${subjid}/course/add`, { 'courseData': courseData }).then((result) => {
        resolve(result.data)
      })
    })
  }
}
export default SubjectService
