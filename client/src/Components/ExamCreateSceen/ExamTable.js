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
    if (this.props.courses) {
      return this.props.courses.map((course) => {
        return <ExamTableItem course={course} />
      })
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
        <td>{this.props.course.SubjectId}</td>
        <td>{this.props.course.SubjectName}</td>
        <td>{this.props.course.Status}</td>
      </tr>
    )
  }
}

export default ExamTable
