/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import ClientService from '../Utilities/ClientService'

// Components
import Modal from '../Utilities/Modal'
import '../../StyleSheets/userManage.css'
import ManageUserPopUp from './ManageUserPopup'
import StudentExcelPopUp from './StudentExcelPopup'
import UserTable from './UserTable'

const ServiceObj = new ClientService()

class UserManage extends Component {
  _isMounted = false;

  constructor (props) {
    super(props)

    this.state = {
      selectedType: 'student',
      selectedUser: false,
      searchInput: '',
      facultys: [],
      isDataLoading: false
    }

    this._isMounted = true

    this.handleSelectType = this.handleSelectType.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearchButton = this.handleSearchButton.bind(this)
    this.setSelectedUser = this.setSelectedUser.bind(this)
    this.setDataLoadingStatus = this.setDataLoadingStatus.bind(this)
  }

<<<<<<< HEAD
  handleSelectType (e) {
=======
  handleSelectType(e) {
>>>>>>> f2d21b013f8e896cf0f37b526e48e84f7a8782e3
    const target = e.target
    const name = target.options[target.selectedIndex].value

    this.setState({
      selectedType: name
    })
    this.userTable.loadDataByTypeAndUsername(name, this.state.searchInput)
  }

<<<<<<< HEAD
  componentDidMount () {
=======
  componentDidMount() {
>>>>>>> f2d21b013f8e896cf0f37b526e48e84f7a8782e3
    this.userTable.loadDataByTypeAndUsername(this.state.selectedType, this.state.searchInput)
    this.loadFacultyData()
  }

<<<<<<< HEAD
  componentWillUnmount () {
    this._isMounted = false
  }

  handleInputChange (e) {
=======
  componentWillUnmount() {
    this._isMounted = false
  }

  handleInputChange(e) {
>>>>>>> f2d21b013f8e896cf0f37b526e48e84f7a8782e3
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

<<<<<<< HEAD
  setSelectedUser (user) {
=======
  setSelectedUser(user) {
>>>>>>> f2d21b013f8e896cf0f37b526e48e84f7a8782e3
    this.setState({
      selectedUser: user
    })
  }

<<<<<<< HEAD
  setDataLoadingStatus (status) {
=======
  setDataLoadingStatus(status) {
>>>>>>> f2d21b013f8e896cf0f37b526e48e84f7a8782e3
    this.setState({
      isDataLoading: status
    })
  }

<<<<<<< HEAD
  handleSearchButton () {
    this.userTable.loadDataByTypeAndUsername(this.state.selectedType, this.state.searchInput)
  }

  loadFacultyData () {
=======
  handleSearchButton() {
    this.userTable.loadDataByTypeAndUsername(this.state.selectedType, this.state.searchInput)
  }

  loadFacultyData() {
>>>>>>> f2d21b013f8e896cf0f37b526e48e84f7a8782e3
    if (!this.state.isDataLoading) {
      this.setDataLoadingStatus(true)
      ServiceObj.getAllFaculty().then((data) => {
        if (this._isMounted) {
          this.setDataLoadingStatus(false)
          this.setState({
            facultys: data
          })
        }
      })
    }
  }

<<<<<<< HEAD
  render () {
=======
  render() {
>>>>>>> f2d21b013f8e896cf0f37b526e48e84f7a8782e3
    return (
      <div className="subcontent-main-div user-manage">
        <div className="user-manage-box box with-title is-round">
          <div className="box-title is-violet">
            จัดการผู้ใช้
<<<<<<< HEAD
          </div>
=======
            </div>
>>>>>>> f2d21b013f8e896cf0f37b526e48e84f7a8782e3
          <div className="box-content">
            <div className={`columns ${this.state.isDataLoading ? 'disabled' : ''}`}>
              <div className="column is-6">
                <div className="input-with-text">
                  <label className="label">ผู้ใช้ : </label>
<<<<<<< HEAD
                  <select className="select user-mange-select-box" onChange={this.handleSelectType} value={this.state.selectedType}>
=======
                  <select className="user-mange-select-box" onChange={this.handleSelectType} value={this.state.selectedType}>
>>>>>>> f2d21b013f8e896cf0f37b526e48e84f7a8782e3
                    <option value="student">นิสิต</option>
                    <option value="professor">อาจารย์</option>
                    <option value="staff">เจ้าหน้าที่</option>
                  </select>
                </div>
                <div className="input-with-text">
                  <label className="label">รหัสประจำตัว : </label>
                  <input className="input is-userId-width" type="text" id="userId" name="searchInput" onChange={this.handleInputChange} />
                </div>
                <div className="input-with-text">
                  <button type="submit"><i className="fa fa-search height50" onClick={this.handleSearchButton}></i></button>
                </div>
              </div>
              <div className="column">
                <button className="button is-yentafo is-round is-free-size is-pulled-right" onClick={() => { this.studentExcelPopup.showInsertExcelModal() }}>นำเข้าผู้ใช้โดย Excel</button>
                <button className="button is-oros is-round is-pulled-right" onClick={() => { this.managePopup.showManageModal('insert') }}>เพิ่มผู้ใช้</button>
              </div>
<<<<<<< HEAD
            </div>
            <div className="user-table-div">
              <UserTable
                ref={instance => { this.userTable = instance }}
                showManageModal={() => { this.managePopup.showManageModal('view') }}
                selectedType={this.state.selectedType}
                setSelectedUser={this.setSelectedUser}
                facultys={this.state.facultys}
                isDataLoading={this.state.isDataLoading}
                setDataLoadingStatus={this.setDataLoadingStatus}
              />
            </div>
=======
            </div>
            <div>
              <span className="user-tab-is-15"></span>
            </div>
            <UserTable
              ref={instance => { this.userTable = instance }}
              showManageModal={() => { this.managePopup.showManageModal('view') }}
              selectedType={this.state.selectedType}
              setSelectedUser={this.setSelectedUser}
              facultys={this.state.facultys}
              isDataLoading={this.state.isDataLoading}
              setDataLoadingStatus={this.setDataLoadingStatus}
            />
>>>>>>> f2d21b013f8e896cf0f37b526e48e84f7a8782e3
          </div>
        </div>
        <Modal ref={instance => { this.manageUserModal = instance }} content={
          <ManageUserPopUp
            ref={instance => { this.managePopup = instance }}
            closeModal={() => {
              this.manageUserModal.closeModal()
            }}
            showModal={() => {
              this.manageUserModal.showModal()
            }}
            deleteSelectedItem={() => { this.userTable.deleteSelectedItem() }}
            editSelectedItem={(data) => { this.userTable.editSelectedItem(data) }}
            addItem={(data) => { this.userTable.addItem(data) }}
            selectedType={this.state.selectedType}
            selectedUser={this.state.selectedUser}
            facultys={this.state.facultys}
            isDataLoading={this.state.isDataLoading}
            setDataLoadingStatus={this.setDataLoadingStatus}
          />
        }
        />
<<<<<<< HEAD
        <Modal ref={instance => { this.studentExcelModal = instance }} content={
=======
       <Modal ref={instance => { this.studentExcelModal = instance }} content={
>>>>>>> f2d21b013f8e896cf0f37b526e48e84f7a8782e3
          <StudentExcelPopUp
            ref={instance => { this.studentExcelPopup = instance }}
            closeModal={() => {
              this.studentExcelModal.closeModal()
            }}
            showModal={() => {
              this.studentExcelModal.showModal()
            }}
          />
        }
        />
      </div>
    )
  }
}

export default UserManage
