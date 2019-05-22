/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {
  NavLink
} from 'react-router-dom'

import '../../StyleSheets/mainMenuBar.css'

class MainScrenMenuBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      buttonPointer: null,
      hamburger: false
    }

    this.USER_PERMISSION = {
      'academic-staff': ['home', 'exam-schedule', 'examiner-schedule', 'exam-manage', 'user-manage', 'room-manage', 'building-manage', 'year-manage', 'subject-manage', 'course-manage'],
      'student': ['home', 'exam-schedule', 'examiner-schedule'],
      'professor': ['home', 'examiner-schedule', 'course-manage', 'add-course-manage'],
      'staff': ['home', 'examiner-schedule']
    }

    this.handleMenuDropDown = this.handleMenuDropDown.bind(this)
    this.handleButtonPointer = this.handleButtonPointer.bind(this)
    this.handleHamburger = this.handleHamburger.bind(this)
    this.renderByPermission = this.renderByPermission.bind(this)
  }

  dropDownSwitch (id) {
    var element = document.getElementById(id)

    if (element.classList.contains('dropdown-hide')) {
      element.classList.remove('dropdown-hide')
      element.classList.add('dropdown-active')
    } else {
      element.classList.remove('dropdown-active')
      element.classList.add('dropdown-hide')
    }
  }

  handleMenuDropDown (e) {
    if (e.target.id === 'car_manage_button' && this.state.buttonPointer !== 'sub_car_manage') {
      this.dropDownSwitch('car_manage_list')
    } else if (e.target.id === 'fix_manage_button' && this.state.buttonPointer !== 'sub_fix_manage') {
      this.dropDownSwitch('fix_manage_list')
    } else if (e.target.id === 'part_manage_button' && this.state.buttonPointer !== 'sub_part_manage') {
      this.dropDownSwitch('part_manage_list')
    } else if (e.target.id === 'course_manage_button' && this.state.buttonPointer !== 'sub_course_manage') {
      this.dropDownSwitch('course_manage_list')
    }
  }

  handleButtonPointer (e) {
    this.setState({
      buttonPointer: e.target.type
    })
  }

  handleHamburger () {
    this.setState({
      hamburger: !this.state.hamburger
    })
  }

  renderByPermission (menu) {
    if (this.props.user.username === 'jeff' || (this.props.user.typeOfUser === 'staff' && this.props.user.standing === 'เจ้าหน้าที่วิชาการ')) {
      if (this.USER_PERMISSION['academic-staff'].includes(menu)) {
        return ''
      } else {
        return 'dropdown-hide'
      }
    } else {
      if (this.USER_PERMISSION[this.props.user.typeOfUser].includes(menu)) {
        return ''
      } else {
        return 'dropdown-hide'
      }
    }
  }

  render () {
    return (
      <aside className={`menu main-menu ${this.state.hamburger ? 'is-active' : ''}`}>
        <div className="menu-space"></div>
        <ul className="menu-list">
          <li className={this.renderByPermission('home')}>
            <NavLink to="/" activeClassName="is-active is-black-oros" onClick={this.handleButtonPointer}>
              <svg className="menu-icon icon-home icon-size-6" ></svg>
              หน้าแรก
            </NavLink>
          </li>
          <li className={this.renderByPermission('exam-schedule')}>
            <NavLink to="/exam_schedule" activeClassName="is-active is-black-violet" onClick={this.handleButtonPointer}>
              <i className="menu-icon-awesome fas fa-calendar-week"></i>
              ดูห้องสอบ
            </NavLink>
          </li>
          <li className={this.renderByPermission('examiner-schedule')}>
            <NavLink to="/examiner" activeClassName="is-active is-black-violet" onClick={this.handleButtonPointer}>
              <i className="menu-icon-awesome fas fa-calendar-week"></i>
                ตารางคุมสอบ
            </NavLink>
          </li>
          <li className={this.renderByPermission('user-manage')}>
            <NavLink to="/user_manage" activeClassName="is-active is-black-violet" onClick={this.handleButtonPointer}>
              <i className="menu-icon-awesome fas fa-users"></i>
              จัดการผู้ใช้
            </NavLink>
          </li>
          <li className={this.renderByPermission('exam-manage')}>
            <NavLink to="/exam_create" activeClassName="is-active is-black-violet" onClick={this.handleButtonPointer}>
              <i className="menu-icon-awesome fas fa-calendar-plus"></i>
              จัดการสอบ
            </NavLink>
          </li>
          <li className={this.renderByPermission('subject-manage')}>
            <NavLink to="/add_subject" activeClassName="is-active is-black-violet" onClick={this.handleButtonPointer}>
              <i className="menu-icon-awesome fas fa-calendar-plus"></i>
              จัดการรายวิชา
            </NavLink>
          </li>
          <li className={this.renderByPermission('course-manage')}>
            <a id="course_manage_button"
              onClick={this.handleMenuDropDown}
            >
              <svg className="menu-icon icon-BookCourse icon-size-6" ></svg>
              จัดการการเรียน
            </a>
            <ul id="course_manage_list" className="dropdown-hide">
              <li>
                <NavLink to="/course_manage" activeClassName="is-active is-black-violet" className={`${this.props.user.typeOfUser === 'professor' ? 'dropdown-hide' : ''}`} type="sub_course_manage" onClick={this.handleButtonPointer}>
                  จัดการการเรียน
                </NavLink>
              </li>
              <li>
                <NavLink to="/add_course" activeClassName="is-active is-black-violet" type="sub_course_manage" onClick={this.handleButtonPointer}>
                    เพิ่มการเรียน
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={this.renderByPermission('room-manage')}>
            <NavLink to="/manage_room" activeClassName="is-active is-black-violet" onClick={this.handleButtonPointer}>
              <i className="menu-icon-awesome fas fa-users"></i>
              จัดการห้อง
            </NavLink>
          </li>
          <li className={this.renderByPermission('building-manage')}>
            <NavLink to="/add_building" activeClassName="is-active is-black-violet" onClick={this.handleButtonPointer}>
              <i className="menu-icon-awesome fa fa-building"></i>
              จัดการตึก
            </NavLink>
          </li>
          <li className={this.renderByPermission('year-manage')}>
            <NavLink to="/year_and_term_manage" activeClassName="is-active is-black-violet" onClick={this.handleButtonPointer}>
              <i className="menu-icon-awesome fa fa-calendar"></i>
              จัดการปีการศึกษา
            </NavLink>
          </li>
        </ul>
      </aside>
    )
  }
}

export default MainScrenMenuBar
