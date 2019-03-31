import User from './User'

class Professor extends User {
  constructor (form) {
    super(form)
    this.facultyId = form.facultyId ? form.facultyId : 0
    this.branchId = form.branchId ? form.branchId : 0

    this.validMethod = this.validProfessorData
  }

  validProfessorData () {
    if (!this.validUserData()) {
      return false
    }
    if (this.facultyId === 0 || this.branchId === 0) {
      return false
    }
  }
}

export default Professor
