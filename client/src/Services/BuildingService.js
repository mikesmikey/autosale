import axios from 'axios'
import BuildingData from '../Objects/BuildingData'
import Building from '../Objects/Building'

class BuidingService {
  getAllBuildingByRoom (buildingname, room) {
    return new Promise((resolve) => {
      var url = `/building/${room.length === 0 ? `/${buildingname}` : `/name=${buildingname}/room=${room}`}`
      axios.get(url).then((result) => {
        resolve(result.data)
      })
    })
  }

  getAllBuilding () {
    return new Promise((resolve) => {
      axios.get(`/building`).then((result) => {
        resolve(result.data)
      })
    })
  }

  createBuildingDataObject (buildingData) {
    return new BuildingData(buildingData)
  }

  addBuilding (buildingData) {
    return new Promise((resolve, reject) => {
      axios.post(`/building/add`, { 'buildingData': buildingData }).then((result) => {
        resolve(result.data)
      })
    })
  }

  deleteBuilding (shortname) {
    return new Promise((resolve, reject) => {
      axios.post(`/building/remove/${shortname}`).then((result) => {
        resolve(result.data)
      })
    })
  }

  createBuilding (BuildingData) {
    return new Building(BuildingData)
  }
}
export default BuidingService
