/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ErrorModal from '../Utilities/ErrorModal'
import InfoModal from '../Utilities/InfoModal'

import '../../StyleSheets/loginScreen.css'

import keyIcon from '../../Resources/colored_Icons/keys.svg'
import loginImage from '../../Resources/imgs/login_image.svg'
import AuthService from '../../Services/AuthService'

const AuthServiceObj = new AuthService()

const ERROR_TEXT_TABLE = {
  'username-blank': 'กรุณากรอก Username!',
  'password-blank': 'กรุณากรอก Password!',
  'wrong-username': 'ไม่พบ user นี้!',
  'wrong-password': 'Password ไม่ถูกต้อง!'
}

class LoginScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      isLoading: false
    }

    this.handleInput = this.handleInput.bind(this)
    this.loginSubmit = this.loginSubmit.bind(this)
  }

  loginSubmit () {
    this.setState({
      isLoading: true
    })
    const loginData = {
      username: this.state.username,
      password: this.state.password
    }
    AuthServiceObj.checkAuth(loginData).then((result) => {
      if (result.error) {
        this.errorModal.showModal(ERROR_TEXT_TABLE[result.error])
        this.setState({
          isLoading: false
        })
      } else {
        AuthServiceObj.login(() => { this.props.setUserAppAuth(true, result.userData) }, result)
      }
    })
  }

  handleInput (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <div className="login-screen">
        <div className="login-columns columns">
          <div className="column is-violet">
            <img src={loginImage} style={{ height: '75%' }} alt="login-decorate-img"></img>
          </div>
          <div className="column">
            <div className="login-box box">
              <img className="login-box-image" src={keyIcon} alt="key-img" />
              <span className="label is-1" style={{ marginBottom: '2rem' }}>เข้าสู่ระบบ</span>
              <form className={`login-form ${this.state.isLoading ? 'disabled' : ''}`}>
                <input className="input is-full-width" type="text" placeholder="Username" name="username" onChange={this.handleInput}/>
                <input className="input is-full-width" type="password" placeholder="Password" name="password" onChange={this.handleInput}/>
                <button
                  className="button is-orange is-round"
                  style={{ width: '10rem' }}
                  type="button"
                  onClick={this.loginSubmit}
                >
                                Login
                </button>
              </form>
            </div>
          </div>
        </div>
        <ErrorModal
          ref={instance => { this.errorModal = instance }}
        />
        <InfoModal
          ref={instance => { this.infoModal = instance }}
        />
      </div>
    )
  }
}

export default LoginScreen
