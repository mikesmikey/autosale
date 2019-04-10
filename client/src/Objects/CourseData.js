class CourseData {
  constructor (form) {
    this.school_year = form.school_year
    this.courseId = form.courseId
    this.semester = form.semester
    this.max_students = form.max_students
    this.max_groups = form.max_groups
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
