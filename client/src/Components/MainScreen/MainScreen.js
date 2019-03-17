import React, { Component } from "react";
import {
    Route
} from 'react-router-dom';

//mainscreen component
import MainNavBar from './MainNavBar';
import MainMenuBar from './MainMenuBar';

//all pages
import Home from '../Home/Home';
import ExamSchedule from '../ExamSchedule/ExamSchedule';
import ManageUser from '../UserManage/UserManage';

import '../../StyleSheets/mainScreen.css';
import '../../StyleSheets/pageHelper.css';
import UserManage from "../UserManage/UserManage";

class MainScreen extends Component {

    render() {
        return (
            <div className="main-screen">
                <MainNavBar
                    mockLogout={this.props.mockLogout}
                    username={this.props.user.firstName}
                />
                <MainMenuBar />
                <div className="main-subcontent">
                    <Route exact path="/" render={(props) =>
                        <Home />
                    } />
                    <Route path="/exam_schedule" render={(props) =>
                        <ExamSchedule />
                    } />
                    <Route path="/user_manage" render={(props) =>
                        <UserManage />
                    } />
                </div>
            </div>
        );
    }
}

export default MainScreen;