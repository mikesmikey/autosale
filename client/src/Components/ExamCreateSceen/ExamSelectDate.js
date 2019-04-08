/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

class ExamDateModal extends Component {
  render () {
    return (
      <div className="exam-date-modal box with-title" style={{ width: '400px' }}>
        <div className="box-title is-violet">
          <h3 className="label is-2">เลือกวันที่สอบ</h3>
        </div>
        <div className="box-content" style={{ textAlign: 'center' }}>
          <input type="date" />
          <div className="date-button-area" style={{ marginTop: '15px' }}>
            <button className="button is-oros is-round">ยืนยัน</button>
            <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ยกเลิก</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ExamDateModal
