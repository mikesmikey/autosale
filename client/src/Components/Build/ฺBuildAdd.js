import React, { Component } from 'react'

import '../../StyleSheets/ExamCreateScreen.css'

import SubjectList from './SubjectList'




class BuildAdd extends Component  {
  render () {
    return (
      <div className="subcontent-main-div score-exam">
        <div className="score-exam-box box with-title is-round">
          <div className="box-title is-violet">
                        เพิ่มการเรียน
          </div>
          <div className="box-content">
          <div className="columns">
            <div className="column">
              <div className="columns is-8">
              <div className="column">
                <div className="input-with-text">
                  <label className="label">คณะ </label>
                  <select className="user-mange-select-box">
                      <option value="Informatics">Informatics</option>
                      <option value="Science">Science</option>
                      <option value="Sports Science">Sports Science</option>
                    </select>
                </div>
                </div>
              </div>
              <br></br>
              <div className="columns is-8">
              <div className="column">
                <div className="input-with-text">
                  <label className="label">สาขา </label>
                  <select className="user-mange-select-box">
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="Computer Science">Computer Science</option>
                    </select>
                </div>
                </div>
              </div>

              <br></br>

              <div className="columns is-8">
              <div className="column">
                <div className="input-with-text">
              <input className="input is-userId-width" type="text" id="userId" name="searchInput" />
              &nbsp;&nbsp;&nbsp;
              <button type="submit"><i className="fa fa-search height50" ></i></button> 
              </div>
                </div>
              </div>
              
              <br></br>

              <div className="columns is-6">
              <div className="column">
              <div className="table-div columns is-stay-top">
              <div className="column is-8 user-column-table">
                <SubjectList
                  ref={instance => { this.scoreTable = instance }}
                  // showManageModal={() => { this.managePopup.showManageModal("view") }}
                />
                </div>
                </div>
              </div>
            </div>

            </div>
            <div className="column">
            <div className="columns">
              <div className="column is-8">
              <br></br>
              <div className="box">
              เพิ่มการเรียน
              <div className="columns border">
              <div className="box">
              <div className="columns">
                <div className="column">
                <div className="input-with-text">
                กลุ่มเรียนทั้งหมด    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select className="user-mange-select-box">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
              </div>
                </div>
              </div>

              <br></br>

              <div className="columns">
              <div className="column">
              จำนวนนักเรียนทั้งหมด  &nbsp;&nbsp;&nbsp;
              <div className="input-with-text">
              <input className="input is-userId-width" type="text" id="userId" name="searchInput" />
              </div>
                </div>
              </div>
          </div> 
              </div>
              <br></br>
              </div>
                            
              </div>
              </div>
            </div>

            </div>
            
            

            <br></br>
            <br></br>
            <div className="table-div columns is-stay-top">
              <div className="column is-8 user-column-table">
              
                
                {/* */}

              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }
  }

export default BuildAdd
