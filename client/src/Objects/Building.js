class Building {
    constructor (form) {
      this.building_name = form.building_name ? form.building_name : ''
      this.short_name = form.short_name ? form.short_name : ''
      this.floors = form.floors ? form.floors : 0
      this.Rooms = form.Rooms ? form.Rooms : []

    }
  
    getUserObjectData () {
      var objData = {}
      Object.keys(this).forEach(key => {
        objData[key] = this[key]
      })
      return objData
    }
  

  }
  
  export default Building
  