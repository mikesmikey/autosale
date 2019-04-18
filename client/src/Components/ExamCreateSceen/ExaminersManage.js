/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/ExaminersManage.css'
import '../../StyleSheets/userManage.css'

import ClientService from '../Utilities/ClientService'

// Objects
import Student from '../../Objects/Student'
import Professor from '../../Objects/Professor'
import Staff from '../../Objects/Staff'

const ServiceObj = new ClientService()

class ExaminersManage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedType: 'student',
      selectedUser: false,
      UserName: false,
      FName: false,
      LName: false,
      Type: false,
      searchInput: '',
      isDataLoading: false,
      page: 1,
      maxPage: 1,
      Room: false,
      Time: false,
      FNameDelete: false,
      LNameDelete: false,
      TypeDelete: false,
      RoomDelete: false,
      TimeDelete: false
    }

    this._isMounted = true
    this.room = []
    this.roomToTime = ''
    this.NumRoom = 0
    this.Examiner = []
    this.checkExaminer = 0
    this.checkClick = ''
    this.Exam = []
    this.checkAdd = 0

    this.handleSelectType = this.handleSelectType.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearchButton = this.handleSearchButton.bind(this)
    this.handleSelectRoom = this.handleSelectRoom.bind(this)
    this.handleSelectTime = this.handleSelectTime.bind(this)
    this.handleBackButton = this.handleBackButton.bind(this)
    this.setDataLoadingStatus = this.setDataLoadingStatus.bind(this)
    this.loadDataToRoomExamSelect = this.loadDataToRoomExamSelect.bind(this)
    this.loadTimeStart = this.loadTimeStart.bind(this)
    this.addToSelectedExaminerTable = this.addToSelectedExaminerTable.bind(this)
    this.deleteToSelectedExaminerTable = this.deleteToSelectedExaminerTable.bind(this)
    this.setFName = this.setFName.bind(this)
    this.setLName = this.setLName.bind(this)
    this.setType = this.setType.bind(this)
    this.setCheckClick = this.setCheckClick.bind(this)
    this.setDelete = this.setDelete.bind(this)
    this.setUsername = this.setUsername.bind(this)
  }

  loadDataToRoomExamSelect () {
    // console.log(this.props.selectedExam.rooms)
    var select = document.getElementById('RoomExamgSelect')
    for (var i = 0; i < this.props.selectedExam.rooms.length; i++) {
      this.NumRoom = 0
      for (var j = 0; j < this.room.length; j++) {
        if (this.room[j] !== this.props.selectedExam.rooms[i].roomId) {
          this.NumRoom++
        }
      }
      if (i === 0) {
        this.roomToTime = this.props.selectedExam.rooms[i].roomId
        this.setState({
          Room: this.roomToTime
        })
      }
      if (this.NumRoom === this.room.length) {
        var el = document.createElement('option')
        el.value = this.props.selectedExam.rooms[i].roomId
        el.textContent = this.props.selectedExam.rooms[i].roomId
        this.room.push(this.props.selectedExam.rooms[i].roomId)
        select.appendChild(el)
      }
    }
  }

  loadTimeStart () {
    for (var i = 0; i < this.props.selectedExam.rooms.length; i++) {
      if (this.roomToTime === this.props.selectedExam.rooms[i].roomId) {
        var startTimeToString = this.props.selectedExam.rooms[i].startTime.toString()
        var finishTime = this.props.selectedExam.rooms[i].startTime + this.props.selectedExam.rooms[i].hours
        var finishTimeToString = finishTime.toString()
        if (startTimeToString.length === 1 || startTimeToString.length === 2) {
          startTimeToString = startTimeToString + ':00'
        } else if (startTimeToString.length === 3) {
          startTimeToString = startTimeToString.charAt(0) + ':' + startTimeToString.charAt(2)
        } else if (startTimeToString.length === 4) {
          if (startTimeToString.charAt(1) === '.') {
            startTimeToString = startTimeToString.charAt(0) + ':' + startTimeToString.charAt(2) + startTimeToString.charAt(3)
          } else {
            startTimeToString = startTimeToString.charAt(0) + startTimeToString.charAt(1) + ':' + startTimeToString.charAt(3) + '0'
          }
        } else if (startTimeToString.length === 5) {
          startTimeToString = startTimeToString.charAt(0) + startTimeToString.charAt(1) + ':' + startTimeToString.charAt(3) + startTimeToString.charAt(4)
        }

        if (finishTimeToString.length === 1 || finishTimeToString.length === 2) {
          finishTimeToString = finishTimeToString + ':00'
        } else if (finishTimeToString.length === 3) {
          finishTimeToString = finishTimeToString.charAt(0) + ':' + finishTimeToString.charAt(2)
        } else if (finishTimeToString.length === 4) {
          if (finishTimeToString.charAt(1) === '.') {
            finishTimeToString = finishTimeToString.charAt(0) + ':' + finishTimeToString.charAt(2) + finishTimeToString.charAt(3)
          } else {
            finishTimeToString = finishTimeToString.charAt(0) + finishTimeToString.charAt(1) + ':' + finishTimeToString.charAt(3) + '0'
          }
        } else if (finishTimeToString.length === 5) {
          finishTimeToString = finishTimeToString.charAt(0) + finishTimeToString.charAt(1) + ':' + finishTimeToString.charAt(3) + finishTimeToString.charAt(4)
        }

        var setTime = startTimeToString + '-' + finishTimeToString
        var select = document.getElementById('TimeExamgSelect')
        var el = document.createElement('option')
        el.value = setTime
        el.textContent = setTime
        select.appendChild(el)
        if (i === 0) {
          this.setState({
            Time: setTime
          })
        }
      }
    }
  }

  calculateExamRoomTime (room) {
    var startTimeToString = room.startTime.toString()
    var finishTime = room.startTime + room.hours
    var finishTimeToString = finishTime.toString()
    if (startTimeToString.length === 1 || startTimeToString.length === 2) {
      if (startTimeToString.length === 1) {
        startTimeToString = '0' + startTimeToString + ':00'
      } else {
        startTimeToString = startTimeToString + ':00'
      }
    } else if (startTimeToString.length === 3) {
      startTimeToString = startTimeToString.charAt(0) + ':' + startTimeToString.charAt(2)
    } else if (startTimeToString.length === 4) {
      if (startTimeToString.charAt(1) === '.') {
        startTimeToString = startTimeToString.charAt(0) + ':' + startTimeToString.charAt(2) + startTimeToString.charAt(3)
      } else {
        startTimeToString = startTimeToString.charAt(0) + startTimeToString.charAt(1) + ':' + startTimeToString.charAt(3) + '0'
      }
    } else if (startTimeToString.length === 5) {
      startTimeToString = startTimeToString.charAt(0) + startTimeToString.charAt(1) + ':' + startTimeToString.charAt(3) + startTimeToString.charAt(4)
    }

    if (finishTimeToString.length === 1 || finishTimeToString.length === 2) {
      if (finishTimeToString.length === 1) {
        finishTimeToString = '0' + finishTimeToString + ':00'
      } else {
        finishTimeToString = finishTimeToString + ':00'
      }
    } else if (finishTimeToString.length === 3) {
      finishTimeToString = finishTimeToString.charAt(0) + ':' + finishTimeToString.charAt(2)
    } else if (finishTimeToString.length === 4) {
      if (finishTimeToString.charAt(1) === '.') {
        finishTimeToString = finishTimeToString.charAt(0) + ':' + finishTimeToString.charAt(2) + finishTimeToString.charAt(3)
      } else {
        finishTimeToString = finishTimeToString.charAt(0) + finishTimeToString.charAt(1) + ':' + finishTimeToString.charAt(3) + '0'
      }
    } else if (finishTimeToString.length === 5) {
      finishTimeToString = finishTimeToString.charAt(0) + finishTimeToString.charAt(1) + ':' + finishTimeToString.charAt(3) + finishTimeToString.charAt(4)
    }

    return startTimeToString + '-' + finishTimeToString
  }

  componentDidMount () {
    this.examinerTable.loadDataByTypeAndUsername(this.state.selectedType, this.state.searchInput)
    this.loadDataToRoomExamSelect()
    this.loadTimeStart()
    this.Exam = this.props.selectedExam
    this.loadExaminer()
    // console.log(this.props.selectedExam)
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  componentDidUpdate (prevProps, prevStates) {
    if (this.state.page !== prevStates.page) {
      this.examinerTable.loadDataByTypeAndUsername(this.state.selectedType, this.state.searchInput, this.state.page === 1 ? 0 : (this.state.page - 1) * 50)
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

  handleSelectRoom (e) {
    document.getElementById('TimeExamgSelect').options.length = 0
    const target = e.target
    const value = target.value
    var check = 0
    // console.log(this.props.selectedExam)

    this.setState({
      Room: value
    })

    for (var i = 0; i < this.props.selectedExam.rooms.length; i++) {
      if (value === this.props.selectedExam.rooms[i].roomId) {
        var startTimeToString = this.props.selectedExam.rooms[i].startTime.toString()
        var finishTime = this.props.selectedExam.rooms[i].startTime + this.props.selectedExam.rooms[i].hours
        var finishTimeToString = finishTime.toString()
        if (startTimeToString.length === 1 || startTimeToString.length === 2) {
          startTimeToString = startTimeToString + ':00'
        } else if (startTimeToString.length === 3) {
          startTimeToString = startTimeToString.charAt(0) + ':' + startTimeToString.charAt(2)
        } else if (startTimeToString.length === 4) {
          if (startTimeToString.charAt(1) === '.') {
            startTimeToString = startTimeToString.charAt(0) + ':' + startTimeToString.charAt(2) + startTimeToString.charAt(3)
          } else {
            startTimeToString = startTimeToString.charAt(0) + startTimeToString.charAt(1) + ':' + startTimeToString.charAt(3) + '0'
          }
        } else if (startTimeToString.length === 5) {
          startTimeToString = startTimeToString.charAt(0) + startTimeToString.charAt(1) + ':' + startTimeToString.charAt(3) + startTimeToString.charAt(4)
        }

        if (finishTimeToString.length === 1 || finishTimeToString.length === 2) {
          finishTimeToString = finishTimeToString + ':00'
        } else if (finishTimeToString.length === 3) {
          finishTimeToString = finishTimeToString.charAt(0) + ':' + finishTimeToString.charAt(2)
        } else if (finishTimeToString.length === 4) {
          if (finishTimeToString.charAt(1) === '.') {
            finishTimeToString = finishTimeToString.charAt(0) + ':' + finishTimeToString.charAt(2) + finishTimeToString.charAt(3)
          } else {
            finishTimeToString = finishTimeToString.charAt(0) + finishTimeToString.charAt(1) + ':' + finishTimeToString.charAt(3) + '0'
          }
        } else if (finishTimeToString.length === 5) {
          finishTimeToString = finishTimeToString.charAt(0) + finishTimeToString.charAt(1) + ':' + finishTimeToString.charAt(3) + finishTimeToString.charAt(4)
        }

        var setTime = startTimeToString + '-' + finishTimeToString
        var select = document.getElementById('TimeExamgSelect')
        var el = document.createElement('option')
        el.value = setTime
        el.textContent = setTime
        select.appendChild(el)

        if (check === 0) {
          this.setState({
            Time: setTime
          })
          check++
        }
      }
    }
  }

  handleSelectTime (e) {
    const target = e.target
    const value = target.value

    this.setState({
      Time: value
    })
  }

  handleSelectType (e) {
    const target = e.target
    const name = target.options[target.selectedIndex].value

    this.setState({
      selectedType: name,
      page: 1,
      maxPage: 1
    })
    this.examinerTable.loadDataByTypeAndUsername(name, this.state.searchInput)
  }

  handleSearchButton () {
    this.setState({
      page: 1,
      maxPage: 1
    })
    this.examinerTable.loadDataByTypeAndUsername(this.state.selectedType, this.state.searchInput, this.state.page === 1 ? 0 : (this.state.page - 1) * 50)
    this.calculateMaxPage()
  }

  setDataLoadingStatus (status) {
    this.setState({
      isDataLoading: status
    })
  }

  calculateMaxPage () {
    ServiceObj.countUserByTypeAndName(this.state.selectedType, this.state.searchInput).then((result) => {
      if (result === 0) {
        this.setState({
          page: Math.ceil(result / 50),
          maxPage: Math.ceil(result / 50)
        })
      } else {
        this.setState({
          maxPage: Math.ceil(result / 50)
        })
      }

      // console.log(result)
    })
  }

  handleInceasePageStyle () {
    if (this.state.page === this.state.maxPage) {
      return 'disabled'
    }
  }

  handleDeceasePageStyle () {
    if (this.state.page === 1 || this.state.page === 0) {
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

  setFName (data) {
    this.setState({
      FName: data
    })
  }

  setLName (data) {
    this.setState({
      LName: data
    })
  }

  setType (data) {
    this.setState({
      Type: data
    })
  }

  setCheckClick (data) {
    this.checkClick = data
  }

  setDelete (data) {
    // console.log(data)
    this.setState({
      FNameDelete: data.firstName,
      LNameDelete: data.lastName,
      TypeDelete: data.typeOfUser,
      RoomDelete: data.room,
      TimeDelete: data.time
    })
  }

  setUsername (data) {
    this.setState({
      UserName: data
    })
  }

  addExaminer () {
    return new Promise((resolve, reject) => {
      // console.log(this.Exam)
      if (this.Examiner.length === 0) {
        alert('ยังไม่ได้ห้องเลือกผู้คุมสอบ')
      } else {
        var rooms = []
        for (var z = 0; z < this.Exam.rooms.length; z++) {
          rooms.push(this.Exam.rooms[z])
        }
        for (var i = 0; i < this.Examiner.length; i++) {
          this.checkAdd = 0
          var userName = this.Examiner[i].username
          for (var j = 0; j < rooms.length; j++) {
            var examinersData = []
            var time = ''
            var timenumber = 0
            for (var kk = 0; kk < this.Examiner[i].time.length; kk++) {
              if (this.Examiner[i].time.charAt(kk) === ':') {
                timenumber = parseInt(time)
                break
              }
              time += this.Examiner[i].time.charAt(kk)
            }
            if (rooms[j].roomId === this.Examiner[i].room &&
                rooms[j].startTime === timenumber) {
              for (var k = 0; k < rooms[j].examiners.length; k++) {
                if (rooms[j].examiners[k].username === userName) {
                  this.checkAdd++
                }
                examinersData.push(rooms[j].examiners[k])
              }
              if (this.checkAdd === 0) {
                examinersData.push({ username: userName })
              }
              rooms[j].roomId = this.Exam.rooms[j].roomId
              rooms[j].startTime = this.Exam.rooms[j].startTime
              rooms[j].hours = this.Exam.rooms[j].hours
              rooms[j].maxStudent = this.Exam.rooms[j].maxStudent
              rooms[j].examiners = examinersData
            }
          }
        }
        ServiceObj.insertExaminerIntoRoom(this.props.selectedExam._id, rooms).then((result) => {
          if (result) {
            this.props.closeModal()
            this.props.showModal('examManageModal')
          }
        })
      }
    })
  }

  loadExaminer () {
    for (let i = 0; i < this.Exam.rooms.length; i++) {
      let room = this.Exam.rooms[i]
      for (let j = 0; j < room.examiners.length; j++) {
        ServiceObj.getUserByUsername(room.examiners[j].username).then(result => {
          this.Examiner.push({
            username: result.username,
            firstName: result.firstName,
            lastName: result.lastName,
            typeOfUser: result.typeOfUser,
            room: room.roomId,
            time: this.calculateExamRoomTime(room)
          })
        })
      }
    }
  }

  addToSelectedExaminerTable () {
    this.checkExaminer = 0
    for (var i = 0; i < this.Examiner.length; i++) {
      if (this.state.FName !== this.Examiner[i].firstName ||
        this.state.LName !== this.Examiner[i].lastName) {
        this.checkExaminer++
      } else if (this.state.Room !== this.Examiner[i].room) {
        this.checkExaminer++
      } else if (this.state.Time !== this.Examiner[i].time) {
        this.checkExaminer++
      }
    }
    if (this.checkExaminer === this.Examiner.length && this.state.FName !== false) {
      this.Examiner.push({
        username: this.state.UserName,
        firstName: this.state.FName,
        lastName: this.state.LName,
        typeOfUser: this.state.Type,
        room: this.state.Room,
        time: this.state.Time
      })
      this.checkClick = ''
      this.setState({
        UserName: false,
        FName: false,
        LName: false,
        Type: false
      })
      this.examinerTable.loadDataByTypeAndUsername(this.state.selectedType, this.state.searchInput, this.state.page === 1 ? 0 : (this.state.page - 1) * 50)
      this.calculateMaxPage()
    } else if (this.checkClick === '') {
      alert('ยังไม่ได้เลือก user ที่จะเพิ่ม')
    } else {
      alert('เพิ่มไม่สำเร็จ!!')
    }
  }

  deleteToSelectedExaminerTable () {
    for (var i = 0; i < this.Examiner.length; i++) {
      if (this.Examiner.length === 1) {
        this.Examiner.splice(i, 1)
        break
      }
      if (this.state.FNameDelete === this.Examiner[i].firstName &&
        this.state.LNameDelete === this.Examiner[i].lastName &&
        this.state.TypeDelete === this.Examiner[i].typeOfUser &&
        this.state.RoomDelete === this.Examiner[i].room &&
        this.state.TimeDelete === this.Examiner[i].time
      ) {
        this.Examiner.splice(i, 1)
        break
      }
    }
    this.examinerTable.loadDataByTypeAndUsername(this.state.selectedType, this.state.searchInput, this.state.page === 1 ? 0 : (this.state.page - 1) * 50)
    this.calculateMaxPage()
  }

  handleExaminerAddButton () {
    this.addExaminer().then(() => {
      this.addToSelectedExaminerTable()
    })
  }

  handleBackButton () {
    this.props.showModal('examManageModal')
  }

  render () {
    return (
      <div className="examiners-manage box with-title">
        <div className="box-title is-violet">
          <h3 className="label is-2">เพิ่มผู้คุมสอบ</h3>
          <button className="exit-button fas fa-times fa-1x" onClick={this.props.closeModal}></button>
        </div>
        <div className="box-content">
          <div className="columns is-stay-top" style={{ width: '100%' }}>
            <div className="main-column column">
              <p className="label is-2">ค้นหาผู้คุมสอบ</p>
              <div className="search-area">
                <div className="columns">
                  <div className="column is-2">
                    <p className="label is-3">ประเภท</p>
                  </div>
                  <div className="column">
                    <select className="select" onChange={this.handleSelectType} value={this.state.selectedType}>>
                      <option value="student">นิสิต</option>
                      <option value="professor">อาจารย์</option>
                      <option value="staff">เจ้าหน้าที่</option>
                    </select>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-2">
                    <p className="label is-3">ชื่อ</p>
                  </div>
                  <div className="column">
                    <input className="input is-full-width" type="text" name="searchInput" onChange={this.handleInputChange}/>
                  </div>
                </div>
                <button className="button is-oros is-round is-3" style={{ marginLeft: 'auto' }}
                  onClick={this.handleSearchButton}
                >ค้นหา</button>
              </div>
              <div className="examiner-table-area">
                <ExaminerTable
                  ref={instance => { this.examinerTable = instance }}
                  selectedType={this.state.selectedType}
                  setSelectedUser={this.setSelectedUser}
                  isDataLoading={this.state.isDataLoading}
                  setDataLoadingStatus={this.setDataLoadingStatus}
                  setFName={this.setFName}
                  setLName={this.setLName}
                  setType={this.setType}
                  setUsername={this.setUsername}
                  UserName={this.state.UserName}
                  FName={this.state.FName}
                  LName={this.state.LName}
                  Type={this.state.Type}
                  setCheckClick={this.setCheckClick}
                />
              </div>
              <br></br>
              <div className="columns">
                <button
                  className={`button is-oros is-round ${this.handleDeceasePageStyle()}`}
                  style={{ width: '40px' }}
                  onClick={() => { this.deceasePage() }}
                >
                  <i className="fas fa-angle-left"></i>
                </button>
                <div style={{ width: '25px' }}>
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
              <br></br>
              <div className="columns">
                <div className="column is-0">
                ห้อง
                </div>
                <div className="column">
                  <select className="select" id="RoomExamgSelect"
                    onChange={this.handleSelectRoom}
                  >
                  </select>
                </div>
                <div className="column is-00"></div>
                <div className="column is-0">
                เวลา
                </div>
                <div className="column">
                  <select className="select" id="TimeExamgSelect"
                    onChange={this.handleSelectTime}
                  >
                  </select>
                </div>
                <div className="column is-00"></div>
                <div className="column is-2">
                  <button className="button is-oros is-round"
                    onClick={() => { this.addToSelectedExaminerTable() }}
                  >เพิ่ม</button>
                </div>
              </div>
            </div>
            <div className="main-column column">
              <p className="label is-2">ผู้คุมสอบที่เลือก</p>
              <div className="selected-examiner-table-area">
                <SelectedExaminerTable
                  ref={instance => { this.selectedExaminerTable = instance }}
                  selectedType={this.state.selectedType}
                  Examiner={this.Examiner}
                  isDataLoading={this.state.isDataLoading}
                  setDataLoadingStatus={this.setDataLoadingStatus}
                  setDelete={this.setDelete}
                />
              </div>
              <br></br>
              <div className="button-area">
                <button className="button is-yentafo is-round"
                  onClick={() => { this.deleteToSelectedExaminerTable() }}
                >ลบ</button>
                <button className="button is-orange is-round"
                  onClick={this.handleBackButton}
                >ย้อนกลับ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ExaminerTable extends Component {
  constructor (props) {
    super(props)

    this._isMounted = true

    this.state = {
      selectedRow: null,
      data: []
    }

    this.loadDataByTypeAndUsername = this.loadDataByTypeAndUsername.bind(this)
  }

  inspectItem (e) {
    const parent = e.target.parentElement
    if (parent.classList.contains('examiner-table-user')) {
      if (!parent.classList.contains('is-active')) {
        if (this.state.selectedRow !== null) {
          this.state.selectedRow.classList.remove('is-active')
        }
        parent.classList.add('is-active')
        this.setState({
          selectedRow: parent
        })
        this.props.setUsername(this.state.data[parent.getAttribute('index')].username)
        this.props.setFName(this.state.data[parent.getAttribute('index')].firstName)
        this.props.setLName(this.state.data[parent.getAttribute('index')].lastName)
        this.props.setType(this.state.data[parent.getAttribute('index')].typeOfUser)
        this.props.setCheckClick(this.state.data[parent.getAttribute('index')].typeOfUser)
      }
    }
  }

  loadDataByTypeAndUsername (typeInput, usernameInput, startPos) {
    if (!this.props.isDataLoading) {
      this.props.setDataLoadingStatus(true)
      this.setState({
        data: []
      })

      ServiceObj.searchAllUserByTypeAndName(typeInput, usernameInput, startPos, 50).then((usersData) => {
        if (this._isMounted) {
          this.props.setDataLoadingStatus(false)
          this.setState({ data: usersData })
        }
      })
    } else {
      console.log('no')
    }
  }

  renderTableItem () {
    var items = []
    for (var i = 0; i < this.state.data.length; i++) {
      items[i] = <ExaminerTableItem
        inspectItem={(e) => { this.inspectItem(e) }}
        selectedType={this.props.selectedType}
        itemIndex={i}
        itemData={this.state.data[i]}
        key={i}
      />
    }
    return items
  }

  render () {
    return (
      <table className="table examiner-table">
        <thead>
          <tr className="is-header">
            <th>ชื่อ</th>
            <th>ประเภท</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableItem()}
        </tbody>
      </table>
    )
  }
}

class ExaminerTableItem extends Component {
  render () {
    return (
      <tr className="examiner-table-user"
        onClick={(e) => { this.props.inspectItem(e) }}
        index={this.props.itemIndex}>
        <td>{`${this.props.itemData.firstName} ${this.props.itemData.lastName}`}</td>
        <td>{this.props.itemData.typeOfUser}</td>
      </tr>
    )
  }
}

class SelectedExaminerTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRow: null
    }

    this.renderTableItem = this.renderTableItem.bind(this)
  }

  inspectItem (e) {
    const parent = e.target.parentElement
    if (parent.classList.contains('examiner-table-item')) {
      if (!parent.classList.contains('is-active')) {
        if (this.state.selectedRow !== null) {
          this.state.selectedRow.classList.remove('is-active')
        }
        parent.classList.add('is-active')
        this.setState({
          selectedRow: parent
        })
        this.props.setDelete(this.props.Examiner[parent.getAttribute('index')])
      }
    }
  }

  renderTableItem () {
    var items = []
    for (var i = 0; i < this.props.Examiner.length; i++) {
      items[i] = <SelectedExaminerTableItem
        key={i}
        itemIndex={i}
        inspectItem={(e) => { this.inspectItem(e) }}
        itemDataFirstName={this.props.Examiner[i].firstName}
        itemDataLastName={this.props.Examiner[i].lastName}
        itemDataType={this.props.Examiner[i].typeOfUser}
        itemDataRoom={this.props.Examiner[i].room}
        itemDataTime={this.props.Examiner[i].time}
      />
    }
    return items
  }

  render () {
    return (
      <table className="table examiner-table">
        <thead>
          <tr className="is-header">
            <th>ชื่อ</th>
            <th>ประเภท</th>
            <th>ห้อง</th>
            <th>เวลา</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableItem()}
        </tbody>
      </table>
    )
  }
}

class SelectedExaminerTableItem extends Component {
  render () {
    return (
      <tr className="examiner-table-item"
        onClick={(e) => { this.props.inspectItem(e) }}
        index={this.props.itemIndex}>
        <td>{`${this.props.itemDataFirstName} ${this.props.itemDataLastName}`}</td>
        <td>{this.props.itemDataType}</td>
        <td>{this.props.itemDataRoom}</td>
        <td>{this.props.itemDataTime}</td>
      </tr>
    )
  }
}

export default ExaminersManage
