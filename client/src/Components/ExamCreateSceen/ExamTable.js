/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

class ExamTable extends Component {
  _isMounted = false
  constructor (props) {
    super(props)

    this.state = {
      columns: [],
      rows: []
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  renderTableItem () {
    if (this.props.subjects) {
      var allElements = []
      this.props.subjects.forEach((subject) => {
        const elements = subject.courses.map((course) => {
          var courseData = {}
          courseData.subjectId = subject.subject_id
          courseData.subjectName = subject.subject_name
          courseData.status = false
          courseData.course = course
          return <ExamTableItem
            key={`${subject.subject_id}_${course.courseId}`}
            courseData={courseData}
          />
        })
        allElements = allElements.concat(elements)
      })
      return allElements
    }
    return null
  }

  render () {
    return (
      <table className="table exam-table">
        <thead>
          <tr className="is-header">
            <th>รหัสรายวิชา</th>
            <th>ชื่อวิชา</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableItem()}
        </tbody>
      </table>
    )
  }
}

class ExamTableItem extends Component {
  render () {
    return (
      <tr className="exam-table-item">
        <td>{this.props.courseData.subjectId}</td>
        <td>{this.props.courseData.subjectName}</td>
        <td>{this.props.courseData.status ? 'เยส' : 'โน'}</td>
      </tr>
    )
  }
}

export default ExamTable
