import React, { Component } from "react";

import MainNavBar from './MainNavBar';
import MainMenuBar from './MainMenuBar'

class MainScreen extends Component {
    render() {      
        return (
            <div className="MainScreen">
                <MainNavBar/>
                <div className="columns">
                    <div className="column is-2">
                        <MainMenuBar/>
                    </div>
                    <div className="column is-10">
                    </div>
                </div>
            </div>
        );
    }
}

export default MainScreen;