/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'

import ClientService from '../Utilities/ClientService'

import ExamTable from './ExamTable'
import DataAddModal from './DataAddModal'

import '../../StyleSheets/ExamCreateScreen.css'

const CServiceObj = new ClientService()

class ExamCreateScreen extends Component {
  _isMounted = false

  constructor (props) {
    super(props)

    this.state = {
      semesterRadioValue: 'middle',
      subjects: [],
      exams: [],
      searchInput: '',
      isLoading: false
    }

    this._isMounted = true

    this.handleRadioInput = this.handleRadioInput.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount () {
    this.loadExams()
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  componentDidUpdate (prevProps, prevStates) {
    if (prevStates.semesterRadioValue !== this.state.semesterRadioValue) {

    } 
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  handleRadioInput (e) {
    const target = e.target
    const name = target.name

    this.setState({
      semesterRadioValue: name
    })

    this.loadExams()
  }

  handleLoading() {
    
  }

  loadExams () {
    this.setState({
      isLoading: true
    })
    CServiceObj.getAllCurrentCourse().then((result) => {
      result.forEach(element => {
        element.courses.forEach((course) => {
          CServiceObj.getAllExamBySubjectAndCourse(element.subject_id, course.courseId).then((result) => {
            result.forEach((exam) => {
              if (exam.category === this.state.semesterRadioValue) {
                console.log("yes")
              }
              this.setState({
                isLoading: false
              })
            })
          })
        })
      })
    })
  }

  render () {
    return (
      <div className="subcontent-main-div exam-create-screen">
        <div className="box with-title is-round">
          <div className="box-title is-violet">
            เพิ่มการสอบ
          </div>
          <div className={`box-content ${this.state.isLoading ? 'disabled' : ''}`}>
            <div className="search-area">
              <div className="columns is-stay-top">
                <div className="column is-1">
                  <p className="label is-3" style={{ marginTop: '0' }}>รหัสวิชา</p>
                </div>
                <div className="column">
                  <input
                    className="input is-full-width"
                    type="text"
                    placeholder="ค้นหา"
                    name="searchInput"
                    onChange={this.handleInputChange}
                  />
                  <span className="input-set">
                    <input type="radio" name="middle" onChange={this.handleRadioInput} checked={this.state.semesterRadioValue === 'middle'}/>
                    <p className="label is-3">กลางภาค</p>
                  </span>
                  <span className="input-set">
                    <input type="radio" name="final" onChange={this.handleRadioInput} checked={this.state.semesterRadioValue === 'final'}/>
                    <p className="label is-3">ปลายภาค</p>
                  </span>
                </div>
                <div className="column is-not-grow">
                  <button className="button is-oros is-round" style={{ marginTop: '0' }}>ค้นหา</button>
                </div>
              </div>
            </div>
            <div className="exam-table-area">
              <ExamTable
                subjects={this.state.subjects}
              />
            </div>
            <div className="exam-button-area">
              <button className="button is-3 is-oros is-round" style={{ width: '130px' }} onClick={() => { this.dataAddModal.showModal('dateModal') }}>เพิ่มการสอบ</button>
              <button className="button is-3 is-orange is-round" style={{ width: '130px' }} onClick={() => { this.dataAddModal.showModal('examinersManageModal') }}>เพิ่มข้อมูล</button>
              <button className="button is-3 is-yentafo is-round" style={{ width: '130px' }}>ยกเลิกการสอบ</button>
            </div>
          </div>
        </div>
        <DataAddModal ref={instance => { this.dataAddModal = instance }}/>
      </div>
    )
  }
}

export default ExamCreateScreen
