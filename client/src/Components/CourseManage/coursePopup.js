// eslint-disable-next-line no-unused-vars

import React, { Component } from 'react'

import ClientService from '../Utilities/ClientService'

const ServiceObj = new ClientService()

class ManageUserPopUp extends Component {
  _isMounted = false;
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
      studentsRegister: '',
      status: ''
    }
    this.loadData = this.loadData.bind(this)
    this.getDataformDatabase = this.getDataformDatabase.bind(this)
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
      // teacherName ต้องดึงจากฐานข้อมูล
      groups: this.props.selectedCourse.groups,
      students: this.props.selectedCourse.students,
      status: this.props.selectedCourse.status
      // studentsRegister ต้องดึง
    })
    this.getDataformDatabase(this.state.subjectCode)
  }
  getDataformDatabase () {
    ServiceObj.getNameteacherFormRegisterCourseBySubjectId('88624459').then((NameData) => {
      this.setState({ teacherName: NameData })
    })
  }

  showManageModal () {
    console.log(this.props.selectedCourse)
    this.loadData()
    console.log(this.state.teacherName)
    this.props.showModal()
  }
  loadNameTeacher () {
    var DataObj = []
    if (this.state.teacherName.length !== 0) {
      console.log(this.state.teacherName)
      for (var i = 0; i < this.state.teacherName.length; i++) {
        // let arr = { text: 'x' }
        DataObj[i] = <ListTeacherName
          key={i}
          objData={this.state.teacherName[i]}
          itemIndex={i}
        />
      }
    } else {
      let arr = { text: '' }
      DataObj[0] = <ListTeacherName
        key={0}
        objData={arr}
        itemIndex={i}
      />
    }
    return DataObj
  }
  render () {
    return (
      <div className="box is-user-popUp" style={{ width: '500px' }}>
        <div>
          <h1 align="center">รายละเอียดข้อมูล</h1>
          <div >
            <p>ปีการศึกษา {this.state.year}</p>
            <p>ภาคการศึกษา {this.state.semester}</p>
            <p>รหัสวิชา {this.state.subjectCode}</p>
            <p>ชื่อวิชา {this.state.subjectName}</p>
          </div>
          <div className="columns">
            <div className="column is-3">
              <p>ชื่อครู</p>
            </div>
            <div className="column">
              {this.loadNameTeacher()}
            </div>
          </div>
          <div>
            <p>จำนวนกลุ่ม {this.state.groups}</p>
            <p>จำนวนนิสิตทั้งหมด {this.state.students}</p>
            <p>จำหน่อยนิสิตที่ลงทะเบียนแล้ว {this.state.studentsRegister}</p>
            <p>สถานนะ	{this.state.status}</p>
          </div>
          <div className="columns" style={{ textAlign: 'center' }}>
            <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ตกลง</button>
          </div>

        </div>
      </div>
    )
  }
}

class ListTeacherName extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        {this.props.objData.firstName !== null ? <p>{this.props.objData.firstName} {this.props.objData.lastName}</p> : ''}
      </div>
    )
  }
}
export default ManageUserPopUp
