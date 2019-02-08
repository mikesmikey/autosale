import React, { Component } from "react";

class MainScrenMenuBar extends Component {
  render() {
    return (
      <aside className="menu main-menu">
        <div className="menu-space"></div>
        <ul className="menu-list">
          <li>
            <a>
              <i className="fas fa-home menu-icon"></i>
              หน้าแรก
            </a>
          </li>
          <li>
            <a>
              <i className="fas fa-money-check menu-icon"></i>
              จัดการต่อทะเบียน
            </a>
          </li>
          <li>
            <a>
              <i className="fas fa-car menu-icon"></i>
              จัดการซื้อ-ขายรถ
            </a>
            <ul>
              <li><a>จัดการซื้อรถ</a></li>
              <li><a>จัดการขายรถ</a></li>
            </ul>
          </li>
          <li>
            <a>
              <i className="fas fa-tools menu-icon"></i>
              จัดการซ่อมรถ
            </a>
            <ul>
              <li><a>จัดการซ่อม</a></li>
              <li><a>จัดการอะไหล่ในส่วนการซ่อม</a></li>
            </ul>
          </li>
          <li>
            <a>
              <i className="fas fa-boxes menu-icon"></i>
              จัดการอะไหล่
            </a>
            <ul>
              <li><a>จัดการบริษัทอะไหล่</a></li>
              <li><a>จัดการใบสั่งซื้ออะไหล่</a></li>
            </ul>
          </li>
          <li>
            <a>
              <i className="fas fa-address-card menu-icon"></i>
              จัดการลูกค้า
            </a>
          </li>
        </ul>
      </aside>
    );
  }
}

export default MainScrenMenuBar;
