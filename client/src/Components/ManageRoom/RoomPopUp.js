/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import '../../StyleSheets/ExamScoreSceen.css'



// eslint-disable-next-line react/require-render-return
class RoomPopUp extends Component {
  
  _isMounted = false;

  constructor (props) {
    super(props)

    this.state = {
      Username: '11111111',
      selectedYear: '2562',
      idSelectedYear: 'YearSelect',
      searchInput: '',
      isDataLoading: false,
      SelectedScore: false,
      SelectedSubject: false
    }

    this._isMounted = true
    

  }





  render () {
    
  }
}

export default RoomPopUp
