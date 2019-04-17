import ClientService from '../Components/Utilities/ClientService'
const CServiceObj = new ClientService()

class Exam {
  constructor (form) {
    this._id = form._id
    this.subjectId = form.subjectId
    this.subjectName = form.subjectName
    this.examName = form.examName
    this.courseId = form.courseId
    this.creatorId = form.creatorId
    this.date = form.date
    this.startTime = form.startTime
    this.rooms = form.rooms
    this.examiners = form.examiners
    this.examSeatType = form.examSeatType
    this.orderSeat = form.orderSeat
    this.maxScore = form.maxScore
    this.scoreAnoucementDay = form.scoreAnoucementDay
    this.examConfirm = form.examConfirm || false
  }

  setExamData (key, value) {
    this[key] = value
  }

  getExamObjectdata () {
    var objData = {}
    Object.keys(this).forEach(key => {
      objData[key] = this[key]
    })
    return objData
  }

  validExamSimpleData () {
    if (new Date(this.date).toDateString() === 'Invalid Date') {
      return false
    }
    if (this.examName === '' || this.examName.length === 0) {
      return false
    }
    if (this.maxScore <= 0 || this.maxScore % 1 !== 0) {
      return false
    }
    return true
  }

  validRooms () {
    if (typeof (this.rooms) === 'undefined') {
      return false
    }
    if (this.rooms.length === 0) {
      return false
    }

    this.rooms.forEach(room => {
      CServiceObj.getRoomByRoomId(room.roomId).then((result) => {
        if (result[0]) {
          var found = false
          result[0].rooms.forEach(dbRoom => {
            if (dbRoom.room === room.roomId) {
              found = true
            }
          })
          if (!found) {
            return false
          }
        } else {
          return false
        }
        return true
      })
    })
  }
}

export default Exam
