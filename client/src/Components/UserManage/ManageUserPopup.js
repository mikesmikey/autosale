// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'

import ClientService from '../Utilities/ClientService'

const CServiceObj = new ClientService()

class ManageUserPopUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      popupStatus: 'view',
      fnameInput: '',
      snameInput: '',
      usernameInput: '',
      yearIndex: 0,
      facultyIndex: 1,
      branchIndex: 1,
      standingInput: '',
      examinerRadio: false
    }

    this.changeStatus = this.changeStatus.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.loadUserInput = this.loadUserInput.bind(this)
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  handleRadioChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value === 'true'
    })
  }

  loadUserInput () {
    this.setState({
      fnameInput: this.props.selectedUser.firstName,
      snameInput: this.props.selectedUser.lastName,
      usernameInput: this.props.selectedUser.username,
      yearIndex: this.props.selectedUser.year,
      facultyIndex: this.props.selectedUser.facultyId,
      branchIndex: this.props.selectedUser.branchId,
      examinerRadio: this.props.selectedUser.isExaminer
    })

    if (this.props.selectedUser.standing) {
      this.setState({
        standingInput: this.props.selectedUser.standing
      })
    }
  }

  clearInput () {
    this.setState({
      fnameInput: '',
      snameInput: '',
      usernameInput: '',
      yearIndex: 0,
      facultyIndex: 1,
      branchIndex: 1,
      standingInput: ''
    })
  }

  changeStatus (status) {
    this.setState({
      popupStatus: status
    })
  }

  showManageModal (status) {
    if (status === 'insert') {
      this.clearInput()
    } else {
      this.loadUserInput()
    }
    this.changeStatus(status)

    this.props.showModal()
  }

  defindInputClassByType () {
    const popupInputs = document.querySelectorAll('.is-user-popUp .input, .is-user-popUp select')

    popupInputs.forEach((element) => {
      if (this.state.popupStatus === 'edit' || this.state.popupStatus === 'insert') {
        element.classList.remove('disabled')
      } else if (this.state.popupStatus === 'view') {
        element.classList.add('disabled')
      }
    })
  }

  componentDidUpdate () {
    this.defindInputClassByType()
  }

  getManageTitleByType () {
    const compareSelectedTypeTable = {
      'student': 'นิสิต',
      'professor': 'อาจารย์',
      'staff': 'เจ้าหน้าที่'
    }

    const compareStatusTable = {
      'view': `ข้อมูล${compareSelectedTypeTable[this.props.selectedType]}`,
      'edit': `แก้ไขข้อมูล${compareSelectedTypeTable[this.props.selectedType]}`,
      'insert': `เพิ่มข้อมูล${compareSelectedTypeTable[this.props.selectedType]}`
    }

    return compareStatusTable[this.state.popupStatus]
  }

  renderFacultyComponent () {
    return this.props.facultys.map((item) => {
      return <option key={item.facultyId} value={item.facultyId}>{item.facultyName}</option>
    })
  }

  renderFacultyBranchComponent () {
    const faculty = this.props.facultys.find((faculty) => {
      return faculty.facultyId === this.state.facultyIndex
    })
    if (!faculty) return null
    var returnArr = []
    for (var i = 0; i < faculty.branches.length; i++) {
      returnArr[i] = <option key={faculty.branches[i].branchId} value={faculty.branches[i].branchId}>{faculty.branches[i].branchName}</option>
    }
    return returnArr
  }

  deleteButtonHandle () {
    this.props.setDataLoadingStatus(true)
    CServiceObj.deleteUser(this.props.selectedUser.username).then((result) => {
      if (result) {
        this.props.deleteSelectedItem()
        this.props.closeModal()
      } else {
        alert('ลบไม่สำเร็จ!')
      }
      this.props.setDataLoadingStatus(false)
    })
  }

  currentFormObject (mode) {
    var newData = mode === 'edit' ? this.props.selectedUser : mode === 'add' ? {} : undefined
    newData.firstName = this.state.fnameInput
    newData.lastName = this.state.snameInput
    newData.username = this.state.usernameInput
    newData.typeOfUser = this.props.selectedType
    newData.isExaminer = this.state.examinerRadio

    if (newData.typeOfUser === 'student') {
      newData.facultyId = this.state.facultyIndex
      newData.branchId = this.state.branchIndex
      newData.year = Number.parseInt(this.state.yearIndex, 10)
    }
    if (newData.typeOfUser === 'professor') {
      newData.facultyId = this.state.facultyIndex
      newData.branchId = this.state.branchIndex
    }
    if (newData.typeOfUser === 'staff') {
      newData.standing = this.state.standingInput
    }
    return newData
  }

  editButtonHandle () {
    const userObj = CServiceObj.createUserObjectByType(this.currentFormObject('edit'))

    if (!CServiceObj.userObjFormCheck(userObj)) { alert('แก้ไขไม่สำเร็จ!'); return }

    this.props.setDataLoadingStatus(true)

    CServiceObj.editUser(userObj.getUserObjectData()).then((result) => {
      if (result) {
        this.props.editSelectedItem(userObj.getUserObjectData())
        this.changeStatus('view')
      } else {
        alert('แก้ไขไม่สำเร็จ!')
      }
      this.props.setDataLoadingStatus(false)
    })
  }

  addButtonHandle () {
    const userObj = CServiceObj.createUserObjectByType(this.currentFormObject('add'))

    if (!CServiceObj.userObjFormCheck(userObj)) { alert('เพิ่มไม่สำเร็จ!'); return }

    this.props.setDataLoadingStatus(true)

    CServiceObj.addUser(userObj.getUserObjectData()).then((result) => {
      if (result) {
        this.props.addItem(userObj.getUserObjectData())
        this.props.closeModal()
      } else {
        alert('เพิ่มไม่สำเร็จ!')
      }
      this.props.setDataLoadingStatus(false)
    })
  }

  render () {
    return (
      <div className="box is-user-popUp" style={{ width: '500px' }}>
        <div>
          <h1 align="center">{this.getManageTitleByType()}</h1>

          <div className="columns input-div">
            <div className="column is-2">
              <label className="label">ชื่อ</label>
            </div>
            <div className="column">
              <input
                className="input is-full-width"
                type="text" id="popAddUserName"
                value={this.state.fnameInput}
                name="fnameInput"
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="columns input-div">
            <div className="column is-2">
              <label className="label">นามสกุล</label>
            </div>
            <div className="column">
              <input
                className="input is-full-width"
                type="text"
                id="popAddLastName"
                value={this.state.snameInput}
                name="snameInput"
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="columns input-div">
            <div className="column is-2">
              <label className="label">รหัสประจำตัว</label>
            </div>
            <div className="column">
              <input
                className="input is-full-width"
                type="text"
                id="popAddUserId"
                value={this.state.usernameInput}
                name="usernameInput"
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className={`columns input-div ${this.props.selectedType === 'student' || this.props.selectedType === 'professor' ? '' : 'is-hiding'}`}>
            <div className="column is-2">
              <label className="label">คณะ</label>
            </div>
            <div className="column">
              <select
                className="select user-mange-select-box-popUp is-full-width"
                type="text"
                id="popAddUserFaculty"
                name="facultyIndex"
                onChange={this.handleInputChange}
                value={this.state.facultyIndex}
              >
                {this.renderFacultyComponent()}
              </select>
            </div>
          </div>

          <div className={`columns input-div ${this.props.selectedType === 'student' || this.props.selectedType === 'professor' ? '' : 'is-hiding'}`}>
            <div className="column is-2">
              <label className="label">สาขา</label>
            </div>
            <div className="column">
              <select
                className="select user-mange-select-box-popUp is-full-width"
                type="text"
                id="popAddUserBranch"
                name="branchIndex"
                onChange={this.handleInputChange}
                value={this.state.branchIndex}
              >
                {this.renderFacultyBranchComponent()}
              </select>
            </div>
          </div>

          <div className={`columns input-div ${this.props.selectedType === 'student' ? '' : 'is-hiding'}`}>
            <div className="column is-2">
              <label className="label">ชั้นปี</label>
            </div>
            <div className="column">
              <select
                className="select user-mange-select-box-popUp is-full-width"
                id="popAddYear"
                name="yearIndex"
                onChange={this.handleInputChange}
                value={this.state.yearIndex}
              >
                <option value="0"></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
          <div className={`columns input-div ${this.props.selectedType === 'staff' ? '' : 'is-hiding'}`}>
            <div className="column is-2">
              <label className="label">ตำแหน่ง</label>
            </div>
            <div className="column">
              <input
                className="input is-full-width"
                type="text"
                id="popAddPosition"
                name="standingInput"
                value={this.state.standingInput}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className={`columns input-div`}>
            <div className="column is-2">
              <label className="label">เป็นผู้คุมสอบ</label>
            </div>
            <div className="column">
              <input
                className="input"
                type="radio"
                name="examinerRadio"
                value={true}
                checked={this.state.examinerRadio === true}
                onChange={this.handleRadioChange}
              />
              <label className="label">ใช่</label>
              <input
                className="input"
                type="radio"
                name="examinerRadio"
                value={false}
                checked={this.state.examinerRadio === false}
                onChange={this.handleRadioChange}
              />
              <label className="label">ไม่ใช่</label>
            </div>
          </div>
          <div className={`columns ${this.props.isDataLoading ? 'disabled' : ''}`} style={{ marginTop: '20px' }}>
            {this.state.popupStatus === 'view'
              ? <div className="column is-7" style={{ textAlign: 'center' }}>
                <button className="button is-oros is-round" onClick={() => { this.deleteButtonHandle() }}>ลบข้อมูล</button>
                <button className="button is-orange is-round" onClick={() => { this.changeStatus('edit') }}>แก้ไขข้อมูล</button>
                <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ยกเลิก</button>
              </div>
              : null
            }

            {this.state.popupStatus === 'edit'
              ? <div className="column is-7" style={{ textAlign: 'center' }}>
                <button className="button is-orange is-round" onClick={() => { this.editButtonHandle() }}>บันทึก</button>
                <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ยกเลิก</button>
              </div>
              : null
            }

            {this.state.popupStatus === 'insert'
              ? <div className="column is-7" style={{ textAlign: 'center' }}>
                <button className="button is-oros is-round" onClick={() => { this.addButtonHandle() }}>เพิ่มข้อมูล</button>
                <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ยกเลิก</button>
              </div>
              : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ManageUserPopUp
