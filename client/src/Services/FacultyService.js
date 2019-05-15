import axios from 'axios'
import GlobalData from '../Objects/GlobalData'
class FacultyService {
    getAllFaculty () {
        return new Promise((resolve, reject) => {
          axios.get('/facultys').then((result) => {
            resolve(result.data)
          })
        })
      }
}
export default FacultyService