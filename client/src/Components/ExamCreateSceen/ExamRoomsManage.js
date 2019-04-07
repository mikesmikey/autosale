/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/ExamRoomsModal.css'

class ExamRoomsModal extends Component {
  render () {
    return (
      <div className="exam-rooms-modal box with-title">
        <div className="box-title is-violet">
          <h3 className="label is-2">เพิ่มห้องสอบ</h3>
          <button className="exit-button fas fa-times fa-1x" onClick={this.props.closeModal}></button>
        </div>
        <div className="box-content">
          <div className="exam-rooms-table-area">
            <ExamRoomsTable />
          </div>
          <div className="exam-rooms-manage-area">
            <p className="label is-3">การจัดที่นั่ง</p>
            <span className="input-set">
              <input type="radio"/>
              <p className="label is-3">แบบสุ่ม</p>
            </span>
            <span className="input-set">
              <input type="radio"/>
              <p className="label is-3">แบบเรียง</p>
            </span>
            <span className="input-set">
              <p className="label is-3">รูปแบบ</p>
              <select className="select" style={{ width: '150px' }}>
                <option>แนวตั้ง</option>
                <option>แนวนอน</option>
              </select>
            </span>
          </div>
          <div className="exam-rooms-button-area">
            <button className="button is-3 is-orange is-round" style={{ width: '130px' }}>เพิ่มห้อง</button>
            <button className="button is-3 is-oros is-round" style={{ width: '130px' }}>บันทึก</button>
          </div>
        </div>
      </div>
    )
  }
}

class ExamRoomsTable extends Component {
  renderTableItem () {
    var items = []
    for (var i = 0; i < 50; i++) {
      items[i] = <ExamRoomsTableItem key={i}/>
    }
    return items
  }

  render () {
    return (
      <table className="table exam-rooms-table">
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

class ExamRoomsTableItem extends Component {
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

export default ExamRoomsModal
