/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/ExamScoreSceen.css'

// import Modal from '../Utilities/Modal';
import ScoreTable from './ScoreTable'

class ExamScoreSceen extends Component {

  constructor (props) {
    super(props)

    this.state = {
      selectedYear: 2562,
      idSelectedYear: 'YearSelect',
      searchInput: ''
    }

    this.handleSelectYear = this.handleSelectYear.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearchButton = this.handleSearchButton.bind(this)
  }

  handleSelectYear (e) {
    const target = e.target
    const name = target.options[target.selectedIndex].value

    this.setState({
      selectedYear: name
    })
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  handleSearchButton () {
    this.ScoreTable.loadDataBySubjectID(this.searchInput)
  }

  render () {
    return (
      <div className="subcontent-main-div score-exam">
        <div className="score-exam-box box with-title is-round">
          <div className="box-title is-violet">
                        ดูคะแนนสอบ
          </div>
          <div className="box-content">
            <div className="columns">
              <div className="column is-8">
                <div className="input-with-text">
                  <label className="label">ค้นหาคะแนนสอบ </label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <label className="label">ปีการศึกษา </label>
                  <select className="exam-score-select-box"
                    id="YearSelect"
                    onChange={this.handleSelectYear} 
                  >
                  </select>
                </div>
                                &nbsp;&nbsp;&nbsp;
                <div className="input-with-text">
                  <label className="label">รหัสวิชา : </label>
                  <input className="input is-userId-width" type="text" id="subjectId" name="searchInput" onChange={this.handleInputChange} />
                </div>
                <div className="input-with-text">
                  <button type="submit"><i className="fa fa-search height50" onClick={this.handleSearchButton}>
                  </i></button>
                </div>
              </div>

            </div>
            <br></br>
            <div>
              <span className="score-tab-is-15">วิชาที่ประกาศคะแนนสอบ</span>
            </div>
            <br></br>
            <div className="table-div columns is-stay-top">
              <div className="column is-8 user-column-table">
                <ScoreTable
                  ref={instance => { this.scoreTable = instance }}
                  // showManageModal={() => { this.managePopup.showManageModal("view") }}
                  selectedYear={this.state.selectedYear}
                  idSelectedYear={this.state.idSelectedYear}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default ExamScoreSceen
