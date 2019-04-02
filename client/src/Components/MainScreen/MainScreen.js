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
import UserManage from '../UserManage/UserManage'
import BuildAdd from '../Build/ฺBuildAdd'
import '../../StyleSheets/mainScreen.css'
import '../../StyleSheets/pageHelper.css'

class MainScreen extends Component {
  render () {
    return (
      <div className="main-screen">
        <MainNavBar
          setUserAppAuth={this.props.setUserAppAuth}
          username={this.props.user.firstName}
          handleHamburger={() => { this.mainMenuBar.handleHamburger() }}
        />
        <MainMenuBar ref={ instance => { this.mainMenuBar = instance }}/>
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
        </div>
      </div>
    )
  }
}

export default MainScreen
