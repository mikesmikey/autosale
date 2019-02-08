import React, { Component } from 'react';
import './StyleSheets/App.css';
import '../node_modules/bulma/css/bulma.css';

import MainScreen from "./Components/MainScreen";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainScreen/>
      </div>
    );
  }
}

export default App;
