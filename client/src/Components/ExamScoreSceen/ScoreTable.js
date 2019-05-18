/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'

import CSubjectService from '../../Services/SubjectService'
import CExamService from '../../Services/ExamService'

const SubjectService = new CSubjectService()
const ExamService = new CExamService()

class ScoreTable extends Component {
  _isMounted = false;
  constructor (props) {
    super(props)

    this._isMounted = true

    this.state = {
      scoreAnoucementDay: '',
      subjectId: 0,
      subjectName: '',
      category: '',
      score: 0,
      maxScore: 0,
      couseId: 0,
      year: 2561,
      subjectNameArray: [],
      data: [],
      datata: [],
      CheckLoad: true
    }
    this.selectedRow = null
    this.YearAll = []
    this.check = 0
    this.test = 'final'
    this.testnum = 35

    this.loadDataIntoTable = this.loadDataIntoTable.bind(this)
    this.loadDataBySubjectID = this.loadDataBySubjectID.bind(this)
  }

  selectItem (e) {
    const parent = e.target.parentElement
    if (parent.classList.contains('score-table-item')) {
      if (!parent.classList.contains('is-active')) {
        parent.classList.add('is-active')
        this.setState({
          selectedRow: parent
        })
        this.props.setSelectedScore(this.state.data[parent.getAttribute('index')])
        for (var j = 0; j < this.state.subjectNameArray.length; j++) {
          if (this.state.subjectNameArray[j].subjectId === this.state.data[parent.getAttribute('index')].subjectId) {
            this.props.setSelectedSubject(this.state.subjectNameArray[j])
            break
          }
        }
      }
    }
  }

  inspectItem (e) {
    const parent = e.target.parentElement
    if (parent.classList.contains('score-table-item')) {
      this.props.showManageModal()
      this.props.setSelectedScore(this.state.data[parent.getAttribute('index')])
      for (var j = 0; j < this.state.subjectNameArray.length; j++) {
        if (this.state.subjectNameArray[j].subjectId === this.state.data[parent.getAttribute('index')].subjectId) {
          this.props.setSelectedSubject(this.state.subjectNameArray[j])
          break
        }
      }
    }
  }

  renderTableHead () {
    return (
      <tr className="is-header">
        <th>วันที่ประกาศ</th>
        <th >รหัสวิชา</th>
        <th>ชื่อวิชา</th>
        <th >ประเภท</th>
      </tr>
    )
  }

  loadDataBySubjectID (SubjectId, username) {
    ExamService.getAllExamBySubjectId(SubjectId, username).then((usersData) => {
      if (this._isMounted) {
        this.props.setDataLoadingStatus(false)
        this.setState({ data: usersData })
        // console.log(this.state.data)
      }
    })
    SubjectService.getAllSubject().then((SubjectData) => {
      this.setState({ subjectNameArray: SubjectData })
    })
  }

  loadDataIntoTable () {
    var returnData = []
    // this.loadDataBySubjectID(this.props.SearchInput, this.props.username)
    // console.log(this.state.data)
    var select = document.getElementById(this.props.idSelectedYear)
    for (var i = 0; i < this.state.data.length; i++) {
      for (var j = 0; j < this.state.subjectNameArray.length; j++) {
        if (this.state.subjectNameArray[j].subjectId === this.state.data[i].subjectId) { // subjectId
          for (var l = 0; l < this.state.subjectNameArray[j].courses.length; l++) {
            if (this.state.subjectNameArray[j].courses[l].courseId === this.state.data[i].courseId) { // addYearToSelect
              
              var el = document.createElement('option')
              el.value = this.state.subjectNameArray[j].courses[l].school_year
              el.textContent = this.state.subjectNameArray[j].courses[l].school_year

              if (this.YearAll.length === 0) {
                this.props.setSelectedYear(this.state.subjectNameArray[j].courses[l].school_year)
              }

              let num = 0
              if (this.YearAll.length === 0) {
                this.props.setSelectedYear(this.state.subjectNameArray[j].courses[l].school_year)
              }
              for (var z = 0; z < this.YearAll.length; z++) {
                if (this.YearAll[z] !== this.state.subjectNameArray[j].courses[l].school_year) {
                  num++
                }
              }
              if (num === this.YearAll.length) {
                select.appendChild(el)
                this.YearAll.push(this.state.subjectNameArray[j].courses[l].school_year)
              }
            }

            if (this.state.subjectNameArray[j].courses[l].school_year === this.props.selectedYear &&
                      this.state.subjectNameArray[j].courses[l].courseId === this.state.data[i].courseId
            ) {
              returnData[i] = <ScoreTableItem
                key={i}
                itemIndex={i}
                selectItem={(e) => { this.selectItem(e) }}
                inspectItem={(e) => { this.inspectItem(e) }}
                subject={this.state.subjectNameArray[j] }
                itemData={this.state.data[i]}
                ScoreAll={this.state.data[i]}
              />
              this.check = 1
              break
            }
          }
          if (this.check === 1) {
            this.check = 0
            break
          }
        }
      }
    }

    return returnData
  }

  render () {
    return (
      <table className="score-table" id="scoreTable" >
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

class ScoreTableItem extends Component {
  constructor (props) {
    super(props)
    this.renderItemByType = this.renderItemByType.bind(this)
  }

  renderItemByType () {
    return (
      <tr className="score-table-item"
        onClick={(e) => { this.props.selectItem(e) }}
        onDoubleClick={(e) => { this.props.inspectItem(e) }}
        index={this.props.itemIndex}
      >
        <td>{this.props.itemData.scoreAnoucementDay}</td>
        <td>{this.props.itemData.subjectId}</td>
        <td>{this.props.subject.subjectName}</td>
        <td>{this.props.itemData.category}</td>
      </tr>
    )
  }

  render () {
    return (this.renderItemByType())
  }
}

export default ScoreTable
