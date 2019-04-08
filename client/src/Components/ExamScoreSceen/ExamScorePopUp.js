import React, { Component } from 'react'

import ClientService from '../Utilities/ClientService'

const CServiceObj = new ClientService()

class ExamScorePopUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      popupStatus: 'view',
      scoreAnoucementDay: '',
      subjectId: 0,
      subjectName: '',
      category: '',
      standingInput: '',
      scoreMax: 0,
      score: 0
    }


    this.loadScoreInput = this.loadScoreInput.bind(this)
  }

  loadScoreInput () {
    this.setState({
      subjectId: this.props.SelectedScore.subjectId,
      category: this.props.SelectedScore.category,
      scoreMax: this.props.SelectedScore.maxScore
    })
    for (var j = 0; j < this.props.SelectedScore.ExamSeat.length; j++) {
      if (this.props.SelectedScore.ExamSeat[j].studentCode == this.props.username) {
        this.setState({
          score: this.props.SelectedScore.ExamSeat[j].score
        })
        break
      }
    }
    this.setState({
      subjectName: this.props.SelectedSubject.subject_name
    })
  }

  showManageModal () {
    this.loadScoreInput()
    this.props.showModal()
  }

  render () {
    return (
      <div className="box is-user-popUp" style={{ width: '500px' }}>
        <div>
          <h1 align="center">คะแนนสอบ</h1>
          <div className="columns input-div">
            <div className="column is-2">
              <label className="label">รหัสวิชา</label>
            </div>
            <div className="column">
              <input
                className="input is-full-width"
                type="text"
                value={this.state.subjectId}
              />
            </div>
          </div>

          <div className="columns input-div">
            <div className="column is-2">
              <label className="label">ชื่อวิชา</label>
            </div>
            <div className="column">
              <input
                className="input is-full-width"
                type="text"
                value={this.state.subjectName}
              />
            </div>
          </div>

          <div className="columns input-div">
            <div className="column is-2">
              <label className="label">ประเภท</label>
            </div>
            <div className="column">
              <input
                className="input is-full-width"
                type="text"
                value={this.state.category}
              />
            </div>
          </div>

          <div className="columns input-div">
            <div className="column is-2">
              <label className="label">คะแนนเต็ม</label>
            </div>
            <div className="column">
              <input
                className="input is-full-width"
                type="text"
                value={this.state.scoreMax}
              />
            </div>
          </div>

          <div className="columns input-div">
            <div className="column is-2">
              <label className="label">คะแนนที่ได้</label>
            </div>
            <div className="column">
              <input
                className="input is-full-width"
                type="text"
                value={this.state.score}
              />
            </div>
          </div>

          <br></br>
          <center><button className="button is-yentafo is-round" onClick={this.props.closeModal}>ออก</button>
          </center>
        </div>
      </div>
    )
  }
}

export default ExamScorePopUp

