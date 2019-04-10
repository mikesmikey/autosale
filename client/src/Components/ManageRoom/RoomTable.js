/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import ClientService from '../Utilities/ClientService'
import '../../StyleSheets/RoomTable.css'

const ServiceObj = new ClientService()

class RoomTable extends Component {
  _isMounted = false;

  constructor (props) {
    super(props)

    this.state = {
      data: [],
      Building: [],
      selectedBuildingname: '',
      selectedBuilding: 'BuildingSelect',
      Input: '',
      isDataLoading: false,
      SelectedScore: false,
      SelectedSubject: false
    }

    this._isMounted = true
    this.BuildingAll = []
    this.check = 0
    this.checkK = 0

    this.loadDataIntoTable = this.loadDataIntoTable.bind(this)
    this.loadDataByRoomID = this.loadDataByRoomID.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  renderTableHead () {
    return (
      <tr className="is-header">
        <th>รหัสห้อง</th>
        <th >ชั้น</th>
        <th>ชนิดห้อง</th>
        <th >จำนวนนิสิต</th>
      </tr>
    )
  }

  selectItem (e) {
    const parent = e.target.parentElement
    if (parent.classList.contains('score-table-item')) {
      if (!parent.classList.contains('is-active')) {
        if (this.state.selectedRow != null) {
          this.state.selectedRow.classList.remove('is-active')
        }
        parent.classList.add('is-active')
        this.setState({
          selectedRow: parent
        })

        for (var i = 0; i < this.state.data.length; i++) {
          if (this.state.data[i].building_name == this.props.SelectedBuildingname) {
            this.props.setSelectedBuilding(this.state.data[i])
            this.props.setSelectedRoom(this.state.data[i].Rooms[parent.getAttribute('index')])
          }
        }
      }
    }
  }

  inspectItem (e) {
    const parent = e.target.parentElement
    if (parent.classList.contains('room-table-item')) {
      this.props.showDeleteModal()

      for (var i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i].building_name == this.props.SelectedBuildingname) {
          this.props.setSelectedBuilding(this.state.data[i])
          this.props.setSelectedRoom(this.state.data[i].Rooms[parent.getAttribute('index')])
        }
      }
    }
  }

  deleteSelectedItem () {
    const index = Number.parseInt(this.state.selectedRow.getAttribute('index'), 10)
    var arr = this.state.data
    arr.splice(index, 1)
    this.setState({
      data: arr
    })
  }

  dataMainUpdate () {
    ServiceObj.getAllBuilding().then((usersData) => {
      if (this._isMounted) {
        this.props.setdataMain(usersData)
      }
    })
  }

  loadData () {
    ServiceObj.getAllBuilding().then((usersData) => {
      if (this._isMounted) {
        // this.props.setDataLoadingStatus(false)
        this.setState({ data: usersData })
        this.props.setdataMain(usersData)
        // console.log(this.state.data)
      }
    })
  }

  loadDataByRoomID (buildingname, room) {
    ServiceObj.getAllBuildingByRoom(buildingname, room).then((usersData) => {
      if (this._isMounted) {
        // this.props.setDataLoadingStatus(false)
        this.setState({ data: usersData })
        this.setState({ Input: room })
        // console.log(this.state.data)
      }
    })
  }

  loadDataIntoTable () {
    var returnData = []
    var select = document.getElementById(this.props.idSelectedBuilding)
    for (var i = 0; i < this.state.data.length; i++) {
      var el = document.createElement('option')
      el.value = this.state.data[i].building_name
      el.textContent = this.state.data[i].building_name
      let num = 0
      if (this.BuildingAll.length == 0) {
        this.props.setSelectedBuildingname(this.state.data[i].building_name)
        this.props.setBuildingPopUp(this.state.data[i].building_name)
      }
      for (var z = 0; z < this.BuildingAll.length; z++) {
        if (this.BuildingAll[z] != this.state.data[i].building_name) {
          num++
        }
      }
      if (num == this.BuildingAll.length) {
        select.appendChild(el)
        this.BuildingAll.push(this.state.data[i].building_name)
        this.props.buildingAll.push(this.state.data[i].building_name)
      }

      if (this.state.data[i].building_name == this.props.SelectedBuildingname) {
        // this.props.setSelectedRoomUpdate(this.state.data[i])
        for (var j = 0; j < this.state.data[i].Rooms.length; j++) {
          this.check = 0
          this.checkK = 0
          for (var k = 0; k < this.state.data[i].Rooms[j].room.length; k++) {
            this.checkK = k
            for (var p = 0; p < this.state.Input.length; p++) {
              if (this.state.data[i].Rooms[j].room.charAt(this.checkK) == this.state.Input.charAt(p)) {
                this.check++
                this.checkK++
              } else{
                break
              }
            }
            if (this.check == this.state.Input.length) {
              returnData[j] = <RoomTableItem
                key={j}
                itemIndex={j}
                selectItem={(e) => { this.selectItem(e) }}
                inspectItem={(e) => { this.inspectItem(e) }}
                itemData={this.state.data[i].Rooms[j]}
              />
            }
          }
        }
      }
    }
    return returnData
  }

  render () {
    return (
      <table className="room-table" id="roomTable" >
        <thead>
          {this.renderTableHead()}
        </thead>
        <tbody>
          {this.loadDataIntoTable()}
        </tbody>
      </table>
    )
  }
}

class RoomTableItem extends Component {
  constructor (props) {
    super(props)
    this.renderItemByType = this.renderItemByType.bind(this)
  }

  renderItemByType () {
    return (
      <tr className="room-table-item"
        onClick={(e) => { this.props.selectItem(e) }}
        onDoubleClick={(e) => { this.props.inspectItem(e) }}
        index={this.props.itemIndex}
      >
        <td>{this.props.itemData.room}</td>
        <td>{this.props.itemData.floor}</td>
        <td>{this.props.itemData.roomType}</td>
        <td>{this.props.itemData.numberOfSeat}</td>
      </tr>
    )
  }

  render () {
    return (this.renderItemByType())
  }
}
export default RoomTable
