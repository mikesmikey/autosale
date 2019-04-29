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
    this.deleteItemByname = this.deleteItemByname.bind(this)
  }
  deleteItemByname (name) {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i][0].subjectName === name) {
        var CopyData = this.state.data
        CopyData.splice(i, 1)
        this.setState({ data: CopyData })
        return true
      }
    }
    return false
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
      </tr>
    )
  }

  loadAllDataCourse () {
    ServiceObj.getAllDataCoures().then((courseData) => {
      if (this._isMounted) {
        this.setState({ data: courseData })
      }
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
        this.props.setSelectedCourse(this.state.data[parent.getAttribute('index')][0])
      }
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
    console.log(this.state.data)
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

  deleteButtonHandle () {
    if (this.state.selectedRow === null) {
      alert('กรุณาเลือกกการเรียนที่ต้องการก่อน')
    } else {
      this.props.showDeleteModal()
    }
  }
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
        <div className='columns box-content'>
          <button className="button is-oros is-round is-pulled-right" >เพิ่มการเรียน</button>
          <button className="button is-oros is-round is-pulled-right" >เพิ่มข้อมูล</button>
          <button className="button is-oros is-round is-pulled-right" onClick={() => { this.deleteButtonHandle() }} >ลบการเรียน</button>
        </div>
      </div>
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
      </tr>

    )
  }

  render () {
    return (this.renderItemByType())
  }
}

export default courseTable
