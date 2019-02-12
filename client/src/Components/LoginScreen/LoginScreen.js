import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class LoginScreen extends Component {
    render() {
        return (
            <div className="login-screen">
                ไม่มีรหัส?
                <Link to="/register">Register</Link>
            </div>
        );
    }
}

export default LoginScreen;