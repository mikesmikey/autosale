/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ClientService from '../Utilities/ClientService'
import Modal from '../Utilities/Modal'

import '../../StyleSheets/ExamRoomsModal.css'

const CServiceObj = new ClientService()
class ExamRoomsModal extends Component {
  _isMounted = false;
  constructor (props) {
    super(props)
    this._isMounted = true
    this.state = {
      seatOrderTypeRadio: 'shuffle',
      seatLineUpType: 'vertical',
      selectedExamRoom: '',
      dataExam: [],
      selectedRow: null
    }

    this.seatOrderRadioHandle = this.seatOrderRadioHandle.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectType = this.handleSelectType.bind(this)
    this.loadDataIntoTable = this.loadDataIntoTable.bind(this)
    this.handleBackButton = this.handleBackButton.bind(this)
    this.setSelectedExamRoom = this.setSelectedExamRoom.bind(this)
    this.setDataExam = this.setDataExam.bind(this)
    this.checkSeat = this.checkSeat.bind(this)
  }

  componentDidMount () {
    this.reloadTable()
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  componentDidUpdate () {
    if (this._isMounted) {
      if (this.state.seatLineUpType !== this.state.dataExam.seatLineUpType || this.state.seatOrderTypeRadio !== this.state.dataExam.seatOrderType) {
        CServiceObj.updateExamSeatType(this.props.selectedExam._id, this.state.seatLineUpType, this.state.seatOrderTypeRadio)
      }
    }
  }

  checkSeat (data) {
    if (data.seatLineUpType === undefined || data.seatOrderType === undefined) {
      CServiceObj.updateExamSeatType(this.props.selectedExam._id, this.state.seatLineUpType, this.state.seatOrderTypeRadio)
      this.reloadTable()
    } else {
      this.setDataExam(data)
    }
  }

  reloadTable () {
    CServiceObj.getExamByObjId(this.props.selectedExam._id).then((data) => {
      this.checkSeat(data)
    })
  }

  setDataExam (data) {
    if (this._isMounted) {
      this.setState({
        dataExam: data,
        seatLineUpType: data.seatLineUpType,
        seatOrderTypeRadio: data.seatOrderType
      })
      if (data.rooms) {
        this.setState({
          selectedExamRoom: data.rooms[0]
        })
      }
    }
  }

  loadDataIntoTable () {
    if (this.state.dataExam.rooms === undefined || this.state.dataExam.rooms.length === 0) {

    } else {
      var returnData = []
      for (var i = 0; i < this.state.dataExam.rooms.length; i++) {
        var startTimeToString = this.state.dataExam.rooms[i].startTime.toString()
        var finishTime = this.state.dataExam.rooms[i].startTime + this.state.dataExam.rooms[i].hours
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

        var setTime = startTimeToString + '-' + finishTimeToString

        returnData[i] = <ExamRoomsTableItem
          key={i}
          selectItem={(e) => { this.selectItem(e) }}
          itemIndex={i}
          itemData={this.state.dataExam.rooms[i]}
          time={setTime}
        />
      }
      return returnData
    }
  }

  renderTableHead () {
    return (
      <tr className="is-header">
        <th>เวลา</th>
        <th>รหัสห้อง</th>
        <th>จำนวนคน</th>
      </tr>
    )
  }

  handleBackButton () {
    this.props.showModal('examManageModal')
  }

  seatOrderRadioHandle (e) {
    const target = e.target
    const value = target.name

    this.setState({
      seatOrderTypeRadio: value
    })
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
    const name = target.options[target.selectedIndex].value

    this.setState({
      seatLineUpType: name
    })
  }

  setSelectedExamRoom (rooms) {
    this.setState({
      selectedExamRoom: rooms
    })
  }

  selectItem (e) {
    const parent = e.target.parentElement
    if (parent.classList.contains('course-table-item')) {
      if (!parent.classList.contains('is-active')) {
        if (this.state.selectedRow != null) {
          this.state.selectedRow.classList.remove('is-active')
        }
        parent.classList.add('is-active')
        this.setState({
          selectedRow: parent
        })
        this.setSelectedExamRoom(this.state.dataExam.rooms[parent.getAttribute('index')])
      }
    }
  }

  render () {
    return (
      <div className="exam-rooms-modal box with-title">
        <div className="box-title is-violet">
          <h3 className="label is-2">เพิ่มห้องสอบ</h3>
          <button className="exit-button fas fa-times fa-1x" onClick={this.props.closeModal}></button>
        </div>
        <div className="box-content">
          <div className="exam-rooms-table-area">
            <table className="table exam-rooms-table">
              <thead>
                {this.renderTableHead()}
              </thead>
              <tbody>
                {this.loadDataIntoTable()}
              </tbody>
            </table>
          </div>
          <div className="exam-rooms-manage-area">
            <p className="label is-3">การจัดที่นั่ง</p>
            <span className="input-set">
              <input type="radio" name="shuffle" onChange={this.seatOrderRadioHandle} checked={this.state.seatOrderTypeRadio === 'shuffle'} />
              <p className="label is-3">แบบสุ่ม</p>
            </span>
            <span className="input-set">
              <input type="radio" name="normal" onChange={this.seatOrderRadioHandle} checked={this.state.seatOrderTypeRadio === 'normal'} />
              <p className="label is-3">แบบเรียง</p>
            </span>
            <span className="input-set">
              <p className="label is-3">รูปแบบ</p>
              <select className="select" style={{ width: '150px' }} onChange={this.handleSelectType} value={this.state.seatLineUpType}>
                <option value="vertical">แนวตั้ง</option>
                <option value="horizontal">แนวนอน</option>
              </select>
            </span>
          </div>
          <div className="exam-rooms-button-area">
            <button className="button is-3 is-oros is-round" style={{ width: '130px' }} onClick={() => { this.props.showModal('addRoomDetailModal') }}>เพิ่มห้อง</button>
            <button className="button is-3 is-yentafo is-round" style={{ width: '130px' }} onClick={() => { this.deleteExamRoomPopUp.showModal() }}>ลบห้อง</button>
            <button className="button is-3 is-banana  is-round" style={{ width: '130px' }} onClick={this.handleBackButton}>ย้อนกลับ</button>
          </div>
        </div>
        <Modal ref={instance => { this.deleteExamRoomPopUp = instance }} content={
          <DeleteExamRoomPopUp closeDeleteExamRoomPopUp={() => { this.deleteExamRoomPopUp.closeModal() }}
            selectedExamRoom={this.state.selectedExamRoom}
            exam={this.props.selectedExam}
            reloadTable={() => { this.reloadTable() }}
          />}
        />
      </div>
    )
  }
}

class ExamRoomsTableItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      setTime: ''
    }
    this.renderItem = this.renderItem.bind(this)
  }

  renderItem () {
    return (
      <tr className="course-table-item"
        onClick={(e) => { this.props.selectItem(e) }}
        index={this.props.itemIndex}
      >
        <td>{this.props.time}</td>
        <td>{this.props.itemData.roomId}</td>
        <td>{this.props.itemData.maxStudent}</td>
      </tr>
    )
  }

  render () {
    return (this.renderItem())
  }
}

class DeleteExamRoomPopUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
    this.deleteButtonHandle = this.deleteButtonHandle.bind(this)
  }

  deleteButtonHandle () {
    console.log(this.props.exam._id, this.props.selectedExamRoom.roomId, this.props.selectedExamRoom.startTime)
    CServiceObj.deleteExamRoom(this.props.exam._id, this.props.selectedExamRoom.roomId, this.props.selectedExamRoom.startTime).then((result) => {
      if (result) {
        alert('ลบสำเร็จ')
        this.props.closeDeleteExamRoomPopUp()
        this.props.reloadTable()
      } else {
        alert('ลบไม่สำเร็จ!')
        this.props.closeDeleteExamRoomPopUp()
      }
    })
  }

  render () {
    return (
      <div className="box " style={{ width: '400px' }}>
        <div className="columns">
          <label className="label font-size-1" >ต้องการลบหรือไม่</label>
        </div>
        <br />
        <div className="columns">
          <button className="button is-oros is-round" onClick={this.deleteButtonHandle}>ตกลง</button>
          <button className="button is-yentafo is-round" onClick={this.props.closeDeleteExamRoomPopUp}>ยกเลิก</button>
        </div>
      </div>
    )
  }
}

export default ExamRoomsModal
