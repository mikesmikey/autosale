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
      isDataLoading: false,
      page: 1,
      maxPage: 1
    }

    this._isMounted = true

    this.handleSelectType = this.handleSelectType.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearchButton = this.handleSearchButton.bind(this)
    this.setSelectedUser = this.setSelectedUser.bind(this)
    this.setDataLoadingStatus = this.setDataLoadingStatus.bind(this)
  }

  handleSelectType (e) {
    const target = e.target
    const name = target.options[target.selectedIndex].value

    this.setState({
      selectedType: name,
      page: 1,
      maxPage: 1
    })
    this.userTable.loadDataByTypeAndUsername(name, this.state.searchInput)
  }

  componentDidMount () {
    this.userTable.loadDataByTypeAndUsername(this.state.selectedType, this.state.searchInput)
    this.loadFacultyData()
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  componentDidUpdate (prevProps, prevStates) {
    if (this.state.page !== prevStates.page) {
      this.userTable.loadDataByTypeAndUsername(this.state.selectedType, this.state.searchInput, this.state.page === 1 ? 0 : (this.state.page - 1) * 50)
    }
    if (this.state.isDataLoading !== prevStates.isDataLoading) {
      this.calculateMaxPage()
    }
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  setSelectedUser (user) {
    this.setState({
      selectedUser: user
    })
  }

  setDataLoadingStatus (status) {
    this.setState({
      isDataLoading: status
    })
  }

  handleSearchButton () {
    this.setState({
      page: 1,
      maxPage: 1
    })
    this.userTable.loadDataByTypeAndUsername(this.state.selectedType, this.state.searchInput, this.state.page === 1 ? 0 : (this.state.page - 1) * 50)
  }

  loadFacultyData () {
    if (!this.state.isDataLoading) {
      ServiceObj.getAllFaculty().then((data) => {
        if (this._isMounted) {
          this.setState({
            facultys: data
          })
        }
      })
    }
  }

  calculateMaxPage () {
    ServiceObj.countUserByTypeAndUsername(this.state.selectedType, this.state.searchInput).then((result) => {
      this.setState({
        maxPage: Math.ceil(result / 50)
      })
    })
  }

  handleInceasePageStyle () {
    if (this.state.page === this.state.maxPage) {
      return 'disabled'
    }
  }

  handleDeceasePageStyle () {
    if (this.state.page === 1) {
      return 'disabled'
    }
  }

  inceasePage () {
    const newPage = this.state.page === this.state.maxPage || this.state.page + 1
    this.setState({
      page: newPage
    })
  }

  deceasePage () {
    const newPage = this.state.page === 1 || this.state.page - 1
    this.setState({
      page: newPage
    })
  }

  render () {
    return (
      <div className="subcontent-main-div user-manage">
        <div className="user-manage-box box with-title is-round">
          <div className="box-title is-violet">
            จัดการผู้ใช้
          </div>
          <div className="box-content">
            <div className={`columns ${this.state.isDataLoading ? 'disabled' : ''}`}>
              <div className="column is-6">
                <div className="input-with-text">
                  <label className="label">ผู้ใช้ : </label>
                  <select className="select user-mange-select-box" onChange={this.handleSelectType} value={this.state.selectedType}>
                    <option value="student">นิสิต</option>
                    <option value="professor">อาจารย์</option>
                    <option value="staff">เจ้าหน้าที่</option>
                  </select>
                </div>
                <div className="input-with-text">
                  <label className="label">รหัสประจำตัว : </label>
                  <input className="input is-userId-width" type="text" id="userId" name="searchInput" onChange={this.handleInputChange} />
                </div>
                <button className="button is-oros is-round is-free-size" type="button" onClick={this.handleSearchButton} style={{ width: '40px', height: '40px' }}><i className="fa fa-search height50"></i></button>
              </div>
              <div className="column">
                <button className="button is-yentafo is-round is-free-size is-pulled-right" onClick={() => { this.studentExcelPopup.showInsertExcelModal() }}>นำเข้าผู้ใช้โดย Excel</button>
                <button className="button is-oros is-round is-pulled-right" onClick={() => { this.managePopup.showManageModal('insert') }}>เพิ่มผู้ใช้</button>
              </div>
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
            <div className="paging-button-area">
              <button
                className={`button is-oros is-round ${this.handleDeceasePageStyle()}`}
                style={{ width: '40px' }}
                onClick={() => { this.deceasePage() }}
              >
                <i className="fas fa-angle-left"></i>
              </button>
              <div style={{ width: '100px' }}>
                <p>{this.state.page}/{this.state.maxPage}</p>
              </div>
              <button
                className={`button is-oros is-round ${this.handleInceasePageStyle()}`}
                style={{ width: '40px' }}
                onClick={() => { this.inceasePage() }}
              >
                <i className="fas fa-angle-right"></i>
              </button>
            </div>
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
        <Modal ref={instance => { this.studentExcelModal = instance }} content={
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
