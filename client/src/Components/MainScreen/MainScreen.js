/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {
  Route
} from 'react-router-dom'

// mainscreen component
import MainNavBar from './MainNavBar'
import MainMenuBar from './MainMenuBar'

// all pages
import Home from '../Home/Home'
import ExamSchedule from '../ExamSchedule/ExamSchedule'
import ExamCreateScreen from '../ExamCreateSceen/ExamCreateScreen'
import ExamScoreSceen from '../ExamScoreSceen/ExamScoreSceen'
import ManageRoom from '../ManageRoom/ManageRoom'
import UserManage from '../UserManage/UserManage'
import YearAndTermManage from '../YearAndTermManage/YearAndTermManage'
<<<<<<< HEAD
import BuildAdd from '../Build/ฺBuildAdd'
=======
import AddBuilding from '../AddBuilding/AddBuilding'
import AddSubject from '../AddSubject/AddSubject'
>>>>>>> 7a02e42f773f09aeee94b03ea7773aa69f8a57bc

import '../../StyleSheets/mainScreen.css'
import '../../StyleSheets/pageHelper.css'

class MainScreen extends Component {
  render () {
    return (
      <div className="main-screen">
        <MainNavBar
          mockLogout={this.props.mockLogout}
          username={this.props.user.firstName}
          handleHamburger={() => { this.mainMenuBar.handleHamburger() }}
        />
        <MainMenuBar ref={instance => { this.mainMenuBar = instance }} />
        <div className="main-subcontent">
          <Route exact path="/" render={(props) =>
            <Home />
          } />
          <Route path="/exam_schedule" render={(props) =>
            <ExamSchedule />
          } />
          <Route path="/exam_create" render={(props) =>
            <ExamCreateScreen />
          } />
          <Route path="/user_manage" render={(props) =>
            <UserManage />
          } />
          <Route path="/exam_score" render={(prop) =>
          <ExamScoreSceen/>
          }/>
          <Route path="/build_add" render={(props) =>
            <BuildAdd />
          } />
          <Route path="/manage_room" render={(props) =>
            <ManageRoom />
          } />
          <Route path="/year_and_term_manage" render={(props) =>
            <YearAndTermManage />
          } />
          <Route path="/add_building" render={(props) =>
            <AddBuilding />
          } />
          <Route path="/add_subject" render={(props) =>
            <AddSubject />
          } />
        </div>
      </div>
    )
  }
}

export default MainScreen
