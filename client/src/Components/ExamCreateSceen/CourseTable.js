/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

class CourseTable extends Component {
  _isMounted = false
  constructor (props) {
    super(props)

    this.state = {
      columns: [],
      rows: [],
      selectedRow: null
    }

    this.selectItem = this.selectItem.bind(this)
  }

  selectItem (e, courseData) {
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
        this.props.setSelectedCourse(courseData)
      }
    }
  }

  doubleClickItem (e) {
    const parent = e.target.parentElement
    if (parent.classList.contains('course-table-item')) {
      this.props.handleToggleExamManage()
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  renderTableItem () {
    if (this.props.subjects) {
      return this.props.subjects.map((subject) => {
        return subject.courses.map((course) => {
          let courseData = course
          courseData.subjectId = subject.subjectId
          courseData.subjectName = subject.subjectName
          return <CourseTableItem
            key={`${subject.subjectId}_${course.courseId}`}
            courseData={course}
            selectItem={(e, courseData) => { this.selectItem(e, courseData) }}
            doubleClickItem={(e) => { this.doubleClickItem(e) }}
          />
        })
      })
    }
    return null
  }

  render () {
    return (
      <table className="table course-table">
        <thead>
          <tr className="is-header">
            <th>รหัสรายวิชา</th>
            <th>ชื่อวิชา</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableItem()}
        </tbody>
      </table>
    )
  }
}

class CourseTableItem extends Component {
  render () {
    return (
      <tr
        className="course-table-item"
        onClick={(e) => { this.props.selectItem(e, this.props.courseData) }}
        onDoubleClick={(e) => { this.props.doubleClickItem(e) }}
      >
        <td>{this.props.courseData.subjectId}</td>
        <td>{this.props.courseData.subjectName}</td>
      </tr>
    )
  }
}

export default CourseTable
