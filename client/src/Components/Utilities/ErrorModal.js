/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Modal from './Modal'

class ErrorModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    }
  }

  showModal (error) {
    this.setState({
      error: error
    })
    this.modal.showModal()
  }

  render () {
    return (
      <Modal ref={instance => { this.modal = instance }} content={
        <div className="box with-title is-round" style={{ width: '400px' }}>
          <div className="box-title is-yentafo">
            Error!
          </div>
          <div className="box-content">
            <p>{this.state.error}</p>
            <div className="button is-yentafo" onClick={() => { this.modal.closeModal() }}>
            ตกลง
            </div>
          </div>
        </div>
      }/>
    )
  };
}

export default ErrorModal
