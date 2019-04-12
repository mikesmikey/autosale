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
}

export default Exam
