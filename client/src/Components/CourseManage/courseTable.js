/* eslint-disable no-unused-vars */

import React, { Component } from 'react'
import CCourseService from '../../Services/CourseService'
import ErrorModal from '../Utilities/ErrorModal'
import InfoModal from '../Utilities/InfoModal'
import '../../StyleSheets/mainMenuBar.css'
import {
  Link
} from 'react-router-dom'
const CourseService = new CCourseService()

class courseTable extends Component {
  _isMounted = false;

  constructor (props) {
    super(props)

    this._isMounted = true

    this.state = {
      selectedRow: null,
      data: [],
      dataRow:[]
    }
    this.setDataRow = this.setDataRow.bind(this)
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
    CourseService.getAllDataCoures().then((courseData) => {
      if (this._isMounted) {
        this.setState({ data: courseData })
      }
    })
  }
  setDataRow(index){
    this.setState({dataRow: this.state.data[index][0]})
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
        this.setDataRow(parent.getAttribute('index'))
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
      this.errorModal.showModal('กรุณาเลือกกการเรียนที่ต้องการก่อน')
    } else {
      if (this.state.dataRow.courseId !== '' && this.state.dataRow.subjectNumber !== '') {
        CourseService.deleteCourse(this.state.dataRow.subjectNumber, this.state.dataRow.courseId).then((data) => {
          // eslint-disable-next-line no-constant-condition
            if (data) {
              this.infoModal.showModal('ลบข้อมูลสำเร็จ')
              this.deleteItemByname(this.state.dataRow.subjectName)
              
            } else {
             this.errorModal.showModal('เกิดข้อผิดพลาด ลบไม่สำเร็จ')
            }
          })
      }
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
        <Link to='add_course'>
        <button className="button is-oros is-round is-pulled-right" >เพิ่มการเรียน</button>
        </Link>
          <button className="button is-oros is-round is-pulled-right" onClick={() => { this.deleteButtonHandle() }} >ลบการเรียน</button>
        </div>
        <ErrorModal
              ref={instance => { this.errorModal = instance }}
            />
            <InfoModal
              ref={instance => { this.infoModal = instance }}
            />
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
