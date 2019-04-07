/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'

import ClientService from '../Utilities/ClientService'

import ExamTable from './ExamTable'
import DataAddModal from './DataAddModal'

import '../../StyleSheets/ExamCreateScreen.css'

class ExamCreateScreen extends Component {
  _isMounted = false

  constructor (props) {
    super(props)

    this.state = {
      termRadioValue: 'middle',
      subjects: []
    }

    this._isMounted = true

    this.handleRadioInput = this.handleRadioInput.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.loadAllSubject = this.loadAllSubject.bind(this)
  }

  componentDidMount () {
    this.loadAllSubject()
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  loadAllCurrentCourse () {
    new ClientService().getAllSubject().then((result) => {
      this.setState({
        subjects: result
      })
      console.log(this.state.subjects)
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

  handleRadioInput (e) {
    const target = e.target
    const name = target.name

    console.log(name)

    this.setState({
      termRadioValue: name
    })
  }

  render () {
    return (
      <div className="subcontent-main-div exam-create-screen">
        <div className="box with-title is-round">
          <div className="box-title is-violet">
            เพิ่มการสอบ
          </div>
          <div className="box-content">
            <div className="search-area">
              <div className="columns is-stay-top">
                <div className="column is-1">
                  <p className="label is-3" style={{ marginTop: '0' }}>รหัสวิชา</p>
                </div>
                <div className="column">
                  <input className="input is-full-width" type="text" placeholder="ค้นหา" />
                  <span className="input-set">
                    <input type="radio" name="middle" onChange={this.handleRadioInput} checked={this.state.termRadioValue === 'middle'}/>
                    <p className="label is-3">กลางภาค</p>
                  </span>
                  <span className="input-set">
                    <input type="radio" name="final" onChange={this.handleRadioInput} checked={this.state.termRadioValue === 'final'}/>
                    <p className="label is-3">ปลายภาค</p>
                  </span>
                </div>
                <div className="column is-not-grow">
                  <button className="button is-oros is-round" style={{ marginTop: '0' }}>ค้นหา</button>
                </div>
              </div>
            </div>
            <div className="exam-table-area">
              <ExamTable />
            </div>
            <div className="exam-button-area">
              <button className="button is-3 is-oros is-round" style={{ width: '130px' }} onClick={() => { this.dataAddModal.showModal('dateModal') }}>เพิ่มการสอบ</button>
              <button className="button is-3 is-orange is-round" style={{ width: '130px' }} onClick={() => { this.dataAddModal.showModal('examinersManageModal') }}>เพิ่มข้อมูล</button>
              <button className="button is-3 is-yentafo is-round" style={{ width: '130px' }}>ยกเลิกการสอบ</button>
            </div>
          </div>
        </div>
        <DataAddModal ref={instance => { this.dataAddModal = instance }}/>
      </div>
    )
  }
}

export default ExamCreateScreen
