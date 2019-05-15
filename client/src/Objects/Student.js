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
    const userValid = this.validUserData()
    if (userValid.error) {
      return userValid
    }
    if (this.facultyId === 0) {
      return { error: 'faculty-wrong' }
    } else if (this.branchId === 0) {
      return { error: 'branch-wrong' }
    } else if (this.year === 0) {
      return { error: 'year-wrong' }
    }
    if (typeof (this.isScore) !== 'boolean') {
      return { error: 'isscore-wrong' }
    }
    return true
  }
}

export default Student
