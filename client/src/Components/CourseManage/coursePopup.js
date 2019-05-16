/* eslint-disable no-tabs */
// eslint-disable-next-line no-unused-vars

import React, { Component } from 'react'

class ManageUserPopUp extends Component {
  _isMounted = true;
  constructor (props) {
    super(props)
    this.state = {
      year: '',
      semester: '',
      subjectCode: '',
      subjectName: '',
      teacherName: [],
      groups: '',
      students: '',
      studentsRegister: 0,
      status: ''
    }
    this.loadData = this.loadData.bind(this)
    this.loadNameTeacher = this.loadNameTeacher.bind(this)
  }
  componentWillUnmount () {
    this._isMounted = false
  }
  loadData () {
    this.setState({
      year: this.props.selectedCourse.year,
      semester: this.props.selectedCourse.semater,
      subjectCode: this.props.selectedCourse.subjectNumber,
      subjectName: this.props.selectedCourse.subjectName,
      teacherName: this.props.selectedCourse.teacherName,
      groups: this.props.selectedCourse.groups,
      students: this.props.selectedCourse.students,
      status: this.props.selectedCourse.status,
      studentsRegister: this.props.selectedCourse.studentRegister
    })
    console.log(this.state.studentsRegister)
  }

  showManageModal () {
    this.loadData()
    this.props.showModal()
  }
  loadNameTeacher () {
    var DataObj = []
    if (this.state.teacherName.length !== 0 || this.state.teacherName != null) {
      for (var i = 0; i < this.state.teacherName.length; i++) {
        let result = [{ index: i }]
        result.push(this.state.teacherName[i])
        DataObj[i] = <ListTeacherName
          key={i}
          objData={result}
          itemIndex={i}
        />
      }
    } else {
      // eslint-disable-next-line no-unused-expressions
      <ListTeacherName
        objData = {null}
      />
    }
    return DataObj
  }
  render () {
    return (
      <div className="box is-user-popUp" style={{ width: '500px' }}>
        <div>
          <h1 align="center">รายละเอียดข้อมูล</h1>
          <div className='columns'>
            <div className='column is-4' >
              <p>ปีการศึกษา</p>
              <p>ภาคการศึกษา</p>
              <p>รหัสวิชา</p>
              <p>ชื่อวิชา</p>
            </div>
            <div className='column'>
              <p>{this.state.year}</p>
              <p>{this.state.semester}</p>
              <p>{this.state.subjectCode}</p>
              <p>{this.state.subjectName}</p>
            </div>
          </div>
         
          <div className="columns">
            <div className='column is-4'>
              <p>จำนวนกลุ่ม</p>
              <p>จำนวนนิสิตทั้งหมด</p>
              <p>จำหน่อยนิสิตที่ลงทะเบียนแล้ว</p>
            </div>
            <div className='column'>
              <p>{this.state.groups}</p>
              <p>{this.state.students}</p>
              <p>{this.state.studentsRegister}</p>
            </div>
          </div>
          <div className="columns" style={{ textAlign: 'center' }}>
            <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ตกลง</button>
          </div>

        </div>
      </div>
    )
  }
}

// eslint-disable-next-line no-unused-vars
class ListTeacherName extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor (props) {
    super(props)
  }
  render () {
    return (
      this.props.objData !== null
        ? <div className='columns' style={{ textAlign: 'left' }}>
          {this.props.objData[0].index + 1}. {this.props.objData[1].firstName} {this.props.objData[1].lastName}
          <br></br>
        </div>
        : <div> </div>
    )
  }
}
export default ManageUserPopUp
