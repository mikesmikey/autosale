/* eslint-disable no-unused-vars */

import React, { Component } from 'react'
import CExaminerService from '../../Services/ExaminerService'

const ExaminerService = new CExaminerService()

class courseTable extends Component {
  _isMounted = false;

  constructor (props) {
    super(props)

    this._isMounted = true

    this.state = {
      selectedRow: null,
      data: [],
      DataUser: []
    }

    this.loadDataIntoTable = this.loadDataIntoTable.bind(this)
    this.loadAllDataExaminer = this.loadAllDataExaminer.bind(this)
  }

  componentWillUnmount () {
    this._isMounted = false
  }
  renderTableHead () {
    return (
      <tr className="is-header">
        <th>รหัสวิชา</th>
        <th >ชื่อวิชา</th>
        <th >สถานที่</th>
        <th >เวลา</th>
        <th >วันที่</th>
      </tr>
    )
  }

  loadAllDataExaminer (username) {
    ExaminerService.getDataUserExamnier(username).then((examinerData) => {
      if (this._isMounted) {
        if (examinerData !== null) {
          this.setState({ DataUser: examinerData })
        }
      }
      // console.log('examinerData')
      console.log(examinerData.examList.length)

      if (examinerData !== null) {
        for (var i = 0; i < examinerData.examList.length; i++) {
          ExaminerService.getDataExam(examinerData.examList[i]).then((examData) => {
            ExaminerService.checkSubjecetCurrent(examData.subjectId).then((check) => {
              if (check) {
                var CopyData = this.state.data
                CopyData.push(examData)
                this.setState({ data: CopyData })
              }
            })
          })
        }
        console.log(this.state.data)
      }
    })
  }
  loadDataIntoTable () {
    var DataObj = []
    if (this.state.data.length !== 0) {
      for (var i = 0; i < this.state.data.length; i++) {
        console.log(this.state.DataUser)
        var listRoom = ExaminerService.getNumberRoom(this.state.DataUser.username, this.state.data[i])
        for (var j = 0; j < listRoom.length; j++) {
          DataObj[i] = <ExaminerTableItem
            key={i}
            itemIndex={i}
            subjectNumber={this.state.data[i].subjectId}
            subjectName={this.state.data[i].subjectName}
            examRoom={this.state.data[i].rooms[listRoom[j]].roomId}
            time={this.state.data[i].rooms[listRoom[j]].startTime}
            date={this.state.data[i].date}
          />
        }
        // DataObj[i] = <ExaminerTableItem
        //   key={i}
        //   itemData={this.state.data[i]}
        //   itemIndex={i}
        // />
      }
    }
    return DataObj
  }
  // {this.loadDataIntoTable()}
  render () {
    return (
      <div>
        <table className="user-table" id="courseTable" >
          <thead>
            {this.renderTableHead()}
          </thead>
          <tbody>
            {this.loadDataIntoTable()}
          </tbody>
        </table>
      </div>
    )
  }
}

class ExaminerTableItem extends Component {
  constructor (props) {
    super(props)
    this.renderItemByType = this.renderItemByType.bind(this)
  }
  renderItemByType () {
    return (
      <tr className="course-table-item"
        index={this.props.itemIndex}
      >

        <td id="tableUserId">{this.props.subjectNumber}</td>
        <td>{this.props.subjectName}</td>
        <td>{this.props.examRoom}</td>
        <td>{this.props.time} น.</td>
        <td>{this.props.date}</td>
      </tr>

    )
  }

  render () {
    return (this.renderItemByType())
  }
}

export default courseTable
