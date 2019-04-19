/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import Modal from '../Utilities/Modal'

import ExamAddSimpleData from './ExamAddSimpleData'
import ExamRoomsManage from './ExamRoomsManage'
import ExamAddRoomDetail from './ExamAddRoomDetail'
import ExaminersManage from './ExaminersManage'
import ExamManage from './ExamManage'

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
    this.setState({
      currentModal: ''
    })
  }

  componentWillUpdate () {
    if (this.examManageModal) {
      if (this.examManageModal.state.selectedExam) {
        this.selectedExam = this.examManageModal.state.selectedExam
      }
    }
  }

  decideModal () {
    const decideTable = {
      '': <div></div>,
      'examManageModal': <ExamManage
        ref={instance => { this.examManageModal = instance }}
        closeModal={this.closeModal}
        selectedCourse={this.props.selectedCourse}
        setSelectedCourse={this.props.setSelectedCourse}
        showModal={this.showModal}
      />,
      'roomsManageModal': <ExamRoomsManage
        closeModal={this.closeModal}
        showModal={this.showModal}
        selectedExam={this.selectedExam}
      />,
      'addRoomDetailModal': <ExamAddRoomDetail
        closeModal={this.closeModal}
        showModal={(modal) => { this.showModal(modal) }}
        selectedExam={this.selectedExam}
      />,
      'examinersManageModal': <ExaminersManage
        closeModal={this.closeModal}
        selectedExam={this.selectedExam}
        showModal={(modal) => { this.showModal(modal) }}
      />
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
