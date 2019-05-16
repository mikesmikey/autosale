/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import ErrorModal from '../Utilities/ErrorModal'
import InfoModal from '../Utilities/InfoModal'
import '../../StyleSheets/ExamScoreSceen.css'

import CCourseService from '../../Services/CourseService'
import '../../StyleSheets/RoomTable.css'

const CourseService = new CCourseService()

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
      if (true) {
        this.infoModal.showModal('ลบข้อมูลสำเร็จ')
        this.props.deleteItemByName(this.props.selectedCourse.subjectName)
        //document.getElementById('buttonCancel').removeAttribute 
        //this.props.closeModal()
      
        
      }// this.props.closeModal()
    }
  
  //     CourseService.deleteCourse(this.props.selectedCourse.subjectNumber, this.props.selectedCourse.courseId).then((data) => {
  //     // eslint-disable-next-line no-constant-condition
  //       if (data) {
  //         this.infoModal.showModal('ลบข้อมูลสำเร็จ').then(() =>{
  //           var a = this.props.deleteItemByName(this.props.selectedCourse.subjectName)
  //         this.props.closeModal()
  //         this.infoModal.showModal('ลบข้อมูลสำเร็จ')
  //         }
  //       } else {
  //        this.errorModal.showModal('เกิดข้อผิดพลาด ลบไม่สำเร็จ')
  //         this.props.closeModal()
  //         this.errorModal.showModal('เกิดข้อผิดพลาด ลบไม่สำเร็จ')
  //         alert('เกิดข้อผิดพลาด ลบไม่สำเร็จ')
  //       }
  //     })
  //   } else {
  //     console.log('STATE NOT CHANE')
  //   }
  }

  render () {
    return (
      <div className="box is-user-popUp" style={{ width: '500px' }}>
        <div>
          <h1 id='text' align="center">ต้องการลบหรือไม่</h1>
          <div style={{ textAlign: 'center' }}>
            <button id='buttonOk'className="button is-oros is-round" onClick={() => { this.deleteButtonHandle() }}>ลบห้อง</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button id='buttonCancel'className="button is-yentafo is-round" onClick={this.props.closeModal}>ยกเลิก</button>
          </div>
        </div>
        <ErrorModal
              ref={instance => { this.errorModal = instance }}
            />
            <InfoModal
              ref={instance => { this.infoModal = instance }}
            />
      </div>
    )
  }
}

export default DeleteRoomPopup
