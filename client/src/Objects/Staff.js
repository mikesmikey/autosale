import User from './User'

class Staff extends User {
  constructor (form) {
    super(form)
    this.standing = form.standing ? form.standing : ''

    this.validMethod = this.validStaffData
  }

  validStaffData () {
    const userValid = this.validUserData()
    if (userValid.error) {
      return userValid
    }
    if (this.standing === '') {
      return { error: 'standing-blank' }
    }
    return true
  }
}

export default Staff
