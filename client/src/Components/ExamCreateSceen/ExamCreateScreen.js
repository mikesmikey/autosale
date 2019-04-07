/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'

import ExamTable from './ExamTable'

import '../../StyleSheets/ExamCreateScreen.css'

class ExamCreateScreen extends Component {
  render () {
    return (
      <div className="subcontent-main-div exam-create-screen">
        <div className="box with-title is-round">
          <div className="box-title is-violet">
            เพิ่มการสอบ
          </div>
          <div className="box-content">
            <div className="search-area">
              <div className="columns">
                <div className="column is-1">
                  <p className="label is-2">รหัสวิชา</p>
                </div>
                <div className="column">
                  <input className="input is-full-width" type="text" placeholder="ค้นหา" />
                </div>
                <div className="column is-not-grow">
                  <button className="button is-oros is-round">ค้นหา</button>
                </div>
              </div>
            </div>
            <div className="table-area">
              <ExamTable>
              </ExamTable>
            </div>
            <div className="button-area">
              button
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExamCreateScreen
