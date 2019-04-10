/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'

import ClientService from '../Utilities/ClientService'

import ExamTable from './ExamTable'
import DataAddModal from './DataAddModal'

import Exam from '../../Objects/Exam'

import '../../StyleSheets/ExamCreateScreen.css'

const CServiceObj = new ClientService()

class ExamCreateScreen extends Component {
  _isMounted = false

  constructor (props) {
    super(props)

    this.state = {
      examTypeRadioValue: 'middle',
      subjects: [],
      exams: [],
      searchInput: '',
      selectedExam: null,
      isLoading: false
    }

    this._isMounted = true

    this.handleRadioInput = this.handleRadioInput.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.searchButtonHandle = this.searchButtonHandle.bind(this)
    this.setSelectedExam = this.setSelectedExam.bind(this)
  }

  componentDidMount () {
    this.loadAllExam()
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

  handleRadioInput (e) {
    const target = e.target
    const name = target.name

    this.setState({
      examTypeRadioValue: name
    })

    this.loadAllExam()
  }

  setSelectedExam (exam) {
    this.setState({
      selectedExam: exam
    })
  }

  sortExamBySubjectId (exam1, exam2) {
    return exam1.subjectId - exam2.subjectId
  }

  loadAllExam (subjectId) {
    this.setState({
      isLoading: true,
      exams: []
    })

    var newexams = []
    CServiceObj.searchAllCurrentCourseBySubjectId(subjectId || '').then((result) => {
      if (result.length === 0) {
        this.setState({
          isLoading: false
        })
      }

      result.forEach(element => {
        element.courses.forEach((course) => {
          var isHasExam = false
          CServiceObj.getAllExamBySubjectAndCourse(element.subjectId, course.courseId).then((result) => {
            result.forEach((exam) => {
              if (exam.category === this.state.examTypeRadioValue) {
                isHasExam = true
                exam.subjectName = element.subjectName
                const examobj = new Exam(exam)
                newexams.push(examobj)
              }
            })
            if (!isHasExam) {
              const noExamData = {
                subjectId: element.subjectId,
                subjectName: element.subjectName,
                courseId: course.courseId,
                category: this.state.examTypeRadioValue
              }
              const examobj = new Exam(noExamData)
              newexams.push(examobj)
            }

            newexams.sort(this.sortExamBySubjectId)

            if (this._isMounted) {
              this.setState({
                exams: newexams,
                isLoading: false
              })
            }
          })
        })
      })
    })
  }

  searchButtonHandle () {
    this.loadAllExam(this.state.searchInput)
  }

  handleCreateExamButtonStyle () {
    if (this.state.selectedExam && this.state.selectedExam.status !== 'noExamData') {
      return 'disabled'
    } else { return '' }
  }

  handleExamManageButtonStyle () {
    if (this.state.selectedExam && this.state.selectedExam.status === 'noExamData') {
      return 'disabled'
    } else { return '' }
  }

  decideAddDataModal () {
    const decideTable = {
      'noRoomData': 'roomsManageModal',
      'noExaminerData': 'examinersManageModal'
    }

    if (this.state.selectedExam) {
      return decideTable[this.state.selectedExam.status]
    }
  }

  handleDeleteExamButton () {
    if (this.state.selectedExam) {
      this.setState({
        isLoading: true
      })
      CServiceObj.deleteExam(this.state.selectedExam._id).then((result) => {
        const noExamData = {
          subjectId: this.state.selectedExam.subjectId,
          subjectName: this.state.selectedExam.subjectName,
          courseId: this.state.selectedExam.courseId,
          category: this.state.examTypeRadioValue
        }
        const examobj = new Exam(noExamData)
        var newExamsArray = this.state.exams
        newExamsArray[this.state.exams.indexOf(this.state.selectedExam)] = examobj
        this.setState({
          exams: newExamsArray,
          isLoading: false
        })
        this.setSelectedExam(examobj)
        alert('ลบการสอบสำเร็จ')
      })
    } else {
      alert('กรุณาเลือกการสอบก่อนที่จะลบ')
    }
  }

  handleAddDataButton () {
    if (this.state.selectedExam) {
      this.dataAddModal.showModal(this.decideAddDataModal())
    } else {
      alert('กรุณาเลือกการสอบก่อนที่จะเพิ่มข้อมูล')
    }
  }

  handleCreateExamButton () {
    if (this.state.selectedExam) {
      this.dataAddModal.showModal('dateModal')
    } else {
      alert('กรุณาเลือกการรายวิชาก่อนที่จะเพิ่มการสอบ')
    }
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
                    <input type="radio" name="middle" onChange={this.handleRadioInput} checked={this.state.examTypeRadioValue === 'middle'}/>
                    <p className="label is-3">กลางภาค</p>
                  </span>
                  <span className="input-set">
                    <input type="radio" name="final" onChange={this.handleRadioInput} checked={this.state.examTypeRadioValue === 'final'}/>
                    <p className="label is-3">ปลายภาค</p>
                  </span>
                </div>
                <div className="column is-not-grow">
                  <button className="button is-oros is-round" style={{ marginTop: '0' }} onClick={this.searchButtonHandle}>ค้นหา</button>
                </div>
              </div>
            </div>
            <div className="exam-table-area">
              <ExamTable
                subjects={this.state.subjects}
                exams={this.state.exams}
                setSelectedExam={this.setSelectedExam}
              />
            </div>
            <div className="exam-button-area">
              <button
                className={`button is-3 is-oros is-round ${this.handleCreateExamButtonStyle()}`}
                style={{ width: '130px' }}
                onClick={() => { this.handleCreateExamButton() }}
              >
                เพิ่มการสอบ
              </button>
              <button
                className={`button is-3 is-orange is-round ${this.handleExamManageButtonStyle()}`}
                style={{ width: '130px' }}
                onClick={() => { this.handleAddDataButton() }}
              >
                เพิ่มข้อมูล
              </button>
              <button
                className={`button is-3 is-yentafo is-round ${this.handleExamManageButtonStyle()}`}
                style={{ width: '130px' }}
                onClick={() => { this.handleDeleteExamButton() }}
              >
                ยกเลิกการสอบ
              </button>
            </div>
          </div>
        </div>
        <DataAddModal
          ref={instance => { this.dataAddModal = instance }}
          selectedExam={this.state.selectedExam}
          setSelectedExam={this.setSelectedExam}
        />
      </div>
    )
  }
}

export default ExamCreateScreen
