import React, { Component } from "react";
import {
  NavLink
} from 'react-router-dom';

import '../../StyleSheets/mainMenuBar.css';

class MainScrenMenuBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      buttonPointer: null
    }

    this.handleMenuDropDown = this.handleMenuDropDown.bind(this);
    this.handleButtonPointer = this.handleButtonPointer.bind(this);
  }

  dropDownSwitch(id) {
    var element = document.getElementById(id);

    if (element.classList.contains("dropdown-hide")) {
      element.classList.remove("dropdown-hide")
      element.classList.add("dropdown-active");
    } else {
      element.classList.remove("dropdown-active");
      element.classList.add("dropdown-hide")
    }
  }

  handleMenuDropDown(e) {
    if (e.target.id === "car_manage_button" && this.state.buttonPointer !== "sub_car_manage") {
      this.dropDownSwitch("car_manage_list");
    } else if (e.target.id === "fix_manage_button" && this.state.buttonPointer !== "sub_fix_manage") {
      this.dropDownSwitch("fix_manage_list");
    } else if (e.target.id === "part_manage_button" && this.state.buttonPointer !== "sub_part_manage") {
      this.dropDownSwitch("part_manage_list");
    }
  }

  handleButtonPointer(e) {
    this.setState({
      buttonPointer: e.target.type
    })
  }

  render() {
    return (
      <aside className="menu main-menu">
        <div className="menu-space"></div>
        <ul className="menu-list">
          <li>
            <NavLink to="/" activeClassName="is-active is-black-oros" onClick={this.handleButtonPointer}>
              <svg className="menu-icon icon-home icon-size-6" ></svg>
              หน้าแรก
            </NavLink>
          </li>
          <li>
            <NavLink to="/exam_schedule" activeClassName="is-active is-black-violet" onClick={this.handleButtonPointer}>
              <i className="menu-icon-awesome fas fa-calendar-week"></i>
              ดูห้องสอบ
            </NavLink>
          </li>
          <li>
            <NavLink to="/exam_create" activeClassName="is-active is-black-violet" onClick={this.handleButtonPointer}>
              <i className="menu-icon-awesome fas fa-calendar-plus"></i>
              เพิ่มการสอบ
            </NavLink>
          </li>
          <li>
            <NavLink to="/user_manage" activeClassName="is-active is-black-violet" onClick={this.handleButtonPointer}>
              <i className="menu-icon-awesome fas fa-users"></i>
              จัดการผู้ใช้
            </NavLink>
          </li>
          {/*
          <li>
            <NavLink to="/plate_license" activeClassName="is-active is-black-oros" onClick={this.handleButtonPointer}>
            <svg className="menu-icon icon-license-plate icon-size-6" ></svg>
              จัดการต่อทะเบียน
            </NavLink>
          </li>
          <li>
            <a id="car_manage_button"
              onClick={this.handleMenuDropDown}
            >
              <svg className="menu-icon icon-car icon-size-6" ></svg>
              จัดการซื้อ-ขายรถ
            </a>
            <ul id="car_manage_list" className="dropdown-hide">
              <li>
                <NavLink to="/car_buy" activeClassName="is-active is-black-oros" type="sub_car_manage" onClick={this.handleButtonPointer}>
                  จัดการซื้อรถ
              </NavLink>
              </li>
              <li>
                <NavLink to="/car_sell" activeClassName="is-active is-black-oros" type="sub_car_manage" onClick={this.handleButtonPointer}>
                  จัดการขายรถ
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <a id="fix_manage_button"
              onClick={this.handleMenuDropDown}
            >
              <svg className="menu-icon icon-car-motor icon-size-6" ></svg>
              จัดการซ่อมรถ
            </a>
            <ul id="fix_manage_list" className="dropdown-hide">
              <li>
                <NavLink to="/car_fix" activeClassName="is-active is-black-oros" type="sub_fix_manage" onClick={this.handleButtonPointer}>
                  จัดการซ่อม
                </NavLink>
              </li>
              <li>
                <NavLink to="/car_part" activeClassName="is-active is-black-oros" type="sub_fix_manage" onClick={this.handleButtonPointer}>
                  จัดการอะไหล่ในส่วนการซ่อม
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
          <a id="part_manage_button"
              onClick={this.handleMenuDropDown}
            >
              <svg className="menu-icon icon-car-part icon-size-6" ></svg>
              จัดการอะไหล่
            </a>
            <ul id="part_manage_list" className="dropdown-hide">
              <li>
                <NavLink to="/part_company" activeClassName="is-active is-black-oros" type="sub_part_manage" onClick={this.handleButtonPointer}>
                  จัดการบริษัทอะไหล่
                </NavLink>
              </li>
              <li>
                <NavLink to="/part_order" activeClassName="is-active is-black-oros" type="sub_part_manage" onClick={this.handleButtonPointer}>
                  จัดการใบสั่งซื้ออะไหล่
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/customer_manage" activeClassName="is-active is-black-oros" onClick={this.handleButtonPointer}>
            <svg className="menu-icon icon-customer-card icon-size-6" ></svg>
              จัดการลูกค้า
            </NavLink>
          </li>
          */}
        </ul>
      </aside>
    );
  }
}

export default MainScrenMenuBar;
