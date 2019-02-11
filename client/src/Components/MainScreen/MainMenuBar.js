import React, { Component } from "react";
import {
  Link
} from 'react-router-dom';

class MainScrenMenuBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <aside className="menu main-menu">
        <div className="menu-space"></div>
        <ul className="menu-list">
          <li>
            <Link to="/"> 
              <i className="fas fa-home menu-icon"></i>
              หน้าแรก
            </Link>
          </li>
          <li>
            <Link to="/plate_license">
              <i className="fas fa-money-check menu-icon"></i>
              จัดการต่อทะเบียน
            </Link>
          </li>
          <li>
            <a>
              <i className="fas fa-car menu-icon"></i>
              จัดการซื้อ-ขายรถ
            </a>
            <ul>
              <li><Link to="/car_buy">จัดการซื้อรถ</Link></li>
              <li><Link to="/car_sell">จัดการขายรถ</Link></li>
            </ul>
          </li>
          <li>
            <a>
              <i className="fas fa-tools menu-icon"></i>
              จัดการซ่อมรถ
            </a>
            <ul>
              <li><Link to="/car_fix">จัดการซ่อม</Link></li>
              <li><Link to="/car_part">จัดการอะไหล่ในส่วนการซ่อม</Link></li>
            </ul>
          </li>
          <li>
            <a>
              <i className="fas fa-boxes menu-icon"></i>
              จัดการอะไหล่
            </a>
            <ul>
              <li><Link to="/part_company">จัดการบริษัทอะไหล่</Link></li>
              <li><Link to="/part_order">จัดการใบสั่งซื้ออะไหล่</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/partner_manage">
              <i className="fas fa-user-tie menu-icon"></i>
              จัดการคู่ค้า
            </Link>
          </li>
          <li>
            <Link to="/customer_manage">
              <i className="fas fa-address-card menu-icon"></i>
              จัดการลูกค้า
            </Link>
          </li>
        </ul>
      </aside>
    );
  }
}

export default MainScrenMenuBar;
