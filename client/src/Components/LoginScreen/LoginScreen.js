/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/loginScreen.css'

import keyIcon from '../../Resources/colored_Icons/keys.svg'
import loginImage from '../../Resources/imgs/login_image.svg'
import ClientService from '../Utilities/ClientService'

const ServiceObj = new ClientService()

class LoginScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleInput = this.handleInput.bind(this)
    this.loginSubmit = this.loginSubmit.bind(this)
  }

  loginSubmit () {
    const form = document.getElementById('loginForm')
    form.classList.add('disabled')
    const loginData = {
      username: this.state.username,
      password: this.state.password
    }
    ServiceObj.checkAuth(loginData).then((result) => {
      if (result) {
        this.props.mockLogin(result)
      } else {
        alert('ข้อมูลผู้ใช้ไม่ถูกต้อง โปรดระบุใหม่')
        form.classList.remove('disabled')
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
              <form id="loginForm" className="login-form">
                <input className="input is-full-width" type="text" placeholder="Username" name="username" onChange={this.handleInput}/>
                <input className="input is-full-width" type="text" placeholder="Password" name="password" onChange={this.handleInput}/>
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
      </div>
    )
  }
}

export default LoginScreen
