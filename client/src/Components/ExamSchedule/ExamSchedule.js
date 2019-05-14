/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import CCourseService from '../../Services/CourseService'
import CExamService from '../../Services/ExamService'
// Components
import Modal from '../Utilities/Modal'
import '../../StyleSheets/examSchedule.css'

const CourseService = new CCourseService()
const ExamService = new CExamService()

class ExamSchedule extends Component {
  constructor (props) {
    super(props)
    this.state = {
      exams: [],
      courses: [],
      selectedExam: null
    }
  }

  componentDidMount () {
    this.loadUserExam()
    this.loadUserCourse()
  }

  componentDidUpdate (prevProps, prevStates) {
    if (this.state.exams !== prevStates.exams || this.state.courses !== prevStates.courses) {
      // this.renderUserExam()
    }
  }

  loadUserExam () {
    if (this.props.user) {
      console.log('LOG: Loading user exam')
      for (let i = 0, p = Promise.resolve(); i < this.props.user.courses.length; i++) {
        p = p.then((_) => new Promise(resolve => {
          ExamService.getAllExamBySubjectAndCourse(this.props.user.courses[i].subjectId, this.props.user.courses[i].courseId).then((result) => {
            let newExams = this.state.exams
            newExams = newExams.concat(result)
            this.setState({
              exams: newExams
            })
            resolve()
          })
        }))
      }
    }
  }

  loadUserCourse () {
    for (let i = 0, p = Promise.resolve(); i < this.props.user.courses.length; i++) {
      p = p.then((_) => new Promise(resolve => {
        CourseService.getCourseByIdAndSubjectId(this.props.user.courses[i].courseId, this.props.user.courses[i].subjectId).then((result) => {
          let newCourses = this.state.courses
          newCourses = newCourses.concat(result)
          this.setState({
            courses: newCourses
          })
          resolve()
        })
      }))
    }
  }

  calculateTime (startTime, hours) {
    var startTimeToString = startTime.toString()
    var finishTime = startTime + hours
    var finishTimeToString = finishTime.toString()
    if (startTimeToString.length === 1 || startTimeToString.length === 2) {
      if (startTimeToString.length === 1) {
        startTimeToString = '0' + startTimeToString + ':00'
      } else {
        startTimeToString = startTimeToString + ':00'
      }
    } else if (startTimeToString.length === 3) {
      startTimeToString = startTimeToString.charAt(0) + ':' + startTimeToString.charAt(2)
    } else if (startTimeToString.length === 4) {
      if (startTimeToString.charAt(1) === '.') {
        startTimeToString = startTimeToString.charAt(0) + ':' + startTimeToString.charAt(2) + startTimeToString.charAt(3)
      } else {
        startTimeToString = startTimeToString.charAt(0) + startTimeToString.charAt(1) + ':' + startTimeToString.charAt(3) + '0'
      }
    } else if (startTimeToString.length === 5) {
      startTimeToString = startTimeToString.charAt(0) + startTimeToString.charAt(1) + ':' + startTimeToString.charAt(3) + startTimeToString.charAt(4)
    }

    if (finishTimeToString.length === 1 || finishTimeToString.length === 2) {
      if (finishTimeToString.length === 1) {
        finishTimeToString = '0' + finishTimeToString + ':00'
      } else {
        finishTimeToString = finishTimeToString + ':00'
      }
    } else if (finishTimeToString.length === 3) {
      finishTimeToString = finishTimeToString.charAt(0) + ':' + finishTimeToString.charAt(2)
    } else if (finishTimeToString.length === 4) {
      if (finishTimeToString.charAt(1) === '.') {
        finishTimeToString = finishTimeToString.charAt(0) + ':' + finishTimeToString.charAt(2) + finishTimeToString.charAt(3)
      } else {
        finishTimeToString = finishTimeToString.charAt(0) + finishTimeToString.charAt(1) + ':' + finishTimeToString.charAt(3) + '0'
      }
    } else if (finishTimeToString.length === 5) {
      finishTimeToString = finishTimeToString.charAt(0) + finishTimeToString.charAt(1) + ':' + finishTimeToString.charAt(3) + finishTimeToString.charAt(4)
    }

    var setTime = startTimeToString + ' - ' + finishTimeToString
    return setTime
  }

  renderUserExam () {
    let examItems = []
    if (this.state.exams.length > 0 && this.state.courses.length > 0) {
      for (let i = 0; i < this.state.exams.length; i++) {
        if (this.state.exams[i].examConfirm) {
          this.state.exams[i].rooms.forEach(room => {
            for (let j = 0; j < room.examSeats.length; j++) {
              let seatFound = room.examSeats[j].find((seat) => {
                return seat.studentCode === this.props.user.username
              })
              if (seatFound) {
                let examData = {}
                examData.subjectId = this.state.exams[i].subjectId
                examData.subjectName = this.state.exams[i].subjectName
                let courseFound = this.state.courses.find((course) => {
                  return course.subjectId === this.state.exams[i].subjectId && course.courses[0].courseId === this.state.exams[i].courseId
                })
                if (courseFound) {
                  examData.school_year = courseFound.courses[0].school_year
                  examData.semester = courseFound.courses[0].semester
                } else {
                  examData.school_year = 'unknown'
                  examData.semester = 'unknown'
                }
                examData.examName = this.state.exams[i].examName
                examData.roomId = room.roomId
                examData.seatNumber = seatFound.seatNumber
                examData.date = this.state.exams[i].date
                examData.timeString = this.calculateTime(room.startTime, room.hours)
                const userStatusTable = {
                  'unregistered': 'ยังไม่สอบ',
                  'registered': 'สอบแล้ว',
                  'miss': 'ขาดสอบ'
                }
                examData.status = userStatusTable[seatFound.status]
                examItems.push(
                  <ExamScheduleItem
                    key={this.state.exams[i]._id}
                    showModal={() => { this.examExtendDetail.showModal(examData) }}
                    examData={examData}
                  />
                )
              }
            }
          })
        }
      }
    }
    return examItems
  }

  render () {
    return (
      <div className="subcontent-main-div exam-schedule">
        <Modal ref={instance => { this.extendDetailModal = instance }} content={
          <ExamExtendDetail
            ref={instance => { this.examExtendDetail = instance }}
            showModal={() => { this.extendDetailModal.showModal() }}
            closeModal={() => { this.extendDetailModal.closeModal() }}
          />} />
        <div className="schedule-area box is-round">
          {this.renderUserExam()}
        </div>
      </div>
    )
  }
}

class ExamScheduleItem extends Component {
  render () {
    const monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ]
    const examDate = new Date(this.props.examData.date)
    return (
      <div className="exam-schedule-item box is-round" onClick={this.props.showModal}>
        <div className="schedule-item-columns columns">
          <div className="exam-date-box column is-2 is-white-violet">
            <div className="date-labels">
              <h1>{examDate.getDate()}</h1>
              <h3>{monthNames[examDate.getMonth()]}</h3>
              <h3>{examDate.getFullYear()}</h3>
              <h2>เวลา {this.props.examData.timeString}</h2>
            </div>
          </div>
          <div className="exam-detail-column column">
            <h2 id="subject-name">{this.props.examData.examName}</h2>
            <div className="exam-detail box is-round is-light-gray">
              <div className="exam-detail-columns columns is-stay-top">
                <div className="column">
                  <div className="small-detail-box">
                    <p>วิชา: {this.props.examData.subjectId} - {this.props.examData.subjectName}</p>
                    <p>ปีการศึกษา {this.props.examData.school_year} เทอม {this.props.examData.semester}</p>
                  </div>
                  <div className="small-detail-box">
                    <p>ห้องสอบ: {this.props.examData.roomId}</p>
                    <p>เลขที่นั่งสอบ : {this.props.examData.seatNumber}</p>
                  </div>
                </div>
                <div className="column is-not-grow">
                  <div className="user-status-box box is-round is-white-violet">
                    <h2>สถานะ</h2>
                    <h1>{this.props.examData.status}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ExamExtendDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      examData: null
    }
  }

  showModal (examData) {
    this.setState({
      examData: examData
    })
    this.props.showModal()
  }

  render () {
    const monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ]
    var examDate
    if (this.state.examData) {
      examDate = new Date(this.state.examData.date)
    }
    return (
      <div className="exam-extend-detail">
        {this.state.examData
          ? <div className="box with-title is-round">
            <div className="box-title is-violet">
              <p style={{ margin: 0 }}>รายละเอียดการสอบ</p>
              <a className="fas fa-times close-button" onClick={this.props.closeModal}></a>
            </div>
            <div className="box-content">
              <h2>วิชาที่สอบ</h2>
              <div className="box is-light-gray">
                        ชื่อการสอบ :  {this.state.examData.examName} <br />
                        วิชา :  {this.state.examData.subjectId} - {this.state.examData.subjectName} <br />
                        ปีการศึกษา : {this.state.examData.school_year}<br />
                        ภาคเรียนที่ : {this.state.examData.semester}<br />
              </div>
              <h2>เวลาที่สอบ</h2>
              <div className="box detail is-light-gray">
                        วันที่ : {examDate.getDate()} {monthNames[examDate.getMonth()]} {examDate.getFullYear()} <br />
                        เวลา : {this.state.examData.timeString}<br />
              </div>
              <h2>ห้องที่สอบ</h2>
              <div className="box detail is-light-gray">
                        ห้องสอบ : {this.state.examData.roomId} <br />
                        เลขที่นั่งสอบ : {this.state.examData.seatNumber} <br />
              </div>
            </div>
          </div>
          : null
        }
      </div>
    )
  }
}

export default ExamSchedule
