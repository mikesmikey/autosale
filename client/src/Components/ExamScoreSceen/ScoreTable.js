/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'

import ClientService from '../Utilities/ClientService'

const ServiceObj = new ClientService()

class ScoreTable extends Component {
  constructor (props) {
    super(props)

    this._isMounted = true

    this.state = {
      selectedRow: null,
      data: []
    }
    this.id = 11111111
    this.ScoreAll = []
    this.selectedYear = 2562

    this.loadData = this.loadData.bind(this)
    this.loadDataIntoTable = this.loadDataIntoTable.bind(this)
  }

  renderTableHead () {
    return (
      <tr className="is-header">
        <th>วันที่ประกาศ</th>
        <th >รหัสวิชา</th>
        <th>ชื่อวิชา</th>
        <th >ประเภท</th>
      </tr>
    )
  }

  loadDataByYear() {
   // ServiceObj.getAllExamByYear().then((usersData) => {
    //    this.setState({ data: usersData })
    //})
  }

  loadDataBySubjectID(subjectId) {
    
  }

  loadDataIntoTable () {
    var returnData = []
    this.loadDataByYear()
    for (var i = 0; i < this.state.data.length; i++) {
      if(this.state.data[i].scoreAnoucementDay != "") {
        for (var j = 0; j < this.state.data[i].ExamSeat.length; j++) {
          if(this.state.data[i].ExamSeat[j].studentCode == this.id) {
            returnData[i] = <ScoreTableItem
            key={i}
            itemIndex={i}
            itemData={this.state.data[i]}
            ScoreAll={this.state.data[i]}
          />
          }
        }
      }
    }

    return returnData
  }

  

  render () {
    return (
      <table className="score-table" id="scoreTable" >
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

class ScoreTableItem extends Component {
  constructor (props) {
    super(props)
    this.renderItemByType = this.renderItemByType.bind(this)
  }

  renderItemByType () {
    return (
      <tr className="user-table-item"
        onDoubleClick={(e) => { this.props.inspectItem(e) }}
        index={this.props.itemIndex}
      >
        <td>{this.props.itemData.scoreAnoucementDay}</td>
        <td>{this.props.itemData.subjectId}</td>
        <td>{this.props.itemData.subjectId}</td>
        <td>{this.props.itemData.category}</td>
      </tr>
    )
  }

  render () {
    return (this.renderItemByType())
  }
}

export default ScoreTable
