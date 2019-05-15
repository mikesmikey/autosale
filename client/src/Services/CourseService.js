import axios from 'axios'
import CGlobalDataService from './GlobalDataService'
const GlobalDataService = new CGlobalDataService()
class CourseService {
    getAllCurrentCourse () {
        return new Promise((resolve, reject) => {
          GlobalDataService.getYearAndTerm().then((timeData) => {
            if (!timeData) return null
            axios.get(`/courses/${timeData.currentStudyYear}/${timeData.currentStudyTerm}`).then((result) => {
              resolve(result.data)
            })
          })
        })
      }
    
      searchAllCurrentCourseBySubjectId (subjectId, startPos, limit) {
        return new Promise((resolve, reject) => {
          GlobalDataService.getYearAndTerm().then((timeData) => {
            if (!timeData) return null
            axios.get(`/courses/year=${timeData.currentStudyYear}/semester=${timeData.currentStudyTerm}/subject=${subjectId || 'none'}/start=${startPos || 0}/limit=${limit || 0}`).then((result) => {
              resolve(result.data)
            })
          })
        })
      }
    
      getCourseByIdAndSubjectId (courseId, subjectId) {
        return new Promise((resolve, reject) => {
          axios.get(`/course/subject=${subjectId}/course=${courseId}`).then((result) => {
            resolve(result.data)
          })
        })
      }
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
    
      updateExamSeatType (objId, seatLineUpType, seatOrderType) {
        return new Promise((resolve) => {
          axios.post(`/exam/seatType/update/${objId}/${seatLineUpType}/${seatOrderType}`).then((result) => {
            resolve(result.data)
          })
        })
      }
}
export default CourseService