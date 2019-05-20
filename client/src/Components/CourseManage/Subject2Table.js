/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import CSubjectService from '../../Services/SubjectService'

// Object
import Subject from '../../Objects/Subject'

const SubjectService = new CSubjectService()

class Subject2Table extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      subjects: [] // store subject
    }

    this.loadDataBySubjectId = this.loadDataBySubjectId.bind(this)
    this.loadDataIntoTable = this.loadDataIntoTable.bind(this)
  }
    _isMounted = false

    componentDidMount () {
      this._isMounted = true
      this.loadDataBySubjectId(this.props.selectSubId)
    }

    componentWillUnmount () {
      this._isMounted = false
    }

    renderTableHead () {
      return (
        <tr className="is-header">
          <th>รหัสวิชา</th>
          <th>รายวิชา</th>
        </tr>
      )
    }

    loadDataBySubjectId (subIdInput) {
      SubjectService.searchAllSubjectBySubjectId(subIdInput).then((result) => {
        if (this._isMounted) {
          this.setState({ data: result })
        }
      })
    }

    SubjectObject (data) {
      return new Subject(data)
    }

    loadDataIntoTable () {
      var returnData = []
      for (var i = 0; i < this.state.data.length; i++) {
        returnData[i] = <SubjectTableItem
          key={i}
          // selectItem={(e) => { this.selectItem(e) }}
          // inspectItem={(e) => { this.inspectItem(e) }}
          // selectedType={this.props.selectedType}
          itemIndex={i}
          itemData={new Subject(this.state.data[i])}
          faculties={this.props.faculties}
        />
      }
      return returnData
    }

    render () {
      return (
        <table className="user-table" id="userTable">
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

class SubjectTableItem extends Component {
  constructor (props) {
    super(props)
  }

  renderSubjectField () {
    return (
      <tr className="user-table-item"
        index={this.props.itemIndex}
      >
        <td id="tableSubjectId">{this.props.itemData.subjectId}</td>
        <td>{this.props.itemData.subjectName}</td>
      </tr>
    )
  }

  render () {
    return (this.renderSubjectField())
  }
}

export default Subject2Table