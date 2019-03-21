import User from './User';

class Staff extends User {
    constructor(form) {
        super(form);
        this.standing = form.standing;
    }
}

export default Staff;