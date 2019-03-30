class User {
  constructor (form) {
    this.username = form.username ? form.username : ''
    this.firstName = form.firstName ? form.firstName : ''
    this.lastName = form.lastName ? form.lastName : ''
    this.typeOfUser = form.typeOfUser ? form.typeOfUser : ''
    this.isExaminer = form.isExaminer ? form.isExaminer : false

    this.validMethod = this.validUserData
  }

  getUserObjectData () {
    var objData = {}
    Object.keys(this).forEach(key => {
      objData[key] = this[key]
    })
    return objData
  }

  validUserData () {
    if (this.username === '' || this.firstName === '' || this.lastName === '' || this.typeOfUser === '') {
      return false
    }
    if (typeof (this.isExaminer) !== 'boolean') {
      return false
    }
    return true
  }
}

export default User
