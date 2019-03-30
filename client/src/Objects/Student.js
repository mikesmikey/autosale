import User from './User'

class Student extends User {
  constructor (form) {
    super(form)
    this.facultyId = form.facultyId ? form.facultyId : 0
    this.branchId = form.branchId ? form.branchId : 0
    this.year = form.year ? form.year : 0
    this.isScore = form.isScore ? form.isScore : false

    this.validMethod = this.validStudentData
  }

  validStudentData () {
    if (!this.validUserData()) {
      return false
    }
    if (this.facultyId === 0 || this.branchId === 0 || this.year === 0) {
      return false
    }
    if (typeof (this.isScore) !== 'boolean') {
      return false
    }
    return true
  }
}

export default Student
