import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

import '../../StyleSheets/loginScreen.css';

import keyIcon from '../../Resources/colored_Icons/keys.svg';
import loginImage from '../../Resources/imgs/login_image.svg';

class LoginScreen extends Component {
    render() {
        return (
            <div className="login-screen">
                <div className="login-columns columns">
                    <div className="column is-violet">
                        <img src={loginImage} style={{height : "75%"}}></img>
                    </div>
                    <div className="column">
                        <div className="login-box box">
                            <img className="login-box-image" src={keyIcon} />
                            <form className="login-form">
                                <input className="input is-full-width" type="text" placeholder="Username"></input>
                                <input className="input is-full-width" type="text" placeholder="Password"></input>
                                <input className="button is-orange is-round" style={{width: "10rem"}} type="submit" value="Login"></input>
                            </form>
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
}

export default LoginScreen;