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
    var items = []
    for (var i = 0; i < 50; i++) {
      items[i] = <ExamTableItem key={i}/>
    }
    return items
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
        <td>jeff</td>
        <td>jeff</td>
        <td>jeff</td>
      </tr>
    )
  }
}

export default ExamTable
