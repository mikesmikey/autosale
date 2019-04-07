/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/ExaminersManage.css'

class ExaminersManage extends Component {
  render () {
    return (
      <div className="examiners-manage box with-title">
        <div className="box-title is-violet">
          <h3 className="label is-2">เพิ่มผู้คุมสอบ</h3>
          <button className="exit-button fas fa-times fa-1x" onClick={this.props.closeModal}></button>
        </div>
        <div className="box-content">
          <div className="columns is-stay-top" style={{ width: '100%' }}>
            <div className="main-column column">
              <p className="label is-2">ค้นหาผู้คุมสอบ</p>
              <div className="search-area">
                <div className="columns">
                  <div className="column is-2">
                    <p className="label is-3">ประเภท</p>
                  </div>
                  <div className="column">
                    <select className="select">
                      <option>jeff</option>
                      <option>jeff</option>
                    </select>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-2">
                    <p className="label is-3">ชื่อ</p>
                  </div>
                  <div className="column">
                    <input className="input is-full-width" type="text"/>
                  </div>
                </div>
                <button className="button is-oros is-round is-3" style={{ marginLeft: 'auto' }}>ค้นหา</button>
              </div>
              <div className="examiner-table-area">
                <ExaminerTable />
              </div>
              <div className="columns">
                <div className="column is-2">
                ห้อง
                </div>
                <div className="column">
                  <select className="select">
                    <option>jeff</option>
                    <option>jeff</option>
                  </select>
                </div>
                <div className="column is-2">
                  <button className="button is-oros is-round">เพิ่ม</button>
                </div>
              </div>
            </div>
            <div className="main-column column">
              <p className="label is-2">ผู้คุมสอบที่เลือก</p>
              <div className="selected-examiner-table-area">
                <SelectedExaminerTable />
              </div>
              <div className="button-area">
                <button className="button is-yentafo is-round">ลบ</button>
                <button className="button is-oros is-round">บันทึก</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ExaminerTable extends Component {
  renderTableItem () {
    var items = []
    for (var i = 0; i < 50; i++) {
      items[i] = <ExaminerTableItem key={i} />
    }
    return items
  }

  render () {
    return (
      <table className="table examiner-table">
        <thead>
          <tr className="is-header">
            <th>ชื่อ</th>
            <th>ประเภท</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableItem()}
        </tbody>
      </table>
    )
  }
}

class ExaminerTableItem extends Component {
  render () {
    return (
      <tr>
        <td>jeff</td>
        <td>jeff</td>
      </tr>
    )
  }
}

class SelectedExaminerTable extends Component {
  renderTableItem () {
    var items = []
    for (var i = 0; i < 50; i++) {
      items[i] = <SelectedExaminerTableItem key={i} />
    }
    return items
  }

  render () {
    return (
      <table className="table examiner-table">
        <thead>
          <tr className="is-header">
            <th>ชื่อ</th>
            <th>ประเภท</th>
            <th>ห้อง</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableItem()}
        </tbody>
      </table>
    )
  }
}

class SelectedExaminerTableItem extends Component {
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

export default ExaminersManage
