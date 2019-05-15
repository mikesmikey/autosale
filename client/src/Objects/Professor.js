import User from './User'

class Professor extends User {
  constructor (form) {
    super(form)
    this.facultyId = form.facultyId ? form.facultyId : 0
    this.branchId = form.branchId ? form.branchId : 0

    this.validMethod = this.validProfessorData
  }

  validProfessorData () {
    const userValid = this.validUserData()
    if (userValid.error) {
      return userValid
    }
    if (this.facultyId === 0) {
      return { error: 'faculty-wrong' }
    } else if (this.branchId === 0) {
      return { error: 'branch-wrong' }
    }
    return true
  }
}

export default Professor
