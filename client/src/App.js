import React, { Component } from 'react';
import {
  Route, Redirect, withRouter, Switch
} from 'react-router-dom';

import './StyleSheets/App.css';
import './StyleSheets/icon.css';
import './StyleSheets/element.css';
//import '../node_modules/bulma/css/bulma.css';

import MainScreen from "./Components/MainScreen/MainScreen";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import RegisterScreen from './Components/RegisterScreen/RegisterScreen';
import About from './Components/About/About';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuth: true,
      user: {
        firstname : "N/A"
      }
    }

    this.mockLogout = this.mockLogout.bind(this);
    this.mockLogin = this.mockLogin.bind(this);
  }

  setMockAuth(status, user) {
    this.setState({
      isAuth: status,
      user : user
    })
  }

  mockLogin(user) {
    this.setMockAuth(true, user);
  }

  mockLogout() {
    this.setMockAuth(false, null);
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" render={(props) =>
            !this.state.isAuth ? 
            <LoginScreen
              {...props}
              mockLogin={this.mockLogin}
            /> : <Redirect to="/" />
          } />
          <Route exact path="/register" render={(props) =>
            !this.state.isAuth ? <RegisterScreen {...props} /> : <Redirect to="/" />
          } />
          <Route exact path="/about" render={(props) =>
            <About />
          } />
          <Route path="/" render={(props) =>
            this.state.isAuth ?
              <MainScreen
                {...props}
                user={this.state.user}
                mockLogout={this.mockLogout}
              /> :
              <Redirect to="/login" />
          } />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
