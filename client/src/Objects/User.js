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
    if (this.username === '') {
      return { error: 'username-blank' }
    } else if (this.firstName === '') {
      return { error: 'firstname-blank' }
    } else if (this.lastName === '') {
      return { error: 'lastname-blank' }
    } else if (this.typeOfUser === '') {
      return { error: 'typeofuser-blank' }
    }

    if (typeof (this.isExaminer) !== 'boolean') {
      return { error: 'isexaminer-not-boolean' }
    }
    return true
  }
}

export default User
