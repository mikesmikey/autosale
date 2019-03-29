/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'

class RegisterScreen extends Component {
  render () {
    return (
      <div className="register-screen">
                มีรหัสแล้ว?
        <Link to="/login">Login</Link>
      </div>
    )
  }
}

export default RegisterScreen
