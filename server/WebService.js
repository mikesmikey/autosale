const WebDAO = require('./WebDAO');

class WebService {

    loginAuth(loginInfo) {
        return new Promise((resolve, reject) => {
            var DAO = new WebDAO;
            DAO.getUserByUsername(loginInfo.username).then((result) => {
                if (result) {
                    if (loginInfo.password == result.password) {
                        return resolve(result);
                    }
                    return resolve(false);
                } else {
                    return resolve(false);
                }
            })
        })
    }

    autoGenerateSampleUserData() {
        return new Promise((resolve, reject) => {
            var DAO = new WebDAO;

            const nameTable = ["สมหมาย", "สมหมาน", "สมปอง", "สมศรี", "สมยศ", "สมใจ", "สมสู่", "สมเศร็จ", "สมบูรณ์", "สมศิริ"];
            const surnametable = ["จันอังคาร", "จริงใจ", "ใจดี", "มูฮัมหมัด", "ใจร้าย", "บารัค", "สมิธ", "จอร์น", "สมานฉันท์", "ชินวัตร"];
            const typeTable = ["student", "professor", "staff"];

            for (var i = 0; i < 100; i++) {
                var userData = {};
                userData.username = "59100" + i
                userData.password = Number.parseInt(Math.random() * 100000000);
                userData.firstName = nameTable[Number.parseInt(Math.random() * 10)];
                userData.lastName = surnametable[Number.parseInt(Math.random() * 10)];
                userData.typeOfUser = typeTable[Number.parseInt(Math.random() * 3)]
                userData.isExaminer = Number.parseInt(Math.random() * 2) === 0 ? true : false;

                if (userData.typeOfUser === "student" || userData.typeOfUser === "professor") {
                    userData.facultyId = 0;
                    userData.branchId = Number.parseInt(Math.random() * 2);
                }

                if (userData.typeOfUser === "student") {
                    userData.year = 3;
                }

                if (userData.typeOfUser === "staff") {
                    userData.standing = "แม่บ้าน";
                }

                DAO.insertUser(userData).then((result) => { if (!result) return resolve(false) });
            }

            return resolve(true);
        })
    }
}

module.exports = WebService;