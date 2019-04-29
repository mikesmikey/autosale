import User from './User'

class Staff extends User {
  constructor (form) {
    super(form)
    this.standing = form.standing ? form.standing : ''

    this.validMethod = this.validStaffData
  }

  validStaffData () {
    if (!this.validUserData()) {
      return false
    }
    if (this.standing === '') {
      return false
    }
    return true
  }
}

export default Staff
