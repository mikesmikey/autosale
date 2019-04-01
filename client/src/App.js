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

import ClientService from './Components/Utilities/ClientService'

const CServiceObj = new ClientService()

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuth: false,
      user: {
        firstname: 'N/A'
      }
    }

    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
  }

  setUserAuth (status, user) {
    console.log(user)
    this.setState({
      isAuth: status,
      user: user
    })
  }

  login (data) {
    this.setUserAuth(true, data.userData)
  }

  logout () {
    this.setUserAuth(false, null)
  }

  render () {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" render={(props) =>
            !this.state.isAuth
              ? <LoginScreen
                {...props}
                login={this.login}
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
                logout={this.logout}
              />
              : <Redirect to="/login" />
          } />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
