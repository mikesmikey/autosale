/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import Modal from '../Utilities/Modal'

import ExamSelectDate from './ExamSelectDate'
import ExamRoomsManage from './ExamRoomsManage'
import ExamAddRoomDetail from './ExamAddRoomDetail'
import ExaminersManage from './ExaminersManage'

class DataAddModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentModal: 'dateModal'
    }

    this.setModal = this.setModal.bind(this)
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  setModal (modal) {
    this.setState({
      currentModal: modal
    })
  }

  showModal (modal) {
    this.setModal(modal)
    this.mainModal.showModal()
  }

  closeModal () {
    this.mainModal.closeModal()
  }

  decideModal () {
    const decideTable = {
      'dateModal': <ExamSelectDate
        closeModal={this.closeModal}
        selectedExam={this.props.selectedExam}
        setSelectedExam={this.props.setSelectedExam}
      />,
      'roomsManageModal': <ExamRoomsManage
        closeModal={this.closeModal}
        showModal={this.showModal}
        selectedExam={this.props.selectedExam}
      />,
      'addRoomDetailModal': <ExamAddRoomDetail
        closeModal={this.closeModal}
        showModal={(modal) => { this.showModal(modal) }}
        selectedExam={this.props.selectedExam}
      />,
      'examinersManageModal': <ExaminersManage closeModal={this.closeModal}/>
    }

    return decideTable[this.state.currentModal]
  }

  render () {
    return (
      <div className="data-add-modal">
        <Modal ref={instance => { this.mainModal = instance }} content={
          this.decideModal()
        }/>
      </div>
    )
  }
}

export default DataAddModal
