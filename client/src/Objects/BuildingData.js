class BuildingData {
    constructor (form) {
      this.building_name = form.building_name
      this.short_name = form.short_name
      this.floors = form.floors
    }
  
    getBuildingObjectData () {
      var objData = {}
      Object.keys(this).forEach(key => {
        objData[key] = this[key]
      })
      return objData
    }
  }
  
  export default BuildingData
  