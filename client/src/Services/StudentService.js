import axios from 'axios'
class StudentService {
    addManyStudents (users) {
        return new Promise((resolve, reject) => {
          axios.post(`/user/addmany`, { 'usersData': users }).then((result) => {
            resolve(result.data)
          })
        })
      }
}
export default StudentService