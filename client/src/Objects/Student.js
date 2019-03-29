import User from './User'

class Student extends User {
  constructor (form) {
    super(form)
    this.facultyId = form.facultyId
    this.branchId = form.branchId
    this.year = form.year
    this.isScore = form.isScore
  }
}

export default Student
