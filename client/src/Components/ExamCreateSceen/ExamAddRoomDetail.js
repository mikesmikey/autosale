/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/AddRoomDetail.css'

import ClientService from '../Utilities/ClientService'

const CServiceObj = new ClientService()

class AddRoomDetail extends Component {
  _isMounted = false

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
      buildings: [],
      maxSeat: '',
      maxSelectHour: '0',
      selectedSchedule: null,
      studentNumberInput: '',
      schedules: null,
      isLoading: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectType = this.handleSelectType.bind(this)
    this.setSelectedSchedule = this.setSelectedSchedule.bind(this)
    this.handleBackButton = this.handleBackButton.bind(this)
    this.handleSubmitButtonStyle = this.handleSubmitButtonStyle.bind(this)
    this.handleSubmitButton = this.handleSubmitButton.bind(this)
    this.setSchedules = this.setSchedules.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.loadBuilding()
  }

  componentDidUpdate (prevProps, prevStates) {
    if (prevStates.selectedRoom !== this.state.selectedRoom) {
      this.renderMaxSeat()
    }
    if (prevStates.selectedSchedule !== this.state.selectedSchedule) {
      this.calculateMaxSelectHour()
    }
  }

  componentWillUnmount () {
    this._isMounted = false
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
    this.setState({
      isLoading: true
    })
    CServiceObj.getAllBuilding().then((buildings) => {
      if (this._isMounted) {
        this.setState({
          buildings: buildings,
          isLoading: false
        })
      }
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
        if (buildingObj.Rooms[i].floor === Number.parseInt(this.state.selectedFloor)) {
          optionSet[i] = <option
            key={i}
            value={buildingObj.Rooms[i].room}
          >
            {buildingObj.Rooms[i].room}
          </option>
        }
      }
    }
    return optionSet
  }

  renderMaxSeat () {
    const buildingObj = this.state.buildings.find((building) => {
      return building.short_name === this.state.selectedBuilding
    })

    if (buildingObj) {
      const roomObj = buildingObj.Rooms.find((room) => {
        return room.room === this.state.selectedRoom
      })

      if (roomObj) {
        this.setState({
          maxSeat: roomObj.numberOfSeat
        })
      }
    }
  }

  setSelectedBuilding (building) {
    this.setState({
      selectedBuilding: building
    })
  }

  setSelectedSchedule (schedule) {
    this.setState({
      selectedSchedule: schedule
    })
  }

  calculateMaxSelectHour () {
    if (this.state.selectedSchedule) {
      const selectedSchedule = this.state.selectedSchedule
      if (selectedSchedule.maxHour) {
        this.setState({
          maxSelectHour: selectedSchedule.maxHour
        })
      } else {
        let count = 0
        for (let i = selectedSchedule.time; i <= 20; i++) {
          if (this.state.schedules[i].maxHour) {
            break
          }
          count++
        }
        this.setState({
          maxSelectHour: count
        })
      }
    }
  }

  setSchedules (schedules) {
    this.setState({
      schedules: schedules
    })
  }

  renderMaxSelectHourOption () {
    var optionSet = []
    if (this.state.selectedSchedule && this.state.schedules) {
      let selectedSchedule = this.state.selectedSchedule
      if (selectedSchedule.maxHour) {
        for (let i = 1; i <= selectedSchedule.maxHour; i++) {
          optionSet[i] = <option
            key={i}
            value={i}
          >
            {i}
          </option>
        }
      } else {
        let count = 1
        for (let i = selectedSchedule.time; i <= 20; i++) {
          if (this.state.schedules[i].maxHour) {
            break
          }
          optionSet[count] = <option
            key={count}
            value={count}
          >
            {count}
          </option>
          count++
        }
      }
    }
    return optionSet
  }

  handleBackButton () {
    this.props.showModal('roomsManageModal')
  }

  validSubmit () {
    if (!this.state.selectedSchedule) {
      return false
    }
    if (this.state.selectedHour === '') {
      return false
    }
    if (this.state.selectedMinute === '') {
      return false
    }

    const totalTime = Number.parseInt(this.state.selectedHour) + (Number.parseInt(this.state.selectedMinute) / 100)
    if (totalTime > this.state.maxSelectHour) {
      return false
    }
    if (isNaN(this.state.studentNumberInput) || this.state.studentNumberInput === '') {
      return false
    }
    if (this.state.studentNumberInput > this.state.selectedSchedule.availableSeat) {
      return false
    }
    return true
  }

  handleSubmitButton () {
    if (this.validSubmit()) {
      var roomData = {}
      roomData.roomId = this.state.selectedRoom
      roomData.startTime = this.state.selectedSchedule.time
      roomData.hours = Number.parseInt(this.state.selectedHour) + (Number.parseInt(this.state.selectedMinute) / 100)
      roomData.maxStudent = this.state.studentNumberInput

      this.setState({
        isLoading: true
      })
      CServiceObj.insertRoomIntoExam(this.props.selectedExam._id, roomData).then((result) => {
        if (result) {
          this.setState({
            isLoading: false
          })
          alert('เพิ่มห้องสอบสำเร็จ')
          this.props.showModal('roomsManageModal')
        }
      })
    }
  }

  handleSubmitButtonStyle () {
    return this.validSubmit() ? '' : 'disabled'
  }

  render () {
    return (
      <div className="add-room-detail box with-title">
        <div className="box-title is-violet">
          <h3 className="label is-2">เพิ่มรายละเอียดการสอบ</h3>
          <button className="exit-button fas fa-times fa-1x" onClick={this.props.closeModal}></button>
        </div>
        <div className="box-content">
          <div className={`room-select-area ${this.state.isLoading ? 'disabled' : ''}`} style={{ paddingBottom: '20px' }}>
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
                <option
                  value=""
                ></option>
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
                <option
                  value=""
                ></option>
                {this.renderRoom()}
              </select>
            </span>
            <span className="input-set">
              <p className="label is-3">จำนวน</p>
              <input className="input disabled" type="text" style={{ width: '100px' }} defaultValue={this.state.maxSeat}/>
              <p className="label is-3">คน</p>
            </span>
          </div>
          <div className="time-select-table-area">
            <RoomScheduleTable
              selectedRoom={this.state.selectedRoom}
              selectedExam={this.props.selectedExam}
              maxSeat={this.state.maxSeat}
              setSelectedSchedule={this.setSelectedSchedule}
              setSchedules={this.setSchedules}
            />
          </div>
          <div className={`room-data-input-area ${this.state.isLoading ? 'disabled' : ''}`}>
            <div className="columns">
              <div className="column is-5">
                <p className="label is-3">จำนวนชั่วโมงมากที่สุด {this.state.maxSelectHour} ชั่วโมง</p>
                <span className="input-set">
                  <select
                    className="select"
                    style={{ width: '150px' }}
                    onChange={this.handleSelectType}
                    name="selectedHour"
                    value={this.state.selectedHour}
                  >
                    <option
                      value=""
                    ></option>
                    {this.renderMaxSelectHourOption()}
                  </select>
                  <p className="label is-3">ชั่วโมง</p>
                </span>
                <span className="input-set">
                  <select
                    className="select"
                    style={{ width: '150px' }}
                    onChange={this.handleSelectType}
                    name="selectedMinute"
                    value={this.state.selectedMinute}
                  >
                    <option value=""></option>
                    <option value="0">0</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                  </select>
                  <p className="label is-3">นาที</p>
                </span>
              </div>
              <div className="column" style={{ display: 'flex', alignItems: 'center' }}>
                <span className="input-set">
                  <p className="label is-3">จำนวนนิสิต</p>
                  <input
                    className="input"
                    type="text"
                    style={{ width: '150px' }}
                    name="studentNumberInput"
                    value={this.state.studentNumberInput}
                    onChange={this.handleInputChange}
                  />
                  <p className="label is-3">คน</p>
                </span>
              </div>
            </div>
            <div className={`room-data-button-area`} style={{ textAlign: 'center' }}>
              <button className={`button is-3 is-oros is-round ${this.handleSubmitButtonStyle()}`} style={{ width: '130px' }} onClick={this.handleSubmitButton}>เพิ่มห้อง</button>
              <button className="button is-3 is-yentafo is-round" style={{ width: '130px' }} onClick={this.handleBackButton}>ย้อนกลับ</button>
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
      schedules: [],
      isLoading: false
    }
  }

  componentDidMount () {
    this.setState({
      schedules: this.loadDefaultTableItem()
    })
    this.loadScheduleItem()
  }

  componentDidUpdate (prevProps, prevStates) {
    if (this.props.selectedRoom !== prevProps.selectedRoom) {
      this.loadScheduleItem()
    }
    if (this.props.maxSeat !== prevProps.maxSeat) {
      this.setState({
        schedules: this.loadDefaultTableItem()
      })
    }
    if (this.state.schedules !== prevStates.schedules) {
      this.props.setSchedules(this.state.schedules)
    }
  }

  selectItem (e, scheduleData) {
    const parent = e.target.parentElement
    if (parent.classList.contains('room-schedule-item')) {
      if (!parent.classList.contains('is-active')) {
        if (this.state.selectedRow != null) {
          this.state.selectedRow.classList.remove('is-active')
        }
        parent.classList.add('is-active')
        this.setState({
          selectedRow: parent
        })
        this.props.setSelectedSchedule(scheduleData)
      }
    }
  }

  loadDefaultTableItem () {
    var items = []
    for (var i = 8; i < 21; i++) {
      items[i] = {
        time: i,
        status: `ว่าง`,
        availableSeat: this.props.maxSeat,
        maxSeat: this.props.maxSeat
      }
    }
    return items
  }

  loadScheduleItem () {
    if (this.props.selectedRoom) {
      this.setState({
        isLoading: true
      })
      CServiceObj.getAllExamOnCurrentDateAndRoom(this.props.selectedExam.date, this.props.selectedRoom).then((exams) => {
        exams.forEach(exam => {
          var newSchedules = this.state.schedules

          if (exam.rooms.length > 0) {
            for (let i = 0; i < exam.rooms.length; i++) {
              var newScheduleItem = newSchedules[exam.rooms[i].startTime]

              const startTime = exam.rooms[i].startTime
              const maxHour = Math.ceil(exam.rooms[i].hours)
              const finishTime = exam.rooms[i].startTime + maxHour
              for (let i = startTime + 1; i < finishTime; i++) {
                newSchedules[i].isMergeRow = true
              }

              if (!newScheduleItem.maxHour) {
                newScheduleItem.maxHour = maxHour // default span
              } else {
                if (newScheduleItem.maxHour < maxHour) {
                  newScheduleItem.maxHour = maxHour
                }
              }

              newScheduleItem.availableSeat -= exam.rooms[i].maxStudent

              newSchedules[exam.rooms[i].startTime] = newScheduleItem

              if (newScheduleItem.status !== 'ว่าง') {
                newScheduleItem.status = `${newScheduleItem.status}\n- ${exam.subjectName} (${exam.rooms[i].hours} ชั่วโมง)`
              } else {
                newScheduleItem.status = `มีการจัดการสอบโดยวิชา :\n- ${exam.subjectName} (${exam.rooms[i].hours} ชั่วโมง)`
              }
            }
          }
          this.setState({
            schedules: newSchedules,
            isLoading: false
          })
        })
      })
    } else {
      this.setState({
        schedules: this.loadDefaultTableItem()
      })
    }
  }

  renderScheduleItem () {
    return this.state.schedules.map((schedule) => {
      return <RoomScheduleTableItem
        key={schedule.time}
        scheduleData={schedule}
        selectItem={(e, scheduleData) => { this.selectItem(e, scheduleData) }}
      />
    })
  }

  render () {
    return (
      <table className={`table room-schedule-table ${this.state.isLoading ? 'disabled' : ''}`}>
        <thead>
          <tr className="is-header">
            <th className="is-ignore">เวลา</th>
            <th>สถานะห้อง</th>
            <th>จำนวนคน (ว่าง/ทั้งหมด)</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className="room-schedule-item">
            <td className="is-ignore">-</td>
            <td rowSpan="2">
              I'm double
            </td>
            <td rowSpan="2">
              I'm double
            </td>
          </tr>
          <tr className="room-schedule-item">
            <td className="is-ignore">-</td>
          </tr>
          */}
          {this.renderScheduleItem()}
        </tbody>
      </table>
    )
  }
}

class RoomScheduleTableItem extends Component {
  render () {
    const hourSpan = !isNaN(this.props.scheduleData.maxHour) ? this.props.scheduleData.maxHour : 1
    return (
      <tr className="room-schedule-item" onClick={(e) => { this.props.selectItem(e, this.props.scheduleData) }}>
        <td className="is-ignore">{`${this.props.scheduleData.time}:00`}</td>
        {this.props.scheduleData.isMergeRow ? null : <td rowSpan={hourSpan}>{this.props.scheduleData.status}</td> }
        {this.props.scheduleData.isMergeRow ? null : <td rowSpan={hourSpan}>{`(${this.props.scheduleData.availableSeat || '-'}/${this.props.scheduleData.maxSeat || '-'})`}</td> }
      </tr>
    )
  }
}

export default AddRoomDetail
