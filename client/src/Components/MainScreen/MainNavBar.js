import React, { Component } from "react";
import {
  Link, Redirect
} from 'react-router-dom';

import '../../StyleSheets/mainNavBar.css';

import logo from '../../Resources/imgs/logo.png'

class MainNavBar extends Component {
  render() {
    return (
      <div className="main-nav-bar">
        <nav className="navbar is-oros" role="navigation" aria-label="main navigation">
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
              <div className="navbar-item  is-active">
                <a className="user-nav">
                  <i className="fas fa-user-circle fa-2x user-icon"></i>
                  <div className="user-nav-text-div">
                    <div className="user-text">
                      inwza008
                    </div>
                  </div>
                  <i className="fas fa-caret-down drop-icon"></i>
                </a>
                <div className="navbar-dropdown is-right">
                  <Link className="navbar-item" to="/about">
                    <i className="far fa-question-circle user-option-icon"></i>
                    เกี่ยวกับ
                  </Link>
                  <a className="navbar-item">
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