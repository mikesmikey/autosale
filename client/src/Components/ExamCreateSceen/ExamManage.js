/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import Modal from '../Utilities/Modal'
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
      exams: []
    }

    this._isMounted = true

    this.setSelectedExam = this.setSelectedExam.bind(this)
    this.insertMemExam = this.insertMemExam.bind(this)
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
      CServiceObj.deleteExam(this.props.selectedCourse._id).then((result) => {
        const noExamData = {
          subjectId: this.props.selectedCourse.subjectId,
          subjectName: this.props.selectedCourse.subjectName,
          courseId: this.props.selectedCourse.courseId,
          category: this.state.examTypeRadioValue
        }
        const examobj = new Exam(noExamData)
        var newExamsArray = this.state.exams
        newExamsArray[this.state.exams.indexOf(this.props.selectedCourse)] = examobj
        this.setState({
          exams: newExamsArray,
          isLoading: false
        })
        this.setSelectedCourse(examobj)
        alert('ลบการสอบสำเร็จ')
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

  handleManageRoomModal () {
    if (this.state.selectedExam) {
      this.props.showModal('roomsManageModal')
    } else {
      alert('กรุณาเลือกการสอบก่อนที่จะจัดการ')
    }
  }

  handleExaminersManageRoomModal () {
    if (this.state.selectedExam) {
      this.props.showModal('examinersManageModal')
    } else {
      alert('กรุณาเลือกการสอบก่อนที่จะจัดการ')
    }
  }

  render () {
    return (
      <div className="exam-manage box with-title">
        <div className="box-title is-violet">
          <h3
            className="label is-2"
          >
            {`${this.props.selectedCourse.subjectId} - ${this.props.selectedCourse.subjectName} ปีการศึกษา ${this.props.selectedCourse.school_year} เทอม ${this.props.selectedCourse.semester}`}
          </h3>
          <button className="exit-button fas fa-times fa-1x" onClick={this.props.closeModal}></button>
        </div>
        <div className="box-content">
          <div className="columns" style={{ width: '100%' }}>
            <div className="column">
              <h3>การสอบทั้งหมด</h3>
            </div>
            <div className="column is-not-grow">
              <button
                className={`button is-3 is-oros is-round`}
                style={{ width: '130px' }}
                onClick={() => { this.createExamModal.showModal() }}
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
            <div className="column is-not-grow manage-column">
              <div className="secondary-manage-box box is-round">
                <h3>รายละเอียดเบื้องต้น</h3>
                <p>ห้องสอบ : </p>
                <p>ผู้คุมสอบ : </p>
                <button
                  className={`button is-3 is-oros is-round is-full-width ${this.handleExamManageButtonStyle()}`}
                  onClick={() => { this.handleAddDataButton() }}
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
                  onClick={() => { this.handleAddDataButton() }}
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
        <Modal ref={instance => { this.createExamModal = instance }} content={
          <ExamAddSimpleData
            selectedCourse={this.props.selectedCourse}
            closeModal={() => { this.createExamModal.closeModal() }}
            insertMemExam={this.insertMemExam}
          />
        }/>
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
