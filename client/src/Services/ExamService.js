import axios from 'axios'

class ExamService {
  getAllExamBySubjectAndCourse (subjectId, courseId) {
    return new Promise((resolve, reject) => {
      axios.get(`/exam/subject=${subjectId}/course=${courseId}`).then((result) => {
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
      axios.get(`/exam/date=${date}/room=${roomId}`).then((result) => {
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

  deleteExamRoom (objId, roomId, startTime) {
    return new Promise((resolve, reject) => {
      axios.post(`/exam/room/delete/${objId}/${roomId}/${startTime}`).then((result) => {
        console.log(result)
        resolve(result.data)
      })
    })
  }

  getExamByObjId (objId) {
    return new Promise((resolve, reject) => {
      axios.get(`/exam/objectid=${objId}`).then((result) => {
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

  updateExamData (examId, examData) {
    return new Promise((resolve) => {
      axios.post(`/exam/update`, { 'examId': examId, 'examData': examData }).then((result) => {
        resolve(result.data)
      })
    })
  }

  confirmExam (examId) {
    return new Promise((resolve, reject) => {
      axios.post(`/exam/confirm`, { 'examId': examId }).then((result) => {
        resolve(result.data)
      })
    })
  }
}
export default ExamService
