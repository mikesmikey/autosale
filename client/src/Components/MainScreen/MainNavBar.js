/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'

// import '../../StyleSheets/mainNavBar.css';
import '../../StyleSheets/mainNavBar.css'
import AuthService from '../../Services/AuthService'
import GlobalDataService from '../../Services/GlobalDataService'

const AuthServiceObj = new AuthService()
const GlobalDataServiceObj = new GlobalDataService()

class MainNavBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      settingclick: false,
      currentYear: null,
      currentSemester: null
    }

    this.handleDropDown = this.handleDropDown.bind(this)
    this.dropdownBlurHandle = this.dropdownBlurHandle.bind(this)
  }

  componentDidMount () {
    GlobalDataServiceObj.getYearAndTerm().then(result => {
      this.setState({
        currentSemester: result.currentStudyTerm,
        currentYear: result.currentStudyYear
      })
    })
  }

  dropdownBlurHandle (e) {
    if (!e.target.className.includes('dropdown-items')) {
      this.setState({ settingclick: false })
      document.getElementById('root').removeEventListener('click', this.dropdownBlurHandle)
    }
  }

  handleDropDown () {
    if (!this.state.settingclick) {
      this.setState({ settingclick: true })
      document.getElementById('root').addEventListener('click', this.dropdownBlurHandle)
    } else {
      this.setState({ settingclick: false })
      document.getElementById('root').removeEventListener('click', this.dropdownBlurHandle)
    }
  }

  componentWillUnmount () {
    this.setState({ settingclick: false })
    document.getElementById('root').removeEventListener('click', this.dropdownBlurHandle)
  }

  render () {
    return (
      <div className="main-nav-bar">
        <nav className="navbar is-violet" aria-label="main navigation">
          <Link to="/" className="navbar-item banner">
            <div>
              <span className="navbar-banner-text">Wua-Chon University</span>
            </div>
          </Link>
          <div className="navbar-item" style={{ cursor: 'default' }}>
            ปีการศึกษา : {this.state.currentYear} เทอม : {this.state.currentSemester}
          </div>
          <button className="navbar-item user" onClick={this.handleDropDown}>
            <div className="user-container">
              <svg className="navbar-user-icon icon-user icon-size-5" ></svg>
              <span className="navbar-user-text">{this.props.username}</span>
              <svg className="navbar-user-icon icon-down-arrow icon-size-6" ></svg>
            </div>
            <div className={this.state.settingclick ? 'dropdown-items is-active' : 'dropdown-items user'}>
              <Link to='/about'>เกี่ยวกับ</Link>
              <a onClick={() => { AuthServiceObj.logout(() => { this.props.setUserAppAuth(false) }) }}>ออกจากระบบ</a>
              <a className="is-detail">เวอร์ชั่น 0.0.2</a>
            </div>
          </button>
          <button className="navbar-item hamburger" onClick={this.props.handleHamburger}>
            <i className="fas fa-bars"></i>
          </button>
        </nav>
      </div>
    )
  }
}

export default MainNavBar
