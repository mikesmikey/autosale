/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ClientService from '../Utilities/ClientService'

const CServiceObj = new ClientService()

class ExamDateModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      date: new Date(Date.now())
    }

    this.dateHandle = this.dateHandle.bind(this)
    this.handleSubmitDate = this.handleSubmitDate.bind(this)
  }

  dateHandle (e) {
    const target = e.target
    const value = target.value

    this.setState({
      date: new Date(value)
    })
  }

  handleSubmitDate () {
    if (this.props.selectedExam.status === 'noExamData') {
      if (this.props.selectedExam) {
        var newExam = this.props.selectedExam
        newExam.setExamData('date', this.state.date.toLocaleDateString())
        CServiceObj.createExam(newExam.getExamObjectdata()).then((result) => {
          if (result) {
            newExam.setExamData('_id', result)
            this.props.setSelectedExam(newExam)
            alert('สร้างการสอบสำเร็จ')
            this.props.closeModal()
          } else {
            alert('ไม่สามารถสร้างการสอบได้ มีข้อผิดพลาดเกี่ยวกับการเชื่อมต่อเกิดขึ้น')
          }
        })
      } else {
        alert('คุณไม่ได้เลือกวิชาที่จะจัดสอบ')
      }
    } else { alert('วิชานี้มีการสร้างการสอบแล้ว') }
  }

  render () {
    return (
      <div className="exam-date-modal box with-title" style={{ width: '400px' }}>
        <div className="box-title is-violet">
          <h3 className="label is-2">เลือกวันที่สอบ</h3>
        </div>
        <div className="box-content" style={{ textAlign: 'center' }}>
          <input type="date" onChange={this.dateHandle} value={this.state.date.toISOString().split('T')[0]}/>
          <div className="date-button-area" style={{ marginTop: '15px' }}>
            <button className="button is-oros is-round" onClick={this.handleSubmitDate}>ยืนยัน</button>
            <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ยกเลิก</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ExamDateModal
