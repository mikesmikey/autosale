import React, { Component } from "react";
import {
  Link
} from 'react-router-dom';

import '../../StyleSheets/mainNavBar.css';

import logo from '../../Resources/imgs/logo.png'

class MainNavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      settingclick: false
    }

    this.handleDropDown = this.handleDropDown.bind(this);
    this.dropdownBlurHandle = this.dropdownBlurHandle.bind(this);
  }

  dropdownBlurHandle(e) {
    if (!e.target.className.includes('navbar-item')) {
      this.setState({ settingclick: false });
      document.getElementById('root').removeEventListener('click', this.dropdownBlurHandle);
    }
  }

  handleDropDown() {
    if (!this.state.settingclick) {
      this.setState({ settingclick: true })
      document.getElementById('root').addEventListener('click', this.dropdownBlurHandle);
    } else {
      this.setState({ settingclick: false })
      document.getElementById('root').removeEventListener('click', this.dropdownBlurHandle);
    }
  }

  render() {
    return (
      <div className="main-nav-bar">
        <nav className="navbar is-oros" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item banner has-text-white">
              <img className="logo" src={logo} alt="logo" />
              โชคทวี
            </Link>

            <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
            </div>

            <div className="navbar-end">
              <div
                className={this.state.settingclick ? "navbar-item is-active" : "navbar-item"}
                onClick={this.handleDropDown}
              >
                <a className="user-nav">
                  <i className="fas fa-user-circle fa-2x user-icon"></i>
                  <div className="user-nav-text-div">
                    <div className="user-text">
                      {this.props.username}
                    </div>
                  </div>
                  <i className="fas fa-caret-down drop-icon"></i>
                </a>
                <div className="navbar-dropdown is-right">
                  <Link className="navbar-item" to="/about">
                    <i className="far fa-question-circle user-option-icon"></i>
                    เกี่ยวกับ
                  </Link>
                  <a className="navbar-item" onClick={this.props.mockLogout}>
                    <i className="fas fa-sign-out-alt user-option-icon"></i>
                    ออกจากระบบ
                  </a>
                  <hr className="navbar-divider" />
                  <div className="navbar-item user-option-icon">
                    เวอร์ชั่น 0.0.1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default MainNavBar;