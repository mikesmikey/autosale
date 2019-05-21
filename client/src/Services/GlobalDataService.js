import axios from 'axios'
import GlobalData from '../Objects/GlobalData'
class GlobalDataService {
  getYearAndTerm () {
    return new Promise((resolve, reject) => {
      axios.get(`/yearAndTerm/findone`).then((result) => { // find current
        resolve(result.data)
      })
    })
  }

  getAllYearAndTerm () {
    return new Promise((resolve, reject) => {
      axios.get(`/yearAndTerm`).then((result) => { // find all
        resolve(result.data)
      })
    })
  }
  editGlobalData (newGlobalData) {
    return new Promise((resolve, reject) => {
      axios.post(`/yearAndTerm/edit`, { 'globalData': newGlobalData }).then((result) => {
        resolve(result.data)
      })
    })
  }
  createGlobalDataObject (globalData) {
    return new GlobalData(globalData)
  }
}
export default GlobalDataService
