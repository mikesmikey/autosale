/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/ExamRoomsModal.css'

class ExamRoomsModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      seatOrderTypeRadio: 'shuffle',
      seatLineUpType: 'vertical'
    }

    this.seatOrderRadioHandle = this.seatOrderRadioHandle.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectType = this.handleSelectType.bind(this)
  }

  seatOrderRadioHandle (e) {
    const target = e.target
    const value = target.name

    this.setState({
      seatOrderTypeRadio: value
    })
    console.log(this.state.seatOrderTypeRadio)
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  handleSelectType (e) {
    const target = e.target
    const name = target.options[target.selectedIndex].value

    this.setState({
      seatLineUpType: name
    })
  }

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
              <input type="radio" name="shuffle" onChange={this.seatOrderRadioHandle} checked={this.state.seatOrderTypeRadio === 'shuffle'}/>
              <p className="label is-3">แบบสุ่ม</p>
            </span>
            <span className="input-set">
              <input type="radio" name="normal" onChange={this.seatOrderRadioHandle} checked={this.state.seatOrderTypeRadio === 'normal'}/>
              <p className="label is-3">แบบเรียง</p>
            </span>
            <span className="input-set">
              <p className="label is-3">รูปแบบ</p>
              <select className="select" style={{ width: '150px' }} onChange={this.handleSelectType} value={this.state.seatLineUpType}>
                <option value="vertical">แนวตั้ง</option>
                <option value="horizontal">แนวนอน</option>
              </select>
            </span>
          </div>
          <div className="exam-rooms-button-area">
            <button className="button is-3 is-orange is-round" style={{ width: '130px' }} onClick={() => { this.props.showModal('addRoomDetailModal') }}>เพิ่มห้อง</button>
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
