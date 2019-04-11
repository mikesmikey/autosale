/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/ExamScoreSceen.css'

import ClientService from '../Utilities/ClientService'
import '../../StyleSheets/RoomTable.css'

const ServiceObj = new ClientService()

// eslint-disable-next-line react/require-render-return
class DeleteRoomPopup extends Component {
  _isMounted = false;

  constructor (props) {
    super(props)

    this.state = {
      courseId: '',
      subjectId: ''
    }

    this._isMounted = true

    this.setData = this.setData.bind(this)
  }

  setData (subid, cid) {
    // eslint-disable-next-line no-undef
    if (_isMounted) {
      this.setState({ courseId: cid, subjectId: subid })
    }
  }

  deleteButtonHandle () {
    if (this.props.selectedCourse.courseId !== '' && this.props.selectedCourse.subjectNumber !== '') {
      console.log(this.props.selectedCourse.courseId, this.props.selectedCourse.subjectNumber)
      ServiceObj.deleteCourse(this.props.selectedCourse.subjectNumber, this.props.selectedCourse.courseId).then((data) => {
        if (data) {
          this.props.closeModal()
        } else {
          this.props.closeModal()
          alert('เกิดข้อผิดพลาด ลบไม่สำเร็จ')
        }
      })
    } else {
      console.log('STATE NO CHANE')
    }
    console.log(this.props.selectedCourse)
  }

  render () {
    return (
      <div className="box is-user-popUp" style={{ width: '500px' }}>
        <div>
          <h1 align="center">ต้องการลบหรือไม่</h1>
          <div style={{ textAlign: 'center' }}>
            <button className="button is-oros is-round" onClick={() => { this.deleteButtonHandle() }}>ลบห้อง</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ยกเลิก</button>
          </div>
        </div>
      </div>
    )
  }
}

export default DeleteRoomPopup
