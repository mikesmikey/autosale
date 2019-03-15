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

    checkAuth(data) {
        return new Promise((resolve, reject) => {
            if (this.loginUsernameCheck(data.username) && this.loginPasswordCheck(data.password)) {
                const sendData = { "loginInfo" : data };
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