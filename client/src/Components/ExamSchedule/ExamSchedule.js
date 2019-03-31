/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// Components
import Modal from '../Utilities/Modal'

import '../../StyleSheets/examSchedule.css'

class ExamSchedule extends Component {

    createSampleData() {
        var returnArr = [];
        for (var i = 0; i < 50; i++) {
            //returnArr[i] = <ExamScheduleItem key={i} showModal={() => { this.extendDetailModal.showModal() }} />
            //returnArr[i] = <div>asdasd</div>
        }

        return returnArr;
    }

    render() {
        return (
            <div className="subcontent-main-div exam-schedule">
                <Modal ref={instance => { this.extendDetailModal = instance }} content={<ExamExtendDetail closeModal={() => { this.extendDetailModal.closeModal() }} />} />
                <div className="box is-round">
                    {this.createSampleData()}
                </div>
            </div>
        );
    }
}

class ExamScheduleItem extends Component {
  render () {
    return (
      <div className="exam-schedule-item box is-round" onClick={this.props.showModal}>
        <div className="columns">
          <div className="exam-date-box column is-2 is-white-violet">
            <span className="date-labels">
              <h1>99</h1>
              <h3>ธันวาคม</h3>
              <h3>99999</h3>
              <h2>เวลา 99:99</h2>
            </span>
          </div>
          <div className="exam-detail-column column">
            <div className="exam-title">
              <div className="columns">
                <div className="column auto">
                  <h2 id="subject-id">88624459 : </h2>
                </div>
                <div className="column">
                  <h2 id="subject-name">Object-Oriented Analysis and Design</h2>
                </div>
              </div>
            </div>
            <div className="exam-detail">
              <div className="box is-round is-light-gray">
                <p>กลุ่มที่ : 1 ห้องสอบ : IF-404 เลขที่นั่งสอบ : 12 ประเภท : กลางภาค</p>
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
