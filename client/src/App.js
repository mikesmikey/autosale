/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {
  Route, Redirect, withRouter, Switch
} from 'react-router-dom'

import './StyleSheets/App.css'
import './StyleSheets/icon.css'
import './StyleSheets/element.css'
// import '../node_modules/bulma/css/bulma.css';

import MainScreen from './Components/MainScreen/MainScreen'
import LoginScreen from './Components/LoginScreen/LoginScreen'
import RegisterScreen from './Components/RegisterScreen/RegisterScreen'
import About from './Components/About/About'

import AuthService from './Services/AuthService'

const AuthServiceObj = new AuthService()

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuth: false,
      user: {
        firstname: 'N/A'
      },
      loadStatus: true
    }

    this.setUserAppAuth = this.setUserAppAuth.bind(this)
  }

  componentDidMount () {
    this.setState({ loadStatus: true })
    AuthServiceObj.loginByToken(this.setUserAppAuth).then(() => {
      this.setState({ loadStatus: false })
    })
  }

  setUserAppAuth (status, user) {
    this.setState({
      isAuth: status,
      user: user || null
    })
  }

  render () {
    const isLoading = this.state.loadStatus ? 'none' : 'block'

    return (
      <div className="App" style={{ display: isLoading }}>
        <Switch>
          <Route exact path="/login" render={(props) =>
            !this.state.isAuth
              ? <LoginScreen
                {...props}
                setUserAppAuth={this.setUserAppAuth}
              /> : <Redirect to="/" />
          } />
          <Route exact path="/register" render={(props) =>
            !this.state.isAuth ? <RegisterScreen {...props} /> : <Redirect to="/" />
          } />
          <Route exact path="/about" render={(props) =>
            <About />
          } />
          <Route path="/" render={(props) =>
            this.state.isAuth
              ? <MainScreen
                {...props}
                user={this.state.user}
                setUserAppAuth={this.setUserAppAuth}
              />
              : this.state.loadStatus ? null : <Redirect to="/login" />
          } />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
