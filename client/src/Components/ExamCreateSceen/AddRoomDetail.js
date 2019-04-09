/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/AddRoomDetail.css'

import ClientService from '../Utilities/ClientService'

const CServiceObj = new ClientService()

class AddRoomDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedBuilding: '',
      selectedFloor: '',
      selectedRoom: '',
      minimumWantedSeat: '',
      selectedHour: '',
      selectedMinute: '',
      wantedSeat: '',
      buildings: []
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectType = this.handleSelectType.bind(this)
  }

  componentDidMount () {
    this.loadBuilding()
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  handleSelectType (e) {
    const target = e.target
    const name = target.name
    const value = target.options[target.selectedIndex].value

    this.setState({
      [name]: value
    })
  }

  loadBuilding () {
    CServiceObj.getAllBuilding().then((buildings) => {
      this.setState({
        buildings: buildings
      })
    })
  }

  renderBuilding () {
    return this.state.buildings.map((building) => {
      return <option
        key={building.short_name}
        value={building.short_name}
      >
        {building.short_name}
      </option>
    })
  }

  renderFloor () {
    var optionSet = []
    const buildingObj = this.state.buildings.find((building) => {
      return building.short_name === this.state.selectedBuilding
    })

    if (buildingObj) {
      for (var i = 1; i <= buildingObj.floors; i++) {
        optionSet[i] = <option
          key={i}
          value={i}
        >
          {i}
        </option>
      }
    }
    return optionSet
  }

  renderRoom () {
    var optionSet = []
    const buildingObj = this.state.buildings.find((building) => {
      return building.short_name === this.state.selectedBuilding
    })

    if (buildingObj) {
      for (var i = 0; i < buildingObj.Rooms.length; i++) {
        optionSet[i] = <option
          key={i}
          value={buildingObj.Rooms[i].room}
        >
          {buildingObj.Rooms[i].room}
        </option>
      }
    }
    return optionSet
  }

  setSelectedBuilding (building) {
    this.setState({
      selectedBuilding: building
    })
  }

  render () {
    return (
      <div className="add-room-detail box with-title">
        <div className="box-title is-violet">
          <h3 className="label is-2">เพิ่มรายละเอียดการสอบ</h3>
          <button className="exit-button fas fa-times fa-1x" onClick={this.props.closeModal}></button>
        </div>
        <div className="box-content">
          <div className="room-select-area" style={{ paddingBottom: '20px' }}>
            <span className="input-set">
              <p className="label is-3">ตึก</p>
              <select
                className="select"
                style={{ width: '150px' }}
                onChange={this.handleSelectType}
                name="selectedBuilding"
                value={this.state.selectedBuilding}
              >
                <option
                  value=""
                ></option>
                {this.renderBuilding()}
              </select>
            </span>
            <span className="input-set">
              <p className="label is-3">ชั้น</p>
              <select
                className="select"
                style={{ width: '150px' }}
                onChange={this.handleSelectType}
                name="selectedFloor"
              >
                {this.renderFloor()}
              </select>
            </span>
            <span className="input-set">
              <p className="label is-3">ห้อง</p>
              <select
                className="select"
                style={{ width: '150px' }}
                onChange={this.handleSelectType}
                name="selectedRoom"
                value={this.state.selectedRoom}
              >
                {this.renderRoom()}
              </select>
            </span>
            <span className="input-set">
              <p className="label is-3">จำนวน</p>
              <input className="input disabled" type="text" style={{ width: '100px' }} />
              <p className="label is-3">คน</p>
            </span>
          </div>
          <div className="time-select-table-area">
            <RoomScheduleTable
              roomId={this.state.selectedRoom}
            />
          </div>
          <div className="room-data-input-area">
            <div className="columns">
              <div className="column is-5">
                <p className="label is-3">จำนวนชั่วโมงมากที่สุด 999.59 ชั่วโมง</p>
                <span className="input-set">
                  <select className="select" style={{ width: '150px' }}>
                    <option>jeff</option>
                    <option>jeff</option>
                  </select>
                  <p className="label is-3">ชั่วโมง</p>
                </span>
                <span className="input-set">
                  <select className="select" style={{ width: '150px' }}>
                    <option>jeff</option>
                    <option>jeff</option>
                  </select>
                  <p className="label is-3">นาที</p>
                </span>
              </div>
              <div className="column" style={{ display: 'flex', alignItems: 'center' }}>
                <span className="input-set">
                  <p className="label is-3">จำนวนนิสิต</p>
                  <input className="input" type="text" style={{ width: '150px' }} />
                  <p className="label is-3">คน</p>
                </span>
              </div>
            </div>
            <div className="room-data-button-area" style={{ textAlign: 'center' }}>
              <button className="button is-3 is-oros is-round" style={{ width: '130px' }}>เพิ่มห้อง</button>
              <button className="button is-3 is-yentafo is-round" style={{ width: '130px' }}>ย้อนกลับ</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class RoomScheduleTable extends Component {
  constructor (props) {
    super(props)

    this.state = {
      schedules: []
    }
  }

  componentDidMount () {
    this.setState({
      schedules: this.loadDefaultTableItem()
    })
  }

  loadDefaultTableItem () {
    var items = []
    for (var i = 0; i < 15; i++) {
      items[i] = {
        time: `${6 + i}:00`,
        status: `-`,
        availableSeat: `-`
      }
    }
    return items
  }

  loadScheduleItem () {
    if (this.props.selectedRoom) {
      CServiceObj.getAllExamOnCurrentDateAndRoom(this.props.selectedRoom.date, this.props.roomId)
    }
  }

  renderScheduleItem () {
    return this.state.schedules.map((schedule) => {
      return <RoomScheduleTableItem
        key={schedule.time}
        time={schedule.time}
        status={schedule.status}
        availableSeat={schedule.availableSeat}
      />
    })
  }

  render () {
    return (
      <table className="table room-schedule-table">
        <thead>
          <tr className="is-header">
            <th>เวลา</th>
            <th>สถานะห้อง</th>
            <th>จำนวนคน</th>
          </tr>
        </thead>
        <tbody>
          {this.renderScheduleItem()}
        </tbody>
      </table>
    )
  }
}

class RoomScheduleTableItem extends Component {
  render () {
    return (
      <tr>
        <td>{this.props.time}</td>
        <td>{this.props.status}</td>
        <td>{this.props.availableSeat}</td>
      </tr>
    )
  }
}

export default AddRoomDetail
