/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ClientService from '../Utilities/ClientService'

import Exam from '../../Objects/Exam'

import '../../StyleSheets/ExamAddSimpleData.css'

const CServiceObj = new ClientService()

class ExamAddSimpleData extends Component {
  constructor (props) {
    super(props)

    this.state = {
      date: new Date(Date.now()),
      examNameInput: '',
      examMaxScoreInput: ''
    }

    this.dateHandle = this.dateHandle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  dateHandle (e) {
    const target = e.target
    const value = target.value

    if (value === '') {
      e.preventDefault()
    } else {
      this.setState({
        date: new Date(value)
      })
    }
  }

  validForm () {
    if (this.state.date === '') {
      return false
    }
    if (this.state.examNameInput === '') {
      return false
    }
    if (isNaN(Number.parseInt(this.state.examMaxScoreInput))) {
      return false
    }
    return true
  }

  handleSubmit () {
    if (!this.validForm()) {
      alert('กรุณาระบุข้อมูลให้ถูกต้อง')
      return
    }

    var newExamData = {
      subjectId: this.props.selectedCourse.subjectId,
      subjectName: this.props.selectedCourse.subjectName,
      courseId: this.props.selectedCourse.courseId,
      date: this.state.date.toLocaleDateString(),
      examName: this.state.examNameInput,
      maxScore: this.state.examMaxScoreInput
    }

    let newExam = new Exam(newExamData)
    CServiceObj.createExam(newExam.getExamObjectdata()).then((result) => {
      if (result) {
        newExam._id = newExam
        this.props.insertMemExam(newExam)
        alert('สร้างการสอบสำเร็จ')
        this.props.closeModal()
      } else {
        alert('ไม่สามารถสร้างการสอบได้ มีข้อผิดพลาดเกิดขึ้น')
      }
    })
  }

  render () {
    return (
      <div className="exam-simple-data-modal box with-title" style={{ width: '500px' }}>
        <div className="box-title is-violet">
          <h3 className="label is-2">ข้อมูลการสอบพื้นฐาน</h3>
        </div>
        <div className="box-content" style={{ textAlign: 'center' }}>
          <div className="columns">
            <div className="column is-2">
              <h3>ชื่อการสอบ</h3>
            </div>
            <div className="column">
              <input className="input is-full-width" type="text" onChange={this.handleInputChange} name="examNameInput" value={this.state.examNameInput}/>
            </div>
          </div>
          <div className="columns">
            <div className="column is-2">
              <h3>วันที่สอบ</h3>
            </div>
            <div className="column">
              <input className="input is-full-width" type="date" onChange={this.dateHandle} value={this.state.date.toISOString().split('T')[0]}/>
            </div>
          </div>
          <div className="columns">
            <div className="column is-2">
              <h3>คะแนนเต็มสอบ</h3>
            </div>
            <div className="column">
              <input className="input is-full-width" type="text" onChange={this.handleInputChange} name="examMaxScoreInput" value={this.state.examMaxScoreInput}/>
            </div>
          </div>
          <div className="date-button-area" style={{ marginTop: '15px' }}>
            <button className="button is-oros is-round" onClick={this.handleSubmit}>ยืนยัน</button>
            <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ยกเลิก</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ExamAddSimpleData
