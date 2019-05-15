import axios from 'axios'

class FacultyService {
    getAllFaculty () {
        return new Promise((resolve, reject) => {
          axios.get('/faculty').then((result) => {
            resolve(result.data)
          })
        })
      }
}
export default FacultyService