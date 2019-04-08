/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/ManageRoom.css'
import '../../StyleSheets/userManage.css'

import Modal from '../Utilities/Modal'
import RoomTable from './RoomTable'
import RoomPopUp from './RoomPopUp'
import DeleteRoomPopup from './DeleteRoomPopup'

class ManageRoom extends Component {
  
  _isMounted = false;

  constructor (props) {
    super(props)

    this.state = {
      selectedBuildingname: '',
      idSelectedBuilding: 'BuildingSelect',
      searchInput: '',
      isDataLoading: false,
      SelectedBuilding: false,
      SelectedRoom: false
    }

    this._isMounted = true
    
    this.handleSelectBuilding = this.handleSelectBuilding.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearchButton = this.handleSearchButton.bind(this)
    this.setSelectedBuildingname = this.setSelectedBuildingname.bind(this)
    this.setSelectedRoom = this.setSelectedRoom.bind(this)
    this.setDataLoadingStatus = this.setDataLoadingStatus.bind(this)
    this.setSelectedBuilding = this.setSelectedBuilding.bind(this)
  }

  componentDidMount () {
    this.roomTable.loadData()
  }

  handleSearchButton () {
    this.roomTable.loadDataByRoomID(this.state.selectedBuildingname,this.state.searchInput)
  }

 handleSelectBuilding (e) {
    const target = e.target
    const name = target.options[target.selectedIndex].value

    this.setState({
      selectedBuildingname: name
    })

    this.roomTable.loadDataByRoomID(name,this.state.searchInput)
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  setDataLoadingStatus (status) {
    this.setState({
      isDataLoading: status
    })
  }
  
  setSelectedBuildingname (name) {
    this.setState({
      selectedBuildingname: name
    })
  }

  setSelectedRoom (room) {
    this.setState({
      SelectedRoom: room
    })
  }

  setSelectedBuilding (room) {
    this.setState({
      SelectedBuilding: room
    })
  }

  render () {
    return (
      <div className="subcontent-main-div score-exam">
        <div className="score-exam-box box with-title is-round">
          <div className="box-title is-violet">
          การจัดการห้อง
          </div>
          <div className="box-content">
            <div className={`columns ${this.state.isDataLoading ? 'disabled' : ''}`}>
              <div className="columns">
                <div className="column is-8">
                  <div className="input-with-text">
                    <label className="label">ตึก : </label>
                    <select className="exam-score-select-box"
                      id="BuildingSelect"
                      onChange={this.handleSelectBuilding} 
                    >
                    </select>
                  </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="input-with-text">
                    <label className="label">รหัสห้อง : </label>
                    <input className="input is-userId-width" type="text" id="subjectId" name="searchInput" onChange={this.handleInputChange} />
                  </div>
                  <div className="input-with-text">
                    <button type="submit"><i className="fa fa-search height50" onClick={this.handleSearchButton}>
                    </i></button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="button is-oros is-round is-pulled-right" onClick={() => { this.deleteRoomPopupModal.showModal() }}>เพิ่มห้อง</button>
                  </div>
                </div>

              </div>
            </div>
            <br></br>
            <div>
            </div>
            <div className="table-div columns is-stay-top">
              <div className="column is-8 user-column-table">
              <RoomTable
                  ref={instance => { this.roomTable = instance }}
                  showDeleteModal={() => { this.deleteRoomPopupModal.showModal() }}
                  idSelectedBuilding={this.state.idSelectedBuilding}
                  SelectedBuildingname={this.state.selectedBuildingname}
                  setSelectedBuildingname={this.setSelectedBuildingname}
                  setSelectedBuilding={this.setSelectedBuilding}
                  setSelectedRoom={this.setSelectedRoom}
                />

              </div>
            </div>
          </div>
        </div>
        <Modal ref={instance => { this.deleteRoomPopupModal = instance }} content={
            <DeleteRoomPopup
              ref={instance => { this.deleteRoomPopup = instance }}
              closeModal={() => {
                this.deleteRoomPopupModal.closeModal()
              }}
              showModal={() => {
                this.deleteRoomPopupModal.showModal()
              }}
              deleteSelectedItem={() => { this.roomTable.deleteSelectedItem() }}
              reloadTable={() => { this.roomTable.loadDataByRoomID(this.state.selectedBuildingname,this.state.searchInput) }}
              selectedBuilding={this.state.SelectedBuilding}
              selectedRoom={this.state.SelectedRoom}
              setSelectedBuilding={this.setSelectedBuilding}
              isDataLoading={this.state.isDataLoading}
              setDataLoadingStatus={this.setDataLoadingStatus}
            />
          }
          />
      </div>

    )
  }
}

export default ManageRoom
