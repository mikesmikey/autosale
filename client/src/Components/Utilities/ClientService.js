import axios from 'axios';

class ClientService {

    loginUsernameCheck(username) {
        if (username === "") {
            return false;
        }
        return true;
    }

    loginPasswordCheck(password) {
        if (password === "") {
            return false;
        }
        return true;
    }

    getAllUserBySelectType(type) {
        return new Promise((resolve, reject) => {
            axios.get(`/users/type/${type}`).then((result) => {
                resolve(result.data);
            })
        })
    }

    getAllFaculty() {
        return new Promise((resolve, reject) => {
            axios.get(`/facultys`).then((result) => {
                resolve(result.data);
            })
        })
    }

    searchAllUserByTypeAndUsername(type, userId) {
        return new Promise((resolve, reject) => {
            var url = `/users/${userId.length === 0 ? `type/${type}` : `/${type}/${userId}`}`;
            axios.get(url).then((result) => {
                resolve(result.data);
            })
        })
    }

    deleteUser(deleteUserId) {
        return new Promise((resolve, reject) => {
            axios.post(`/user/remove/${deleteUserId}`).then((result) => {
                resolve(result.data);
            })
        })
    }

    addUser(userData) {
        return new Promise((resolve, reject) => {
            axios.post(`/user/add`, {"userData" : userData}).then((result) => {
                resolve(result.data);
            })
        })
    }

    addManyStudents(userData) {
        return new Promise((resolve, reject) => {
            axios.post(`/user/addmany`, {"userData" : userData}).then((result) => {
                resolve(result.data);
            })
        })
    }

    editUser(newUserData) {
        return new Promise((resolve, reject) => {
            axios.post(`/user/edit`, {"userData" : newUserData}).then((result) => {
                resolve(result.data);
            })
        })
    }

    checkAuth(data) {
        return new Promise((resolve, reject) => {
            if (this.loginUsernameCheck(data.username) && this.loginPasswordCheck(data.password)) {
                const sendData = { "loginInfo": data };
                axios.post('/login', sendData).then((result) => {
                    resolve(result.data);
                })
            } else {
                resolve(false);
            }
        })
    }
}

export default ClientService;