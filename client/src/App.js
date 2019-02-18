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
      username : "inwza007"
    }

    this.mockLogout = this.mockLogout.bind(this);
  }

  setMockAuth(status) {
    this.setState({
      isAuth : status
    })
  }

  mockLogout() {
    this.setMockAuth(false);
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" render={(props) =>
            !this.state.isAuth ? <LoginScreen {...props} /> : <Redirect to="/" />
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
              username={this.state.username} 
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
