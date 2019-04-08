class Course {
  constructor (form) {
    this.year = form.year || 0
    this.courseId = form.courseId || -1
    this.semester = form.semester || 0
    this.students = form.students || 0
    this.max_groups = form.max_groups || 0
  }
}

export default Course
