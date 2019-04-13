class RegisteredCourse {
  constructor (form) {
    this.group = form.group || 0
    this.subjectId = form.subjectId || 0
    this.courseId = form.courseId || 0
  }
}

export default RegisteredCourse
