/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/AddRoomDetail.css'

class AddRoomDetail extends Component {
  render () {
    return (
      <div className="add-room-detail box with-title">
        <div className="box-title is-violet">
          <h3 className="label is-2">เพิ่มรายละเอียดการสอบ</h3>
          <button className="exit-button fas fa-times fa-1x" onClick={this.props.closeModal}></button>
        </div>
        <div className="box-content">
          <div className="room-select-area" style={{ paddingBottom: '20px' }}>
            <span className="input-set">
              <p className="label is-3">ตึก</p>
              <select className="select" style={{ width: '150px' }}>
                <option>jeff</option>
                <option>jeff</option>
              </select>
            </span>
            <span className="input-set">
              <p className="label is-3">ชั้น</p>
              <select className="select" style={{ width: '150px' }}>
                <option>jeff</option>
                <option>jeff</option>
              </select>
            </span>
            <span className="input-set">
              <p className="label is-3">ห้อง</p>
              <select className="select" style={{ width: '150px' }}>
                <option>jeff</option>
                <option>jeff</option>
              </select>
            </span>
            <span className="input-set">
              <p className="label is-3">จำนวน</p>
              <input className="input" type="text" style={{ width: '100px' }} />
              <p className="label is-3">คน</p>
            </span>
          </div>
          <div className="time-select-table-area">
            <RoomScheduleTable />
          </div>
          <div className="room-data-input-area">
            <div className="columns">
              <div className="column is-5">
                <p className="label is-3">จำนวนชั่วโมงมากที่สุด 999.59 ชั่วโมง</p>
                <span className="input-set">
                  <select className="select" style={{ width: '150px' }}>
                    <option>jeff</option>
                    <option>jeff</option>
                  </select>
                  <p className="label is-3">ชั่วโมง</p>
                </span>
                <span className="input-set">
                  <select className="select" style={{ width: '150px' }}>
                    <option>jeff</option>
                    <option>jeff</option>
                  </select>
                  <p className="label is-3">นาที</p>
                </span>
              </div>
              <div className="column" style={{ display: 'flex', alignItems: 'center' }}>
                <span className="input-set">
                  <p className="label is-3">จำนวนนิสิต</p>
                  <input className="input" type="text" style={{ width: '150px' }} />
                  <p className="label is-3">คน</p>
                </span>
              </div>
            </div>
            <div className="room-data-button-area" style={{ textAlign: 'center' }}>
              <button className="button is-3 is-oros is-round" style={{ width: '130px' }}>เพิ่มห้อง</button>
              <button className="button is-3 is-yentafo is-round" style={{ width: '130px' }}>ย้อนกลับ</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class RoomScheduleTable extends Component {
  renderTableItem () {
    var items = []
    for (var i = 0; i < 20; i++) {
      items[i] = <RoomScheduleTableItem key={i} />
    }
    return items
  }

  render () {
    return (
      <table className="table room-schedule-table">
        <thead>
          <tr className="is-header">
            <th>เวลา</th>
            <th>รหัสห้อง</th>
            <th>จำนวนคน</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableItem()}
        </tbody>
      </table>
    )
  }
}

class RoomScheduleTableItem extends Component {
  render () {
    return (
      <tr>
        <td>jeff</td>
        <td>jeff</td>
        <td>jeff</td>
      </tr>
    )
  }
}

export default AddRoomDetail
