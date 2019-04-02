class GlobalData {
    constructor (form) {
      this.id = form.id
      this.currentStudyYear = form.currentStudyYear
      this.currentStudyTerm = form.currentStudyTerm
    }
  
    getGlobalObjectData () {
      var objData = {}
      Object.keys(this).forEach(key => {
        objData[key] = this[key]
      })
      return objData
    }
  }
  
  export default GlobalData
  