class User {
    constructor(form) {
        this.username = form.username;
        this.password = form.password;
        this.firstName = form.firstName;
        this.lastName = form.lastName;
        this.typeOfUser = form.typeOfUser;
        this.isExaminer = form.isExaminer;

        if (this.typeOfUser === "student" || this.typeOfUser === "professor") {
            this.facultyId = form.facultyId;
            this.branchId = form.branchId;
        }

        if (this.typeOfUser === "student") {
            this.year = form.year;
        }

        if (this.typeOfUser === "staff") {
            this.standing = form.standing;
        }
    }

    getUserObjectData() {
        var returnData = {}
        Object.keys(this).map((key) => {
            returnData[key] = this[key];
        })
        return returnData;
    }
}

module.exports = User;