/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/ManageRoom.css'
import '../../StyleSheets/userManage.css'

import Modal from '../Utilities/Modal'
import RoomTable from './RoomTable'
import RoomPopUp from './RoomPopUp'

class ManageRoom extends Component {
  
  _isMounted = false;

  constructor (props) {
    super(props)

    this.state = {
      selectedBuildingname: '',
      idSelectedBuilding: 'BuildingSelect',
      searchInput: '',
      isDataLoading: false,
      SelectedScore: false,
      SelectedSubject: false
    }

    this._isMounted = true
    
    this.handleSelectBuilding = this.handleSelectBuilding.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearchButton = this.handleSearchButton.bind(this)
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
  
  setSelectedBuilding (name) {
    this.setState({
      selectedBuildingname: name
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
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                  </div>
                </div>

              </div>
            </div>
            <br></br>
            <div>
            </div>
            <br></br>
            <div className="table-div columns is-stay-top">
              <div className="column is-8 user-column-table">
              <RoomTable
                  ref={instance => { this.roomTable = instance }}
                  showManageModal={() => { this.managePopup.showManageModal('view') }}
                  idSelectedBuilding={this.state.idSelectedBuilding}
                  SelectedBuildingname={this.state.selectedBuildingname}
                  setSelectedBuilding={this.setSelectedBuilding}
                />

              </div>
            </div>
          </div>
        </div>
        

      </div>
    )
  }
}

export default ManageRoom
