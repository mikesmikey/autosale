class Exam {
  constructor (form) {
    this.examId = form.examId
    this.subjectId = form.subjectId
    this.subjectName = form.subjectName
    this.category = form.category
    this.courseId = form.courseId
    this.creatorId = form.creatorId
    this.date = form.date
    this.rooms = form.rooms
    this.roomConfirm = form.roomConfirm
    this.examiners = form.examiners
    this.examinerConfirm = form.examinerConfirm
    this.examSeatType = form.examSeatType
    this.orderSeat = form.orderSeat
    this.maxScore = form.maxScore
    this.scoreAnoucementDay = form.scoreAnoucementDay

    this.status = this.decideExamStatus()
  }

  decideExamStatus () {
    if (!this.examId) {
      return 'noExamData'
    } else if (!this.roomConfirm) {
      return 'noRoomData'
    } else if (!this.examinerConfirm) {
      return 'noExaminerData'
    } else {
      return 'complete'
    }
  }
}

export default Exam
