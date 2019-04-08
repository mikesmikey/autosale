
import React, { Component } from 'react'

import '../../StyleSheets/home.css'
import '../../StyleSheets/courseManager.css'

import Modal from '../Utilities/Modal'
import CourseTable from './courseTable.js'
import CoursePopup from './coursePopup.js'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedCourse: false
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
  }

  componentWillUnmount () {
    this._isMounted = false
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
                <label className="label font-size-2" >รหัสวิชา</label>
              </div>
              <div className='column'>
              </div>
            </div>
            <div className="columns box-content">
              <CourseTable ref={instance => { this.courseTable = instance }}
                setSelectedCourse={this.setSelectedCourse}
                showManageModal={() => { this.managePopup.showManageModal() }}/>
            </div>
            <div className='columns box-content'>
              <button className="button is-oros is-round is-pulled-right" >เพิ่มการเรียน</button>
              <button className="button is-oros is-round is-pulled-right" >เพิ่มข้อมูล</button>
              <button className="button is-oros is-round is-pulled-right" >ลบการเรียน</button>
            </div>

          </div>
        </div>
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
            selectedType={this.state.selectedType}
            selectedUser={this.state.selectedUser}
            setDataLoadingStatus={this.setDataLoadingStatus}
          />
        }
        />
      </div>
    )
  }
}

export default App
