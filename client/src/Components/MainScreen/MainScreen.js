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
<<<<<<< HEAD
import YearAndTermManage from '../YearAndTermManage/YearAndTermManage'

=======
import BuildAdd from '../Build/ฺBuildAdd'
>>>>>>> 087512195cb8660fd03ec9322772f4f84165ac37
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
          <Route path="/year_and_term_manage" render={(props) =>
            <YearAndTermManage />
          } />
        </div>
      </div>
    )
  }
}

export default MainScreen
