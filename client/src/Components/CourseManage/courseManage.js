
import React, { Component } from 'react'

import '../../StyleSheets/home.css'
import '../../StyleSheets/courseManager.css'
// eslint-disable-next-line no-unused-vars
import Modal from '../Utilities/Modal'
// eslint-disable-next-line no-unused-vars
import CourseTable from './courseTable.js'
// eslint-disable-next-line no-unused-vars
import CoursePopup from './coursePopup.js'
// eslint-disable-next-line no-unused-vars
import CoureseDeletePopup from './courseDeletePopup'

import CGlobalDataService from '../../Services/GlobalDataService'
const GlobalDataService = new CGlobalDataService()

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedCourse: null,
      cStudyYear: '-',
      cStudyTerm: '-'
    }
    this._isMounted = true

    this.setSelectedCourse = this.setSelectedCourse.bind(this)
  }
  setSelectedCourse (course) {
    this.setState({
      selectedCourse: course
    })
  }

  componentDidMount () {
    this.courseTable.loadAllDataCourse()
    this.loadYearAndTerm()
  }
  componentWillUnmount () {
    this._isMounted = false
  }
  loadYearAndTerm () {
    GlobalDataService.getYearAndTerm().then((data) => {
      this.setYearAndTerm(data.currentStudyYear, data.currentStudyTerm)
    })
  }
  setYearAndTerm (year, term) {
    this.setState({
      cStudyYear: year,
      cStudyTerm: term
    })
  }
  render () {
    return (
      <div className="subcontent-main-div coures">
        <div className="box with-title is-round ">
          <div className="box-title is-violet">
            จัดการการเรียน
          </div>
          <div className="box-content">
            <div className="columns">
              <div className='column is-2'>
                <label className="label font-size-2" >ตารางการเรียน</label>
              </div>
              <div className='column is-2'>
                <label className="label font-size-2" >ปีการศึกษา {this.state.cStudyYear}</label>
              </div>
              <div className='column is-2'>
                <label className="label font-size-2" >ภาคเรียน {this.state.cStudyTerm}</label>
              </div>
              <div className='column'>
              </div>
            </div>
            <div className="wigth100">
              <CourseTable ref={instance => { this.courseTable = instance }}
                setSelectedCourse={this.setSelectedCourse}
                showManageModal={() => { this.managePopup.showManageModal() }}
                showDeleteModal={() => { this.CoureseDeletePopup.showModal() }}
              />
            </div>
          </div>
        </div>
        <Modal ref={instance => { this.CoureseDeletePopup = instance }} content={
          <CoureseDeletePopup
            ref={instance => { this.CoureseDeletePopup = instance }}
            closeModal={() => {
              this.CoureseDeletePopup.closeModal()
            }}
            showModal={() => {
              this.CoureseDeletePopup.showModal()
            }}
            deleteItemByName={(data) => { this.courseTable.deleteItemByname(data) }}
            selectedCourse={this.state.selectedCourse}
          />
        }
        />
        <Modal ref={instance => { this.manageCourseModal = instance }} content={
          <CoursePopup
            ref={instance => { this.managePopup = instance }}
            selectedCourse={this.state.selectedCourse}
            closeModal={() => {
              this.manageCourseModal.closeModal()
            }}
            showModal={() => {
              this.manageCourseModal.showModal()
            }}
          />
        }
        />
      </div>
    )
  }
}

export default App
