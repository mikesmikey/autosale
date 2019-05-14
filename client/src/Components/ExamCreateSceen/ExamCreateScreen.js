/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'

import CCourseService from '../../Services/CourseService'

import CourseTable from './CourseTable'
import DataAddModal from './DataAddModal'

import '../../StyleSheets/ExamCreateScreen.css'

const CourseService = new CCourseService()

class ExamCreateScreen extends Component {
  _isMounted = false

  constructor (props) {
    super(props)

    this.state = {
      subjects: [],
      exams: [],
      searchInput: '',
      selectedCourse: null,
      isLoading: false,
      page: 1,
      maxPage: 1
    }

    this._isMounted = true

    this.handleInputChange = this.handleInputChange.bind(this)
    this.searchButtonHandle = this.searchButtonHandle.bind(this)
    this.setSelectedCourse = this.setSelectedCourse.bind(this)
    this.handleToggleExamManage = this.handleToggleExamManage.bind(this)
  }

  componentDidMount () {
    this.loadAllSubjectWithCurrentCourse(this.state.searchInput, this.state.page === 1 ? 0 : (this.state.page - 1) * 50, 50)
  }

  componentDidUpdate (prevProps, prevStates) {
    if (this.state.page !== prevStates.page) {
      this.loadAllSubjectWithCurrentCourse(this.state.searchInput, this.state.page === 1 ? 0 : (this.state.page - 1) * 50, 50)
    }
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

  loadAllSubjectWithCurrentCourse (subjectId, startPos, limit) {
    this.setState({
      isLoading: true,
      subjects: []
    })
    this.calculateMaxPage(this.state.searchInput, 0, 0)
    CourseService.searchAllCurrentCourseBySubjectId(subjectId || '', startPos, limit).then((result) => {
      this.setState({
        subjects: result,
        isLoading: false
      })
    })
  }

  searchButtonHandle () {
    this.loadAllSubjectWithCurrentCourse(this.state.searchInput, this.state.page === 1 ? 0 : (this.state.page - 1) * 50, 50)
  }

  calculateMaxPage (subjectId, startPos, limit) {
    this.setState({
    })
    CourseService.searchAllCurrentCourseBySubjectId(subjectId || '', startPos, limit).then((result) => {
      let max = Math.ceil(result.length / 50)
      if (this._isMounted) {
        this.setState({
          maxPage: max === 0 ? 1 : max
        })
      }
    })
  }

  handleToggleExamManage () {
    if (this.state.selectedCourse) {
      this.dataAddModal.showModal('examManageModal')
    }
  }

  handleInceasePageStyle () {
    if (this.state.page === this.state.maxPage) {
      return 'disabled'
    }
  }

  handleDeceasePageStyle () {
    if (this.state.page === 1) {
      return 'disabled'
    }
  }

  inceasePage () {
    const newPage = this.state.page === this.state.maxPage || this.state.page + 1
    this.setState({
      page: newPage
    })
  }

  deceasePage () {
    const newPage = this.state.page === 1 || this.state.page - 1
    this.setState({
      page: newPage
    })
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
            <div className={`paging-button-area ${this.state.isDataLoading ? 'disabled' : ''}`}>
              <button
                className={`button is-oros is-round ${this.handleDeceasePageStyle()}`}
                style={{ width: '40px' }}
                onClick={() => { this.deceasePage() }}
              >
                <i className="fas fa-angle-left"></i>
              </button>
              <div style={{ width: '100px' }}>
                <p>{this.state.page}/{this.state.maxPage}</p>
              </div>
              <button
                className={`button is-oros is-round ${this.handleInceasePageStyle()}`}
                style={{ width: '40px' }}
                onClick={() => { this.inceasePage() }}
              >
                <i className="fas fa-angle-right"></i>
              </button>
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
