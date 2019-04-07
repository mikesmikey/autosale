/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/ExamTable.css'

class ExamTable extends Component {
  _isMounted = false;
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

  renderTableHead () {

  }

  renderTableItem () {

  }

  render () {
    return (
      <div className="exam-table">
        <div className="table-column">
        </div>
        <div className="table-body">
        </div>
      </div>
    )
  }
}

class ExamTableItem extends Component {
  render () {
    return (
      <tr>
        <td>dsfsdafsadfsadfsdasfda</td>
        <td>dsfsdafsadfsadfsdasfda</td>
        <td>dsfsdafsadfsadfsdasfda</td>
        <td>dsfsdafsadfsadfsdasfda</td>
      </tr>
    )
  }
}

export default ExamTable
