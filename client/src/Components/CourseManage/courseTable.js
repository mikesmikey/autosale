/* eslint-disable no-unused-vars */

import React, { Component } from 'react'
import ClientService from '../Utilities/ClientService'

const ServiceObj = new ClientService()

class courseTable extends Component {
  _isMounted = false;

  constructor (props) {
    super(props)

    this._isMounted = true

    this.state = {
      selectedRow: null,
      data: []
    }

    this.loadDataIntoTable = this.loadDataIntoTable.bind(this)
    this.inspectItem = this.inspectItem.bind(this)
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  renderTableHead () {
    return (
      <tr className="is-header">
        <th>รหัสวิชา</th>
        <th >ชื่อวิชา</th>
        <th >จำนวนนิสิต</th>
        <th >สถานะ</th>
      </tr>
    )
  }

  loadAllDataCourse () {
    ServiceObj.AddTeacherNameSubjectCurrent().then((courseData) => {
      if (this._isMounted) {
        this.setState({ data: courseData })
      }
    })
  }
  selectItem (e) {
    const parent = e.target.parentElement
    if (parent.classList.contains('course-table-item')) {
      this.props.setSelectedCourse(this.state.data[parent.getAttribute('index')][0])
    }
  }
  inspectItem (e) {
    const parent = e.target.parentElement
    if (parent.classList.contains('course-table-item')) {
      this.props.setSelectedCourse(this.state.data[parent.getAttribute('index')][0])
    }
    this.props.showManageModal()
  }
  deleteSelectedItem () {
    const index = Number.parseInt(this.state.selectedRow.getAttribute('index'), 10)
    var arr = this.state.data
    arr.splice(index, 1)
    this.setState({
      data: arr
    })
  }

  loadDataIntoTable () {
    var DataObj = []
    for (var i = 0; i < this.state.data.length; i++) {
      DataObj[i] = <CourseTableItem
        selectItem={(e) => { this.selectItem(e) }}
        inspectItem={(e) => { this.inspectItem(e) }}
        key={i}
        itemData={this.state.data[i][0]}
        itemIndex={i}
      />
    }
    return DataObj
  }

  render () {
    return (
      <table className="user-table" id="courseTable" >
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

class CourseTableItem extends Component {
  constructor (props) {
    super(props)
    this.renderItemByType = this.renderItemByType.bind(this)
  }
  renderItemByType () {
    return (
      <tr className="course-table-item"
        onClick={(e) => { this.props.selectItem(e) }}
        onDoubleClick={(e) => { this.props.inspectItem(e) }}
        index={this.props.itemIndex}
      >

        <td id="tableUserId">{this.props.itemData.subjectNumber}</td>
        <td>{this.props.itemData.subjectName}</td>
        <td>{this.props.itemData.students}</td>
        <td>{this.props.itemData.status}</td>
      </tr>

    )
  }

  render () {
    return (this.renderItemByType())
  }
}

export default courseTable
