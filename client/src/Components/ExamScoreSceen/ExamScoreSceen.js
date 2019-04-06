/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/ExamScoreSceen.css'


import Modal from '../Utilities/Modal'
import ScoreTable from './ScoreTable'
import ExamScorePopUp from './ExamScorePopUp'

class ExamScoreSceen extends Component {
  
  _isMounted = false;

  constructor (props) {
    super(props)

    this.state = {
      Username: '11111111',
      selectedYear: 2562,
      idSelectedYear: 'YearSelect',
      searchInput: '',
      isDataLoading: false,
      SelectedScore: false,
      SelectedSubject: false
    }

    this._isMounted = true
    
    this.handleSelectYear = this.handleSelectYear.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearchButton = this.handleSearchButton.bind(this)
    this.setDataLoadingStatus = this.setDataLoadingStatus.bind(this)
    this.setSelectedScore = this.setSelectedScore.bind(this)
    this.setSelectedSubject = this.setSelectedSubject.bind(this)
    this.setUsername = this.setUsername.bind(this)
  }

  setSelectedScore (score) {
    this.setState({
      SelectedScore: score
    })
  }

  setSelectedSubject (Subjecte) {
    this.setState({
      SelectedSubject: Subjecte
    })
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

  componentDidMount () {
    this.scoreTable.loadDataBySubjectID(this.state.searchInput, this.state.Username)
  }

  handleSearchButton () {
    this.scoreTable.loadDataBySubjectID(this.state.searchInput, this.state.Username)
  }

  setDataLoadingStatus (status) {
    this.setState({
      isDataLoading: status
    })
  }

  setUsername (User) {
    this.setState({
      Username: User
    })
  }

  render () {
    return (
      <div className="subcontent-main-div score-exam">
        <div className="score-exam-box box with-title is-round">
          <div className="box-title is-violet">
                        ดูคะแนนสอบ
          </div>
          <div className="box-content">
            <div className={`columns ${this.state.isDataLoading ? 'disabled' : ''}`}>
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
                  showManageModal={() => { this.managePopup.showManageModal('view') }}
                  username={this.state.Username}
                  SearchInput={this.state.searchInput}
                  selectedYear={this.state.selectedYear}
                  idSelectedYear={this.state.idSelectedYear}
                  isDataLoading={this.state.isDataLoading}
                  setDataLoadingStatus={this.setDataLoadingStatus}
                  setSelectedScore={this.setSelectedScore}
                  setSelectedSubject={this.setSelectedSubject}
                />
              </div>
            </div>
          </div>
        </div>
        <Modal ref={instance => { this.manageUserModal = instance }} content={
          <ExamScorePopUp
            ref={instance => { this.managePopup = instance }}
            closeModal={() => {
              this.manageUserModal.closeModal()
            }}
            showModal={() => {
              this.manageUserModal.showModal()
            }}
            username={this.state.Username}
            SelectedScore={this.state.SelectedScore}
            SelectedSubject={this.state.SelectedSubject}
            isDataLoading={this.state.isDataLoading}
            setDataLoadingStatus={this.setDataLoadingStatus}
          />
        }
        />
      </div>
    )
  }
}

export default ExamScoreSceen
