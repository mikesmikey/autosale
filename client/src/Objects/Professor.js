import User from './User'

class Professor extends User {
  constructor (form) {
    super(form)
    this.facultyId = form.facultyId
    this.branchId = form.branchId
  }
}

export default Professor
