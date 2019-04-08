/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

class ExamTable extends Component {
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

  selectItem (e, examData) {
    const parent = e.target.parentElement
    if (parent.classList.contains('exam-table-item')) {
      if (!parent.classList.contains('is-active')) {
        if (this.state.selectedRow != null) {
          this.state.selectedRow.classList.remove('is-active')
        }
        parent.classList.add('is-active')
        console.log(examData)
        this.setState({
          selectedRow: parent
        })
      }
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  renderTableItem () {
    if (this.props.subjects) {
      return this.props.exams.map((exam) => {
        console.log(exam)
        return <ExamTableItem
          key={`${exam.subjectId}_${exam.courseId}`}
          examData={exam}
          selectItem={(e, examData) => { this.selectItem(e, examData) }}
        />
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
      <tr className="exam-table-item" onClick={(e) => { this.props.selectItem(e, this.props.examData) }}>
        <td>{this.props.examData.subjectId}</td>
        <td>{this.props.examData.subjectName}</td>
        <td>{this.props.examData.status}</td>
      </tr>
    )
  }
}

export default ExamTable
