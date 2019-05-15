/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import CGlobalDataService from '../../Services/GlobalDataService'
import CSubjectService from '../../Services/SubjectService'
import CFacultyService from '../../Services/FacultyService'

// Components
import '../../StyleSheets/userManage.css'
import '../../StyleSheets/addNewSubject.css'
import '../../StyleSheets/addCourse.css'
import Subject2Table from './Subject2Table'

const GlobalDataService = new CGlobalDataService()
const SubjectService = new CSubjectService()
const FacultyService = new CFacultyService()

class AddCourse extends Component {
  constructor (props) {
    super(props)
    this.state = {
      studentNum: '',
      groupNum: '',
      selectSubId: '',
      facultyIndex: 1,
      branchIndex: 1,
      faculties: [],
      subjects: [],
      currentYandT: []
    }
  }
    _isMounted = false

    componentDidMount () {
      this._isMounted = true
      this.loadFacultyData()
      this.loadYearAndTerm()
      this.loadAllSubject()
    }

    componentWillUnmount () {
      this._isMounted = false
    }

    loadYearAndTerm () {
      GlobalDataService.getAllYearAndTerm().then((result) => {
        if (this._isMounted) {
          this.setState({
            currentYandT: result
          })
        }
      })
    }
    loadAllSubject () {
      SubjectService.getAllSubject().then((result) => {
        if (this._isMounted) {
          this.setState({
            subjects: result
          })
        }
      })
    }

    loadFacultyData () {
      FacultyService.getAllFaculty().then((result) => {
        if (this._isMounted) {
          this.setState({
            faculties: result
          })
        }
      })
    }

    handleSearchButton () {
      this.subTable.loadDataBySubjectId(this.state.selectSubId)
    }

    handleInputChange (e) {
      const target = e.target
      const name = target.name
      const value = target.value

      this.setState({
        [name]: value
      })
    }

    handleInputValidate = (e) => {
      if (!(/[0-9:]+/g).test(e.key)) {
        e.preventDefault()
        }
    }

    renderFacultyComponent () {
      // console.log(this.state.faculties)
      return this.state.faculties.map((item) => {
        return <option key={item.facultyId} value={item.facultyId}>{item.facultyName}</option>
      })
    }

    renderFacultyBranchComponent () {
      const faculties = this.state.faculties[this.state.facultyIndex === 0 ? this.state.facultyIndex : this.state.facultyIndex - 1]
      if (!faculties) return null
      var returnArr = []
      for (var i = 0; i < faculties.branches.length; i++) {
        returnArr[i] = <option key={faculties.branches[i].branchId} value={faculties.branches[i].branchId}>{faculties.branches[i].branchName}</option>
      }
      return returnArr
    }

    validateData () {
      var hasAssigned = false; var hasNull = false; var markThisSubjectId = 0
      var currryt = this.state.currentYandT
      var packY = 0; var packT = 0; var maxpacY = 0; var maxpacT = 0

      // find current year and term
      for (var i = 0; i < currryt.length; i++) {
        if (i === 0) {
          packY = currryt[i].currentStudyYear
          packT = currryt[i].currentStudyTerm
        } else {
          if (packY === currryt[i].currentStudyYear &&
                    packT === currryt[i].currentStudyTerm) {
          } else {
            packY = currryt[i].currentStudyYear
            packT = currryt[i].currentStudyTerm
          }
        }

        if (packY >= maxpacY && packT > maxpacT) {
          maxpacY = packY
          maxpacT = packT
        }
      }
      if (packY === currryt[currryt.length - 1].currentStudyYear &&
            packT === currryt[currryt.length - 1].currentStudyTerm) {
        packY = currryt[currryt.length - 1].currentStudyYear
        packT = currryt[currryt.length - 1].currentStudyTerm
        if (packY >= maxpacY && packT > maxpacT) {
          maxpacY = packY
          maxpacT = packT
        }
      }

      // check this course has not assigned this year and term
      // console.log('current year =>', maxpacY, 'current term => ', maxpacT)
      for (let i in this.state.subjects) {
        var courses = this.state.subjects[i].courses
        if (this.state.subjects[i].subjectId === this.state.selectSubId) {
          markThisSubjectId = i
          for (let j in courses) {
            if (courses[j].school_year === maxpacY &&
                        courses[j].semester === maxpacT) {
              hasAssigned = true
              break
            }
          }
          break
        }
      }

      // check null form
      if (!hasAssigned) {
        if (this.state.groupNum.length < 1 ||
                this.state.studentNum.trim().length < 1
                // comment: !this.state.hasFound
        ) {
          hasNull = true
        }
      }

      if (hasNull) {
        alert('กรุณากรอกข้อมูลให้ครบ')
      } else if (hasAssigned) {
        alert('รหัสวิชานี้ได้ถูกเพิ่มไปแล้ว')
      } else {

        // find max course id in this select subject
        var maxCourseId = 0
        for (let j in courses) {
          if (this.state.subjects[markThisSubjectId].courses[j].courseId > maxCourseId) {
            maxCourseId = this.state.subjects[markThisSubjectId].courses[j].courseId
          }
        }

        var courseData = {
          courseId: parseInt(maxCourseId + 1, 10),
          max_groups: parseInt(this.state.groupNum, 10),
          max_students: parseInt(this.state.studentNum, 10),
          school_year: parseInt(maxpacY, 10),
          semester: parseInt(maxpacT, 10)
        }

        SubjectService.addCourseToThisSubject(this.state.selectSubId, courseData).then((result) => {
            if (result) {
            alert('เพิ่มสำเร็จ')
            this.clearData()
          } else {
            alert('เพิ่มไม่สำเร็จ')
          }
        })
      }
    }

    clearData () {
      this.setState({
        studentNum: '',
        groupNum: '',
        selectSubId: '',
        facultyIndex: 1,
        branchIndex: 1
      })
      this.loadFacultyData()
      this.loadYearAndTerm()
      this.loadAllSubject()
      this.renderFacultyComponent()
      this.renderFacultyBranchComponent()
    }
    render () {
      return (
        <div className="subcontent-main-div add-course">
          <div className="add-subject-box box with-title is-round">
            <div className="box-title is-violet">
                        เพิ่มการเรียน
            </div>
            <div className="box-content">
              <div className="columns">
                <div className="column is-4">
                  <div className="columns input-div">
                    <div className="column is-2">
                      <label className="label">คณะ :</label>
                    </div>
                    <div className="column">
                      <select
                        className="select user-mange-select-box-popUp is-full-width"
                        type="text"
                        id="popAddUserFaculty"
                        name="facultyIndex"
                        onChange={this.handleInputChange.bind(this)}
                        value={this.state.facultyIndex}
                      >
                        {this.renderFacultyComponent()}
                      </select>
                    </div>
                  </div>

                  <div className="columns input-div">
                    <div className="column is-2">
                      <label className="label">สาขา : </label>
                    </div>
                    <div className="column">
                      <select
                        className="select user-mange-select-box-popUp is-full-width"
                        type="text"
                        id="popAddUserBranch"
                        name="branchIndex"
                        onChange={this.handleInputChange.bind(this)}
                        value={this.state.branchIndex}
                      >
                        {this.renderFacultyBranchComponent()}
                      </select>
                    </div>
                  </div>

                  <div className="columns input-div">
                    <div className="column is-2">
                      <label className="label">รหัสวิชา : </label>
                    </div>
                    <div className="column">
                      <input
                        className="input is-subjectIdNew-width"
                        type="text"
                        id="userId"
                        name="selectSubId"
                        value={this.state.selectSubId}
                        onChange={this.handleInputChange.bind(this)}
                        onKeyPress={this.handleInputValidate.bind(this)} />
                    </div>
                    <div className="input-with-text">
                      <button
                        type="submit">
                        <i
                          className="fa fa-search height50"
                          onClick={this.handleSearchButton.bind(this)}>
                        </i>
                      </button>
                    </div>
                  </div>

                  {/* <div className={`columns input-div ${!this.state.hasFound ? '' : 'is-hiding'}`}>
                                    <div className="column is-2" style={{ color: 'red' }}>
                                        <label className="label">ไม่พบรายการ</label>
                                    </div>
                                </div> */}

                  <div className="columns input-div">
                    <Subject2Table
                      ref={instance => { this.subTable = instance }}
                      selectSubId={this.state.selectSubId}
                      faculties={this.state.faculties}
                    />
                  </div>
                </div>
                <div className="column">
                  <h2 style={{ color: '#814ab5' }} align="center">รายละเอียด</h2>
                  <div style={{ borderStyle: 'solid', borderColor: '#814ab5' }}>
                    <div className="columns input-div" style={{ marginTop: '40px' }}>
                      <div className="column is-2">
                        <label className="label">กลุ่มเรียนทั้งหมด :</label>
                      </div>
                      <div className="column is-4">
                        <select
                          className="select user-mange-select-box-popUp is-full-width"
                          type="text"
                          id="groupNum"
                          name="groupNum"
                          onChange={this.handleInputChange.bind(this)}
                          value={this.state.groupNum}
                        >
                          <option value="0"></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>

                    <div className="columns input-div" style={{ marginBottom: '40px' }}>
                      <div className="column is-2">
                        <label className="label">นักเรียนทั้งหมด : </label>
                      </div>
                      <div className="column is-4">
                        <input
                          className="input is-StudentNum-width"
                          type="text"
                          id="studentNumId"
                          name="studentNum"
                          value={this.state.studentNum}
                          onChange={this.handleInputChange.bind(this)}
                          maxLength={3}
                          onKeyPress={this.handleInputValidate.bind(this)} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="adds-tab-is-15"></span>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <button
                      className="button is-oros is-round"
                      onClick={this.validateData.bind(this)}>
                                        ยืนยัน
                    </button>
                    <button
                      className="button is-yentafo is-round"
                      onClick={() => { this.clearData() }}>
                                        ยกเลิก
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

export default AddCourse
