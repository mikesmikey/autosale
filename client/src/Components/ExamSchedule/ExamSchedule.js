/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ClientService from '../Utilities/ClientService'

// Components
import Modal from '../Utilities/Modal'

import '../../StyleSheets/examSchedule.css'

const CServiceObj = new ClientService()

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
          CServiceObj.getAllExamBySubjectAndCourse(this.props.user.courses[i].subjectId, this.props.user.courses[i].courseId).then((result) => {
            let newExams = this.state.exams
            newExams = newExams.concat(result)
            console.log(newExams)
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
        CServiceObj.getCourseByIdAndSubjectId(this.props.user.courses[i].courseId, this.props.user.courses[i].subjectId).then((result) => {
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
                console.log(examData)
                examItems.push(
                  <ExamScheduleItem
                    key={this.state.exams[i]._id}
                    showModal={() => { this.extendDetailModal.showModal() }}
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

  createSampleData () {
    var returnArr = []
    for (var i = 0; i < 50; i++) {
      returnArr[i] = <ExamScheduleItem key={i} showModal={() => { this.extendDetailModal.showModal() }} />
    }

    return returnArr
  }

  render () {
    return (
      <div className="subcontent-main-div exam-schedule">
        <Modal ref={instance => { this.extendDetailModal = instance }} content={<ExamExtendDetail closeModal={() => { this.extendDetailModal.closeModal() }} />} />
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
    console.log(new Date(this.props.examData.date).getMonth())
    return (
      <div className="exam-schedule-item box is-round" onClick={this.props.showModal}>
        <div className="columns">
          <div className="exam-date-box column is-2 is-white-violet">
            <div className="date-labels">
              <h1>{examDate.getDate()}</h1>
              <h3>{monthNames[examDate.getMonth()]}</h3>
              <h3>{examDate.getFullYear()}</h3>
              <h2>เวลา 99:99 - 99:99</h2>
            </div>
          </div>
          <div className="exam-detail-column column">
            <h2 id="subject-name">{this.props.examData.examName}</h2>
            <div className="exam-detail box is-round is-light-gray">
              <div className="small-detail-box">
                <p>วิชา: {this.props.examData.subjectId} - {this.props.examData.subjectName}</p>
                <p>ปีการศึกษา {this.props.examData.school_year} เทอม {this.props.examData.semester}</p>
              </div>
              <div className="small-detail-box">
                <p>ห้องสอบ: {this.props.examData.roomId}</p>
                <p>เลขที่นั่งสอบ : {this.props.examData.seatNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ExamExtendDetail extends Component {
  render () {
    return (
      <div className="exam-extend-detail">
        <div className="box with-title is-round">
          <div className="box-title is-violet">
            <p style={{ margin: 0 }}>รายละเอียดการสอบ</p>
            <a className="fas fa-times close-button" onClick={this.props.closeModal}></a>
          </div>
          <div className="box-content">
            <h2>วิชาที่สอบ</h2>
            <div className="box is-light-gray">
                            วิชา :  88624459 :  Object-Oriented Analysis and Design <br />
                            ปีการศึกษา : 2562<br />
                            ภาคเรียนที่ : 1<br />
                            ประเภท : กลางภาค<br />
                            กลุ่มที่ : 1<br />
            </div>
            <h2>เวลาที่สอบ</h2>
            <div className="box detail is-light-gray">
                            วันที่ : 1 เมษายน 2562 <br />
                            เวลา : 10:30 น.<br />
            </div>
            <h2>ห้องที่สอบ</h2>
            <div className="box detail is-light-gray">
                            ห้องสอบ : IF-404 <br />
                            เลขที่นั่งสอบ : 12 <br />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExamSchedule
