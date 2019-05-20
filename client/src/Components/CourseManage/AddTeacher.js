import React, { Component } from 'react'
import ErrorModal from '../Utilities/ErrorModal'
import InfoModal from '../Utilities/InfoModal'
import CUserService from '../../Services/UserService'
import '../../StyleSheets/mainMenuBar.css'
import '../../StyleSheets/courseManager.css'
import { throws } from 'assert';

const UserService = new CUserService()
class AddNameTeacher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputName: '',
      data: [],
      found: true,
      selectRow: null,
      dataRow: [],
      TeacherSelect: [],
      AddAlert: false
    }
    this.setTeacherSelect = this.setTeacherSelect.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.serach = this.serach.bind(this)
    this.selectItem = this.selectItem.bind(this)
    this.deleteTeacher = this.deleteTeacher.bind(this)
    this.setTeacher = this.setTeacher.bind(this)
    this.setDefaultTeacher = this.setDefaultTeacher.bind(this)
  }
  setDefaultTeacher() {
    this.setState({
      inputName: '',
      data: [],
      found: true,
      selectRow: null,
      dataRow: [],
      TeacherSelect: [],
      AddAlert: false
    })
  }
  setTeacherSelect() {
    var data = this.state.TeacherSelect
    data.push(this.state.dataRow)
    this.setState({
      TeacherSelect: data
    })
  }
  deleteTeacher(username) {
    for (var i = 0; i < this.state.TeacherSelect.length; i++) {
      if (this.state.TeacherSelect[i].username === username) {
        var CopyData = this.state.TeacherSelect
        CopyData.splice(i, 1)
        this.setState({ TeacherSelect: CopyData })
      }
    }
  }
  selectItem(e) {
    const parent = e.target.parentElement
    if (parent.classList.contains('course-table-item')) {
      if (!parent.classList.contains('is-active')) {
        if (this.state.selectRow != null) {
          this.state.selectRow.classList.remove('is-active')
        }
        this.setState({
          selectRow: parent
        })
        parent.classList.add('is-active')
        this.setState({ dataRow: this.state.data[parent.getAttribute('index')] })
      }
    }
  }
  handleInputChange(e) {
    const target = e.target
    const value = target.value
    this.setState({
      inputName: value
    })
  }
  serach() {
    var string = this.state.inputName.split(" ")
    if (this.state.inputName !== '' && string.length === 2) {
      UserService.getNameTeacher(string[0], string[1]).then((result) => {
        this.setState({ data: result, AddAlert: false })
        this.loadDataIntoTable()
        this.props.setGroup()

      })

    } else {
      this.errorModal.showModal('รายชื่ออาจารย์ไม่ต้องเงือนไข')
    }
  }
  loadDataIntoTable() {
    if (!this.state.AddAlert) {
      if (this.state.data.length !== 0) {
        var DataObj = []
        for (var i = 0; i < this.state.data.length; i++) {
          DataObj[i] = <TeacherName
            selectItem={(e) => { this.selectItem(e) }}
            key={i}
            itemData={this.state.data[i]}
            itemIndex={i}
          />
        }
        return DataObj
      } else {
        var DataObj = []
        return DataObj
      }
    } else {
      var DataObj = []
      return DataObj
    }
  }
  loadDataIntoTableTeacherSelect() {
    if (this.state.TeacherSelect.length !== 0) {
      var DataObj = []
      for (var i = 0; i < this.state.TeacherSelect.length; i++) {
        DataObj[i] = <TeacherSelect
          removeTeacher={(data) => this.removeTeacher(data)}
          key={i}
          itemData={this.state.TeacherSelect[i]}
          itemIndex={i}
        />
      }
      return DataObj
    } else {
      var DataObj = []
      return DataObj
    }
  }
  setTeacher() {
    
      if (this.state.dataRow.length !== 0) {
        let booleanCheckInsert = true
        let courseCheck = true
        try {
          this.state.dataRow.courses.length
        } catch (ex) {
          courseCheck = false
        }
        if (courseCheck) {
          for (let i = 0; i < this.state.dataRow.courses.length; i++) {
            let id = this.state.dataRow.courses[i].subjectId
            if (Number.parseInt(this.props.addNameStudent.state.groups) === this.state.dataRow.courses[i].group && id === this.props.subjectId) {
              this.errorModal.showModal(`อาจารย์ลงทะเบียนวิชา ${this.props.subjectId} กลุ่มที่ ${this.props.addNameStudent.state.groups} แล้ว`)
              booleanCheckInsert = false
            }
          }
        }
        for (let i = 0; i < this.state.TeacherSelect.length; i++) {
  
          if (this.state.dataRow.username === this.state.TeacherSelect[i].username && booleanCheckInsert) {
            this.errorModal.showModal('รายชื่ออาจารย์ซ้ำ')
            booleanCheckInsert = false
            break
          }
        }
        if (booleanCheckInsert) {
  
          this.setTeacherSelect()
          this.props.setTeacher(this.state.dataRow)
          this.setState({ AddAlert: true, dataRow: [] })
        }
      } else {
        this.errorModal.showModal('กรุณาเลือกรายชื่ออาจารย์ก่อน')
      }
  }
  removeTeacher(name) {
    this.deleteTeacher(name)
    this.props.deleteTeacher(name)
  }
  render() {
    return <div style={{ padding: 30 }}>
      <div >
        <div style={{ padding: 10 }} >
          ชื่อครู
                    &nbsp; <input className="input is-userId-width" type="text" id="Teacherid" name="searchInput" onChange={this.handleInputChange} value={this.state.inputName} />
          <button className="button is-oros is-round is-free-size" type="button" onClick={() => this.serach()} style={{ width: '40px', height: '40px' }}><i className="fa fa-search height50"></i></button>
        </div>
        <div className="add-div">
          <table className="user-table" id="courseTable" >
            <thead>
              <tr className="is-header">
                <th>รหัสผู้ใช้</th>
                <th>ชื่อ</th>
              </tr>
            </thead>
            <tbody>
              {this.loadDataIntoTable()}
            </tbody>
          </table>
        </div>
      </div>
      <div className='columns'>
        <div className='column is-5'></div>
        <div>
          <button className="button is-oros is-round is-pulled-right" onClick={() => this.setTeacher()} >เพิ่ม</button>
        </div>
      </div>
      <div className='add-div'>
        <table className="user-table" id="courseTable2" >
          <thead>
            <tr className="is-header">
              <th>รหัสผู้ใช้</th>
              <th>ชื่อ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {this.loadDataIntoTableTeacherSelect()}
          </tbody>
        </table>
      </div>
      <ErrorModal
        ref={instance => { this.errorModal = instance }}
      />
      <InfoModal
        ref={instance => { this.infoModal = instance }}
      />
    </div>

  }
}
class TeacherName extends Component {
  constructor(props) {
    super(props)
    this.renderItemByType = this.renderItemByType.bind(this)
  }
  renderItemByType() {
    return (
      <tr className="course-table-item"
        onClick={(e) => { this.props.selectItem(e) }}
        index={this.props.itemIndex}
      >
        <td >{this.props.itemData.username}</td>
        <td >{this.props.itemData.firstName} {this.props.itemData.lastName}</td>
      </tr>
    )
  }
  render() {
    return (this.renderItemByType())
  }
}
class TeacherSelect extends Component {
  constructor(props) {
    super(props)
    this.renderItemByType = this.renderItemByType.bind(this)
  }
  delete(value) {
    value.props.removeTeacher(value.props.itemData.username)
  }
  renderItemByType() {
    return (
      <tr className="course-table-item"
        index={this.props.itemIndex}
      >
        <td >{this.props.itemData.username}</td>
        <td >{this.props.itemData.firstName} {this.props.itemData.lastName}</td>
        <td ><button style={{ cursor: 'pointer' }} className='button is-oros is-round is-pulled-right' onClick={() => this.delete(this)}>ลบ</button></td>
      </tr>
    )
  }
  render() {
    return (this.renderItemByType())
  }
}
export default AddNameTeacher