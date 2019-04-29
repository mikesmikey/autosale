
import React, { Component } from 'react'

import '../../StyleSheets/home.css'
import '../../StyleSheets/examineSchedule.css'
// eslint-disable-next-line no-unused-vars
import Modal from '../Utilities/Modal'
// eslint-disable-next-line no-unused-vars
import ExaminerTable from './eaminerTable.js'
// eslint-disable-next-line no-unused-vars

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
    this._isMounted = true
  }
  componentDidMount () {
    this.examinerTable.loadAllDataExaminer(this.props.username)
  }
  componentWillUnmount () {
    this._isMounted = false
  }
  render () {
    return (
      <div className="wigth100">
        <div className="colorDiv">
          <p className='font-size-2'>ตารางคุมสอบ </p>
        </div>
      <ExaminerTable ref={instance => { this.examinerTable = instance }}
      />
      </div>
    )
  }
}

export default App
