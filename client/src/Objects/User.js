class User {
    constructor(form) {
        this.username = form.username;
        this.password = form.password;
        this.firstName = form.firstName;
        this.lastName = form.lastName;
        this.typeOfUser = form.typeOfUser;
        this.isExaminer = form.isExaminer;
    }

    getUserObjectData() {
        return Object.keys(this).map((key) => {
            return key = this[key];
        })
    }
}

export default User;