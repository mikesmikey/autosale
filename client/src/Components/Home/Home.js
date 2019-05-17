/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// Components
import Modal from '../Utilities/Modal'

import '../../StyleSheets/home.css'

class Home extends Component {
  render () {
    return (
      <div className="subcontent-main-div home">
        <div className="box with-title is-round">
          <div className="box-title is-violet">
                        หน้าแรก
          </div>
          <div className="box-content">
            <button className="button">normal</button>
            <a className="button">link</a>

            <button className="button">normal</button>
            <button className="button">normal</button>

            <div>
              <button className="button is-oros is-round">normal</button>
              <button className="button is-yentafo is-round">normal</button>
              <button className="button is-orange is-round">normal</button>
            </div>
            <div>
              <button className="button is-round is-1">normal</button>
              <button className="button is-round is-2">normal</button>
              <button className="button is-round is-3">normal</button>
            </div>
            <div>
              <button className="button is-free-size">sdafsdafgdsagdsgsdagsadgdsg</button>
              <button className="button is-round">normal</button>
              <button className="button is-yentafo">normal</button>
            </div>
            <div>
              <button className="button is-full-width">normal</button>
            </div>
            <div>
              <h1 className="label">label</h1>
              <p className="label">label</p>
              <p className="label is-1">label</p>
              <p className="label is-2">label</p>
              <p className="label is-3">label</p>
              <p className="label is-4">label</p>
            </div>
          </div>
        </div>
        <div className="box">
          <button className="button is-primary" onClick={() => { this.modal.showModal() }}>modal1</button>
          <button className="button is-danger" onClick={() => { this.modal2.showModal() }}>modal2</button>
          <Modal ref={instance => { this.modal = instance }} content={<Example closeModal={() => { this.modal.closeModal() }} />} />
          <Modal ref={instance => { this.modal2 = instance }} content={
            <div className="box">
                            อะไร
              <button className="button" onClick={() => { this.modal2.closeModal() }}>ปิด</button>
            </div>
          } />
        </div>
      </div>
    )
  }
}

class Example extends Component {
  hello () {
    console.log('Hello!')
  }

  render () {
    return (
      <div className="box">
        <button className="button" onClick={() => { this.hello() }}>print Hello</button>
        <button className="button" onClick={this.props.closeModal}>close</button>
      </div>
    )
  }
}

export default Home
