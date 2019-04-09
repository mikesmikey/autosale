/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/ManageRoom.css'

import ClientService from '../Utilities/ClientService'

const ServiceObj = new ClientService()

// eslint-disable-next-line react/require-render-return
class RoomPopUp extends Component {
  _isMounted = false;

  constructor (props) {
    super(props)

    this.state = {
      stringBuilding: '',
      stringFloor: '',
      stringType: 'Lecture',
      stringRoom: '',
      numberRoom: 0,
      stringRow: '',
      numberRow: 0,
      stringStudent: '',
      numberStudent: 0,
      NumberFloor: 0,
      isDataLoading: false,
      DataUpdate: false
    }

    this._isMounted = true
    this.buildingSelectPopUp = []
    this.floorPopUp = []
    this.PositionFloor = 0

    this.room = ''
    this.shortname = ''
    this.line = '-'
    this.floor = ''
    this.type = ''
    this.zero = '0'
    this.numRoom = ''
    this.numFloor = 1
    this.checkID = []
    this.repetitiveRoom = 0

    this.setFloorSelect = this.setFloorSelect.bind(this)
    this.setBSelect = this.setBSelect.bind(this)
    this.addButtonHandle = this.addButtonHandle.bind(this)
    this.addDataToPopUp = this.addDataToPopUp.bind(this)
    this.handleSelectBuilding = this.handleSelectBuilding.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.clearInput = this.clearInput.bind(this)
    this.currentFormObject = this.currentFormObject.bind(this)
  }

  addButtonHandle () {
    ServiceObj.getAllBuildingByRoom(this.state.stringBuilding, this.room).then((usersData) => {
      this.repetitiveRoom = usersData.length
      if (this.state.numberRow * this.state.numberStudent != 0
        && this.numRoom != 0 &&
        this.state.stringRoom != '' &&
        this.state.stringRow != '' &&
        this.state.stringStudent != '' &&
        this.repetitiveRoom == 0
      ) {
        const BuildingObj = ServiceObj.createBuilding(this.currentFormObject())
        // console.log(BuildingObj)

        this.props.setDataLoadingStatus(true)

        ServiceObj.editRoom(BuildingObj.getUserObjectData()).then((result) => {
          if (result) {
            this.props.reloadTable()
            this.props.closeModal()
          } else {
            alert('เพิ่มไม่สำเร็จ!')
          }
          this.props.setDataLoadingStatus(false)
        })
      }else {
        alert('เพิ่มไม่สำเร็จ!')
      }
    })
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })

    if (name == 'stringType') {
      if (value.toString() == 'Lecture') {
        this.type = 'C'
      } else{
        this.type = 'L'
      }
    }
    if (name == 'stringRoom') {
      this.numRoom = value.toString()
    }
    if (name == 'stringFloor') {
      this.numFloor = parseInt(value)
      this.floor = value.toString()
    }
    if (name == 'stringRow') {
      this.setState({
        numberRow: value
      })
    }
    if (name == 'stringStudent') {
      this.setState({
        numberStudent: value
      })
    }

    if (this.numRoom == '') {
      this.room = this.shortname + this.line + this.floor + this.type
    } else if (this.numRoom.length < 2) {
      this.room = this.shortname + this.line + this.floor + this.type + this.zero + this.numRoom
    }else {
      this.room = this.shortname + this.line + this.floor + this.type + this.numRoom
    }

    document.getElementById('roomSpan').innerHTML = this.room
  }

  clearInput () {
    this.setState({
      stringRoom: '',
      stringRow: '',
      stringStudent: ''
    })
    this.numRoom = ''
  }

  handleSelectBuilding (e) {
    const target = e.target
    const name = target.options[target.selectedIndex].value

    this.PositionFloor = target.selectedIndex
    this.setState({ stringBuilding: name })

    for (var i = 0; i < this.props.dataMain.length; i++) {
      if (this.props.dataMain[i].building_name == name) {
        this.shortname = this.props.dataMain[i].short_name
        break
      }
    }
    this.floor = '1'
    this.type = 'C'
    this.room = this.shortname + this.line + this.floor + this.type
    this.numFloor = 1
    this.setState(
      { stringType: 'Lecture' }
    )
    this.clearInput()
    document.getElementById('TypeOfRoom').selectedIndex = 0
    document.getElementById('roomSpan').innerHTML = this.room


    this.setFloorSelect()
  }

  setFloorSelect () {
    var selectFloor = document.getElementById('FloorSelectPopUp')

    // console.log(this.props.buildingPopUp)

    if (this.state.NumberFloor != 0) {
      document.getElementById('FloorSelectPopUp').options.length = 0
    }

    this.setState({ NumberFloor: this.floorPopUp[this.PositionFloor] })
    for (var j = 0; j < this.floorPopUp[this.PositionFloor]; j++) {
      var el = document.createElement('option')
      el.value = j + 1
      el.textContent = j + 1
      selectFloor.appendChild(el)
    }
  }

  setBSelect () {
    var select = document.getElementById('BuildingSelectPopUp')
    for (var z = 0; z < this.props.buildingAll.length; z++) {
      var el = document.createElement('option')
      el.value = this.props.buildingAll[z]
      el.textContent = this.props.buildingAll[z]
      let num = 0

      if (z == 0) {
        this.setState({ stringBuilding: this.props.buildingAll[z] })
      }
      for (var i = 0; i < this.buildingSelectPopUp.length; i++) {
        if (this.buildingSelectPopUp[i] != this.props.buildingAll[z]) {
          num++
        }
      }

      if (num == this.buildingSelectPopUp.length) {
        select.appendChild(el)
        this.buildingSelectPopUp.push(this.props.buildingAll[z])
        this.floorPopUp.push(this.props.dataMain[z].floors)
      }
    }

    // console.log(this.props.buildingPopUp)
  }

  currentFormObject () {
    var newData = []
    var roomArray = []
    var maxId = 0

    newData.building_name = this.state.stringBuilding
    for (var i = 0; i < this.props.dataMain.length; i++) {
      if (this.props.dataMain[i].building_name == this.state.stringBuilding) {
        newData.short_name = this.props.dataMain[i].short_name
        newData.floors = this.props.dataMain[i].floors
        for (var j = 0; j < this.props.dataMain[i].Rooms.length; j++) {
          roomArray.push(this.props.dataMain[i].Rooms[j])
          if (this.props.dataMain[i].Rooms[j].roomId > maxId) {
            maxId = this.props.dataMain[i].Rooms[j].roomId
          }
        }
        roomArray.push({
          roomId: maxId + 1,
          floor: this.numFloor,
          room: this.room,
          roomType: this.state.stringType,
          numberOfSeat: this.state.numberRow * this.state.numberStudent
        }
        )
      }
    }


    newData.Rooms = roomArray
    // console.log(newData)
    return newData
  }

  addDataToPopUp () {
    // console.log(this.props.buildingAll)
    this.props.dataMainUpDate()
    // console.log(this.props.dataMain)
    this.setBSelect()
    this.setFloorSelect()

    for (var k = 0; k < this.props.dataMain.length; k++) {
      if (this.props.dataMain[k].building_name == this.buildingSelectPopUp[0]) {
        this.shortname = this.props.dataMain[k].short_name
        break
      }
    }
    this.floor = '1'
    this.type = 'C'
    this.room = this.shortname + this.line + this.floor + this.type
    document.getElementById('roomSpan').innerHTML = this.room

    document.getElementById('BuildingSelectPopUp').selectedIndex = 0
    document.getElementById('FloorSelectPopUp').selectedIndex = 0
    document.getElementById('TypeOfRoom').selectedIndex = 0
    this.clearInput()
    this.props.showModal()
  }

  render () {
    return (
      <div className="box is-user-popUp" style={{ width: '500px' }}>
        <div>
          <h1 align="center">เพิ่มข้อมูลห้อง</h1>
          <div className="columns input-div">
            <div className="column is-2">
              <label className="label">ตึก</label>
            </div>
            <div className="column">
              <select className="room-popup-select-box"
                id="BuildingSelectPopUp"
                name="stringBuilding"
                onChange={this.handleSelectBuilding}
              >
              </select>
            </div>
          </div>

          <div className="columns input-div">
            <div className="column is-2">
              <label className="label">ชั้น</label>
            </div>
            <div className="column">
              <select className="room-popup-select-box"
                id="FloorSelectPopUp"
                name="stringFloor"
                onChange={this.handleInputChange}
              >
              </select>
            </div>
          </div>

          <div className="columns input-div">
            <div className="column is-2">
              <label className="label">ชนิดห้อง</label>
            </div>
            <div className="column">
              <select className="room-popup-select-box"
                id="TypeOfRoom"
                name="stringType"
                onChange={this.handleInputChange}
              >
                <option value="Lecture" >Lecture</option>
                <option value="Lab">Lab</option>
              </select>
            </div>
          </div>

          <div className="columns input-div">
            <div className="column is-2">
              <label className="label">ห้องที่</label>
            </div>
            <div className="column">
              <input
                className="input is-full-width"
                type="text"
                name="stringRoom"
                value={this.state.stringRoom}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="columns input-div">
            <div className="column is-2">
              <label className="label">จำนวนแถว</label>
            </div>
            <div className="column">
              <input
                className="input is-full-width"
                type="text"
                name="stringRow"
                value={this.state.stringRow}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="columns input-div">
            <div className="column is-2">
              <label className="label">แถวละ</label>
            </div>
            <div className="column">
              <input
                className="input is-full-width"
                type="text"
                name="stringStudent"
                value={this.state.stringStudent}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <br></br>

          <center>
            <h1> รหัสห้อง : <span id="roomSpan"></span></h1>
          </center>

          <br></br>
          <center>
            <button className="button is-oros is-round" onClick={() => { this.addButtonHandle() }}>เพิ่มห้อง</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ออก</button>
          </center>
        </div>
      </div>
    )
  }
}

export default RoomPopUp
