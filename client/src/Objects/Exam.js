class Exam {
  constructor (form) {
    this.examId = form.examId
    this.subjectId = form.subjectId
    this.courseId = form.courseId
    this.buildingId = form.buildingId
    this.roomId = form.roomId
    this.date = form.date
    this.creatorId = form.creatorId
    this.category = form.category
    this.status = form.status
    this.scoreAnoucementDay = form.scoreAnoucementDay
    this.examSeatType = form.examSeatType
    this.orderSeat = form.orderSeat
    this.maxScore = form.maxScore
  }
}

export default Exam
