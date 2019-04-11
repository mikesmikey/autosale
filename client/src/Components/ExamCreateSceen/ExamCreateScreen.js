/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'

import ClientService from '../Utilities/ClientService'

import CourseTable from './CourseTable'
import DataAddModal from './DataAddModal'

import '../../StyleSheets/ExamCreateScreen.css'

const CServiceObj = new ClientService()

class ExamCreateScreen extends Component {
  _isMounted = false

  constructor (props) {
    super(props)

    this.state = {
      subjects: [],
      exams: [],
      searchInput: '',
      selectedCourse: null,
      isLoading: false
    }

    this._isMounted = true

    this.handleInputChange = this.handleInputChange.bind(this)
    this.searchButtonHandle = this.searchButtonHandle.bind(this)
    this.setSelectedCourse = this.setSelectedCourse.bind(this)
    this.handleToggleExamManage = this.handleToggleExamManage.bind(this)
  }

  componentDidMount () {
    this.loadAllSubjectWithCurrentCourse()
  }

  componentDidUpdate () {
    // console.log('update')
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  setSelectedCourse (course) {
    this.setState({
      selectedCourse: course
    })
  }

  sortExamBySubjectId (exam1, exam2) {
    return exam1.subjectId - exam2.subjectId
  }

  loadAllSubjectWithCurrentCourse (subjectId) {
    this.setState({
      isLoading: true,
      subjects: []
    })
    CServiceObj.searchAllCurrentCourseBySubjectId(subjectId || '').then((result) => {
      this.setState({
        subjects: result,
        isLoading: false
      })
    })
  }

  searchButtonHandle () {
    this.loadAllSubjectWithCurrentCourse(this.state.searchInput)
  }

  handleToggleExamManage () {
    if (this.state.selectedCourse) {
      this.dataAddModal.showModal('examManageModal')
    }
  }

  render () {
    return (
      <div className="subcontent-main-div exam-create-screen">
        <div className="box with-title is-round">
          <div className="box-title is-violet">
            จัดการสอบ
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
                </div>
                <div className="column is-not-grow">
                  <button className="button is-oros is-round" style={{ marginTop: '0' }} onClick={this.searchButtonHandle}>ค้นหา</button>
                </div>
              </div>
            </div>
            <div className="course-table-area">
              <CourseTable
                subjects={this.state.subjects}
                setSelectedCourse={this.setSelectedCourse}
                handleToggleExamManage={this.handleToggleExamManage}
              />
            </div>
          </div>
        </div>
        <DataAddModal
          ref={instance => { this.dataAddModal = instance }}
          selectedCourse={this.state.selectedCourse}
          setSelectedCourse={this.setSelectedCourse}
        />
      </div>
    )
  }
}

export default ExamCreateScreen
