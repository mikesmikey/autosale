/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/ExamScoreSceen.css'
import CRoomSerive from '../../Services/RoomService'
import CSBuildingService from '../../Services/BuildingService'
import '../../StyleSheets/RoomTable.css'
import ErrorModal from '../Utilities/ErrorModal'
import InfoModal from '../Utilities/InfoModal'

const BuildingService = new CSBuildingService()
const RoomService = new CRoomSerive()

// eslint-disable-next-line react/require-render-return
class DeleteRoomPopup extends Component {
  _isMounted === false;

  constructor (props) {
    super(props)

    this.state = {
      building_name: '',
      short_name: '',
      floors: 0,
      Rooms: [],
      updateData: false
    }

    this._isMounted = true

    this.currentFormObject = this.currentFormObject.bind(this)
  }

  currentFormObject () {
    var newData = []
    var roomArray = []
    newData.building_name = this.props.selectedBuilding.building_name
    newData.short_name = this.props.selectedBuilding.short_name
    newData.floors = this.props.selectedBuilding.floors

    for (var i = 0; i < this.props.selectedBuilding.Rooms.length; i++) {
      if (this.props.selectedBuilding.Rooms[i].room !== this.props.selectedRoom.room) {
        roomArray.push(this.props.selectedBuilding.Rooms[i])
      }
    }

    newData.Rooms = roomArray
    return newData
  }

  deleteButtonHandle () {
    // console.log(this.props.selectedBuilding)
    // console.log(this.props.selectedRoom)

    const BuildingObj = BuildingService.createBuilding(this.currentFormObject())
    // console.log(BuildingObj)

    this.props.setDataLoadingStatus(true)

    RoomService.editRoom(BuildingObj.getUserObjectData()).then((result) => {
      if (result) {
        this.props.reloadTable()
        this.infoModal.showModal('ลบสำเร็จ!')
        this.props.closeModal()
      } else {
        this.errorModal.showModal('ลบไม่สำเร็จ!')
      }
      this.props.setDataLoadingStatus(false)
    })
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
