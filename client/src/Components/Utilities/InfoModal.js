/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Modal from './Modal'

class InfoModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      info: ''
    }
  }

  showModal (info) {
    this.setState({
      info: info
    })
    this.modal.showModal()
  }

  render () {
    return (
      <Modal ref={instance => { this.modal = instance }} content={
        <div className="box with-title is-round" style={{ width: '400px' }}>
          <div className="box-title is-oros">
            Information
          </div>
          <div className="box-content" style={{ textAlign: 'center' }}>
            <p>{this.state.info}</p>
            <div className="button is-oros" onClick={() => { this.modal.closeModal() }}>
            ตกลง
            </div>
          </div>
        </div>
      }/>
    )
  };
}

export default InfoModal
