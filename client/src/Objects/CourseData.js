class CourseData {
  constructor (form) {
    this.subjectNumber = form.subjectNumber
    this.subjectName = form.subjectName
    this.students = form.students
    this.status = form.status
    this.courseId = form.courseId
    this.groups = form.groups
  }

  getCourseObjectData () {
    var objData = {}
    Object.keys(this).forEach(key => {
      objData[key] = this[key]
    })
    return objData
  }
}

export default CourseData
