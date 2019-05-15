/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import CGlobalDataService from '../../Services/GlobalDataService'

// Components

import '../../StyleSheets/home.css'
import '../../StyleSheets/yearAndTermManage.css'
const GlobalDataService = new CGlobalDataService()

class YearAndTermManage extends Component {
  _isMounted = false;
  constructor (props) {
    super(props)
    this._isMounted = true
    this.state = {
      cStudyYear: '-',
      cStudyTerm: '-',
      yearInput: '',
      termInput: 0
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.updateButtonHandle = this.updateButtonHandle.bind(this)
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  loadYearAndTerm () {
    GlobalDataService.getYearAndTerm().then((data) => {
      this.setYearAndTerm(data.currentStudyYear, data.currentStudyTerm)
    })
  }

  setYearAndTerm (year, term) {
    if (this._isMounted) {
      this.setState({
        cStudyYear: year,
        cStudyTerm: term
      })
    }
  }

  setYearAndTermInput (year, term) {
    if (this._isMounted) {
      this.setState({
        yearInput: year,
        termInput: term
      })
    }
  }
  updateButtonHandle () {
    // eslint-disable-next-line radix
    var yearInt = parseInt(this.state.yearInput)
    // eslint-disable-next-line radix
    var termInt = parseInt(this.state.termInput)
    if (yearInt <= 0 || isNaN(yearInt) || this.state.termInput === '0') {
      alert('กรุณาใส่ข้อมูลให้ถูกต้อง')
    } else {
      var newGlobalData = {}
      newGlobalData.currentStudyYear = yearInt
      newGlobalData.currentStudyTerm = termInt

      const globalObj = GlobalDataService.createGlobalDataObject(newGlobalData)
      GlobalDataService.editGlobalData(globalObj.getGlobalObjectData()).then((result) => {
        if (result) {
          this.setYearAndTerm(this.state.yearInput, this.state.termInput)
          this.setYearAndTermInput('', 0)
          alert('อัพเดทสำเร็จ')
        } else {
          alert('อัพเดทไม่สำเร็จ!')
        }
        // document.getElementById("showYear").innerHTML = "ปีการศึกษา : " + cStudyYear
        // document.getElementById("showTerm").innerHTML = "เทอม : " + cStudyTerm
      })
    }
  }
  componentDidMount () {
    this.loadYearAndTerm()
  }

  render () {
    return (

      <div className="subcontent-main-div global">
        <div className="box with-title is-round ">
          <div className="box-title is-violet">
          จัดการปีการศึกษา

          </div>
          <div className="box-content">
            <div className="columns">
              <div className="column is-6">
                <div className="tab-is-1">
                  <label className="label font-size-2" >ปัจจุบัน</label>
                </div>
              </div>
              <div className="column">

              </div>
            </div>
            <div className="columns">
              <div className="column is-4 border-1">
                <div className="tab-is-1">
                  <label className="label font-size-1">ปีการศึกษา : {this.state.cStudyYear}</label>

                </div>
                <div className="tab-is-1">
                  <label className="label font-size-1">เทอม : {this.state.cStudyTerm}</label>

                </div>
              </div>
              <div className="column">
              </div>
            </div>
            <div>
              <span className="tab-is-15"></span>
            </div>
            <div className="columns">
              <div className="column is-6">
                <div className="tab-is-1">

                  <label className="label font-size-2" >อัพเดทปีการศึกษา</label>
                </div>
              </div>
              <div className="column">
              </div>
            </div>
            <div className="columns">
              <div className="column is-year border-2">
                <div className="tab-is-1">
                  <label className="label font-size-1" >ปีการศึกษา : </label>
                  <input className="input is-year-width " type="text" id="input_year" value={this.state.yearInput} name="yearInput" onChange={this.handleInputChange} />
                </div>
                <div className="tab-is-1">
                  <label className="label font-size-1 tab-is-16 ">เทอม : </label>
                  <span className="tab-is-17"></span>
                  <select className="user-mange-select-box" id="select_term" value={this.state.termInput} name="termInput" onChange={this.handleInputChange}>
                    <option value="0"></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <br />
                <br />
                <div className="tab-is-1 set-button-update">
                  <button className="button is-oros is-round" onClick={this.updateButtonHandle}>อัพเดท</button>
                </div>
                <div>
                  <span className="tab-is-15"></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default YearAndTermManage
