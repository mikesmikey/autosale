/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import ExamAddSimpleData from './ExamAddSimpleData'
import ExaminersManage from './ExaminersManage'

import ClientService from '../Utilities/ClientService'
import Exam from '../../Objects/Exam'

import '../../StyleSheets/ExamManage.css'

const CServiceObj = new ClientService()

class ExamManageModal extends Component {
  _isMounted = false

  constructor (props) {
    super(props)
    this.state = {
      selectedExam: null,
      exams: [],
      isLoading: false
    }

    this._isMounted = true

    this.setSelectedExam = this.setSelectedExam.bind(this)
    this.insertMemExam = this.insertMemExam.bind(this)
    this.updateMemExam = this.updateMemExam.bind(this)
    this.deleteMemExam = this.deleteMemExam.bind(this)
  }

  componentDidMount () {
    if (this.props.selectedCourse) {
      this.loadAllExam(this.props.selectedCourse.subjectId, this.props.selectedCourse.courseId)
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  componentDidUpdate (prevProps, prevStates) {
    if (this.props.selectedCourse !== prevProps.selectedCourse) {
      this.loadAllExam(this.props.selectedCourse.subjectId, this.props.selectedCourse.courseId)
    }
  }

  handleCreateExamButtonStyle () {
    if (this.props.selectedCourse && this.props.selectedCourse.status !== 'sampleDataModal') {
      return 'disabled'
    } else { return '' }
  }

  handleExamManageButtonStyle () {
    if (this.props.selectedCourse && this.props.selectedCourse.status === 'noExamData') {
      return 'disabled'
    } else { return '' }
  }

  decideAddDataModal () {
    const decideTable = {
      'noRoomData': 'roomsManageModal',
      'noExaminerData': 'examinersManageModal'
    }

    if (this.props.selectedCourse) {
      return decideTable[this.props.selectedCourse.status]
    }
  }

  handleDeleteExamButton () {
    if (this.props.selectedCourse) {
      this.setState({
        isLoading: true
      })
      CServiceObj.deleteExam(this.state.selectedExam._id).then((result) => {
        this.deleteMemExam(this.state.selectedExam)
        alert('ลบการสอบสำเร็จ')
        this.setState({
          isLoading: false
        })
      })
    } else {
      alert('กรุณาเลือกการสอบก่อนที่จะลบ')
    }
  }

  handleAddDataButton () {
    if (this.props.selectedCourse) {
      this.dataAddModal.showModal(this.decideAddDataModal())
    } else {
      alert('กรุณาเลือกการสอบก่อนที่จะเพิ่มข้อมูล')
    }
  }

  loadAllExam (subjectId, courseId) {
    this.setState({
      isLoading: true,
      exams: []
    })

    CServiceObj.getAllExamBySubjectAndCourse(subjectId, courseId).then((result) => {
      if (this._isMounted) {
        this.setState({
          exams: result,
          isLoading: false
        })
      }
    })
  }

  setSelectedExam (exam) {
    this.setState({
      selectedExam: exam
    })
  }

  insertMemExam (exam) {
    let newExams = this.state.exams
    newExams.push(exam)
    this.setState({
      exams: newExams
    })
  }

  updateMemExam (newExam) {
    const originExam = this.state.exams.findIndex((exam) => {
      return exam._id === newExam._id
    })
    let newExamArr = this.state.exams
    newExamArr[originExam] = newExam
    this.setState({
      exams: newExamArr
    })
  }

  deleteMemExam (deletedExam) {
    const originExam = this.state.exams.findIndex((exam) => {
      return exam._id === deletedExam._id
    })
    let newExamArr = this.state.exams
    newExamArr.splice(originExam, 1)
    this.setState({
      exams: newExamArr
    })
  }

  handleManageRoomModal () {
    if (this.state.selectedExam) {
      this.props.showModal('roomsManageModal')
    } else {
      alert('กรุณาเลือกการสอบก่อนที่จะจัดการ')
    }
  }

  handleManageSimpleDataModal () {
    if (this.state.selectedExam) {
      this.createExamModal.showModal('edit')
    } else {
      alert('กรุณาเลือกการสอบก่อนที่จะจัดการ')
    }
  }

  handleExamManageBoxStyle () {
    return this.state.selectedExam ? '' : 'disabled'
  }

  handleExaminersManageRoomModal () {
    if (this.state.selectedExam) {
      this.props.showModal('examinersManageModal')
    } else {
      alert('กรุณาเลือกการสอบก่อนที่จะจัดการ')
    }
  }

  handleExamCreateButton () {
    if (this.state.selectedExam) {
      CServiceObj.validCourseExistInDB(this.props.selectedCourse).then((result) => {
        console.log(`course valid : ${result}`)
      })
      let exam = new Exam(this.state.selectedExam)
      console.log(`exam simple data valid : ${exam.validExamSimpleData()}`)
      console.log(exam.validRooms())
      //this.validExaminers
      //this.generateRooms
      //this.confirmExam
    } else {
      alert('กรุณาเลือกการสอบก่อนที่จะยืนยัน')
    }
  }

  render () {
    return (
      <div className={`exam-manage box with-title`}>
        <div className="box-title is-violet">
          <h3
            className="label is-2"
          >
            {`${this.props.selectedCourse.subjectId} - ${this.props.selectedCourse.subjectName} ปีการศึกษา ${this.props.selectedCourse.school_year} เทอม ${this.props.selectedCourse.semester}`}
          </h3>
          <button className="exit-button fas fa-times fa-1x" onClick={this.props.closeModal}></button>
        </div>
        <div className={`box-content ${this.state.isLoading ? 'disabled' : ''}`}>
          <div className="columns" style={{ width: '100%' }}>
            <div className="column">
              <h3>การสอบทั้งหมด</h3>
            </div>
            <div className="column is-not-grow">
              <button
                className={`button is-3 is-oros is-round`}
                style={{ width: '130px' }}
                onClick={() => { this.createExamModal.showModal('create') }}
              >
                เพิ่มการสอบ
              </button>
            </div>
          </div>
          <div className="columns is-stay-top" style={{ width: '100%' }}>
            <div className="column">
              <div className="exam-table-area">
                <ExamTable
                  exams={this.state.exams}
                  setSelectedExam={this.setSelectedExam}
                />
              </div>
            </div>
            <div className={`column is-not-grow manage-column ${this.handleExamManageBoxStyle()}`}>
              <div className={`secondary-manage-box box is-round`}>
                <h3>รายละเอียดเบื้องต้น</h3>
                <p>ห้องสอบ : </p>
                <p>ผู้คุมสอบ : </p>
                <button
                  className={`button is-3 is-oros is-round is-full-width ${this.handleExamManageButtonStyle()}`}
                  onClick={() => { this.handleManageSimpleDataModal() }}
                >
                จัดการข้อมูลพื้นฐาน
                </button>
                <button
                  className={`button is-3 is-oros is-round is-full-width ${this.handleExamManageButtonStyle()}`}
                  onClick={() => { this.handleManageRoomModal() }}
                >
                จัดการห้องสอบ
                </button>
                <button
                  className={`button is-3 is-oros is-round is-full-width ${this.handleExamManageButtonStyle()}`}
                  onClick={() => { this.handleExaminersManageRoomModal() }}
                >
                จัดการผู้คุมสอบ
                </button>
              </div>
              <div className="manage-button-area box is-round">
                <button
                  className={`button is-3 is-oros is-round is-full-width ${this.handleExamManageButtonStyle()}`}
                  onClick={() => { this.handleExamCreateButton() }}
                >
                ยืนยันการสอบ
                </button>
                <button
                  className={`button is-3 is-yentafo is-round is-full-width ${this.handleExamManageButtonStyle()}`}
                  onClick={() => { this.handleDeleteExamButton() }}
                >
                ยกเลิกการสอบ
                </button>
              </div>
            </div>
          </div>
        </div>
        <ExamAddSimpleData
          ref={instance => { this.createExamModal = instance }}
          selectedCourse={this.props.selectedCourse}
          selectedExam={this.state.selectedExam}
          closeModal={() => { this.createExamModal.closeModal() }}
          insertMemExam={this.insertMemExam}
          updateMemExam={this.updateMemExam}
        />
      </div>
    )
  }
}

class ExamTable extends Component {
  _isMounted = false
  constructor (props) {
    super(props)

    this.state = {
      selectedRow: null
    }

    this.selectItem = this.selectItem.bind(this)
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  selectItem (e, examData) {
    const parent = e.target.parentElement
    if (parent.classList.contains('exam-table-item')) {
      if (!parent.classList.contains('is-active')) {
        if (this.state.selectedRow != null) {
          this.state.selectedRow.classList.remove('is-active')
        }
        parent.classList.add('is-active')
        this.setState({
          selectedRow: parent
        })
        this.props.setSelectedExam(examData)
      }
    }
  }

  renderTableItem () {
    if (this.props.exams) {
      return this.props.exams.map((exam) => {
        let examData = exam
        examData.subjectId = exam.subjectId
        examData.subjectName = exam.subjectName
        return <ExamTableItem
          key={`${exam.subjectId}_${exam.courseId}_${exam.date}`}
          examData={exam}
          selectItem={(e, examData) => { this.selectItem(e, examData) }}
        />
      })
    }
    return null
  }

  render () {
    return (
      <table className="table course-table">
        <thead>
          <tr className="is-header">
            <th>วันที่สอบ</th>
            <th>ชื่อการสอบ</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableItem()}
        </tbody>
      </table>
    )
  }
}

class ExamTableItem extends Component {
  render () {
    return (
      <tr
        className="exam-table-item"
        onClick={(e) => { this.props.selectItem(e, this.props.examData) }}
      >
        <td>{new Date(this.props.examData.date).toDateString()}</td>
        <td>{this.props.examData.examName}</td>
        <td>{this.props.examData.examConfirm ? 'ยืนยัน' : 'ยังไม่ยืนยัน'}</td>
      </tr>
    )
  }
}

export default ExamManageModal
