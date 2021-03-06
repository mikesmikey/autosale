import axios from 'axios'
class SubjectService {
  // serve done
  getAllSubject () {
    return new Promise((resolve, reject) => {
      axios.get('/subject').then((result) => {
        resolve(result.data)
      })
    })
  }
  // serve done
  addSubject (subjectData) {
    return new Promise((resolve, reject) => {
      axios.post(`/subject/add`, { 'subjectData': subjectData }).then((result) => {
        resolve(result.data)
      })
    })
  }
  // serve done
  searchAllSubjectBySubjectIdOrSubjectName (subjid, subjname) {
    return new Promise((resolve, reject) => {
      var url = '/subject'

      if (subjid.length === 0 && subjname.length > 0) {
        url = `/subject/find/name/${subjname}` // search 'more one' by specified only name
      } else if (subjid.length > 0 && subjname.length === 0) {
        url = `/subject/find/id/${subjid}` // search 'more one' by specified only id
      }
      axios.get(url)
        .then((result) => {
          resolve(result.data)
        })
    })
  }
  // serve done
  searchAllSubjectBySubjectId (subjid) {
    console.log(subjid)
    // console.log(subjid.length)
    return new Promise((resolve, reject) => {
      var url = `${subjid.length > 0 ? `/subject/find/id/${subjid}` : `/subject`}` // search 'one' by specified id
      axios.get(url)
        .then((result) => {
          resolve(result.data)
        })
    })
  }
  getAllCourseByThisSubject (subjname) {
    return new Promise((resolve, reject) => {
      var url = `/subject/findone/name/${subjname}`
      axios.get(url)
        .then((result) => {
          resolve(result.data)
        })
    })
  }

  addCourseToThisSubject (subjid, courseData) {
    return new Promise((resolve, reject) => {
      axios.post(`/subject/add/id/${subjid}/course`, { 'courseData': courseData }).then((result) => {
        resolve(result.data)
      })
    })
  }
}
export default SubjectService
