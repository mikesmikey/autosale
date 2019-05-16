import axios from 'axios'
class StudentService {
  addManyStudents(users) {
    return new Promise((resolve, reject) => {
      axios.post(`/user/addmany`, { 'usersData': users }).then((result) => {
        resolve(result.data)
      })
    })
  }

  getAllUserByStudentType() {
    return new Promise((resolve, reject) => {
      axios.get(`/user/type/student`).then((result) => {
        resolve(result.data)
      })
    })
  }
}
export default StudentService