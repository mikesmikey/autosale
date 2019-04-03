import React, { Component } from 'react';
import ClientService from '../Utilities/ClientService';

//Components


import '../../StyleSheets/home.css';
import '../../StyleSheets/yearAndTermManage.css';
const CServiceObj = new ClientService();

class YearAndTermManage extends Component {
    constructor (props) {
        super(props)
  
        this.state = {
            cStudyYear : 0,
            cStudyTerm :0,
            yearInput : 0,
            termInput : 0
        }      
    }

    handleInputChange (e) {
        const target = e.target
        const name = target.name
        const value = target.value
    
        this.setState({
          [name]: value
        })
      }

    loadYearAndTerm() {
        CServiceObj.getYearAndTerm().then((data) => {
           this.setYearAndTerm( data[0].currentStudyYear, data[0].currentStudyTerm)

        });
    }

    setdYearAndTerm(year,term) {
        this.setState({
            cStudyYear : year,
            cStudyTerm : term
        })
    }

    updateButtonHandle() {
        var newGlobalData = {};      
        newGlobalData.currentStudyYear = this.state.cStudyYear
        newGlobalData.currentStudyTerm = this.state.cStudyTerm

        const globalObj = CServiceObj.createGlobalDataObject(newGlobalData)
        CServiceObj.editGlobalData(globalObj.getGlobalObjectData()).then((result) => {
            if (result) {
                alert('อัพเดทสำเร็จ')
            } else {
                alert('อัพเดทไม่สำเร็จ!')
            }
        })
    }
    componentDidMount() {
        this.loadYearAndTerm()
    }

    render() {
        return (

            <div className="subcontent-main-div global">
                <div className="box with-title is-round ">
                    <div className="box-title is-violet">
                        จัดการปีการศึกษา
                    </div>
                    <div className="box-content">
                        <div className="columns">
                            <div className="column is-6">
                                <div className="tab-is-1">
                                    <label className="label font-size-2" >ปัจจุบัน</label>
                                </div>
                            </div>
                            <div className="column">

                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4 border-1">
                                <div className="tab-is-1">
                                    <label className="label font-size-1"></label>

                                </div>
                                <div className="tab-is-1">
                                    <label className="label font-size-1" id="showTerm"></label>

                                </div>
                            </div>
                            <div className="column">
                            </div>
                        </div>
                        <div>
                            <span className="tab-is-15"></span>
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="tab-is-1">

                                    <label className="label font-size-2" >อัพเดทปีการศึกษา</label>
                                </div>
                            </div>
                            <div className="column">
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-year border-2">
                                <div className="tab-is-1">
                                    <label className="label font-size-1" >ปีการศึกษา : </label>
                                    <input className="input is-year-width " type="text" id="input_year" />
                                </div>
                                <div className="tab-is-1">
                                    <label className="label font-size-1 tab-is-16 ">เทอม : </label>
                                    <span className="tab-is-17"></span>
                                    <select className="user-mange-select-box" id="select_term" >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                                <br />
                                <br />
                                <div className="tab-is-1 set-button-update">
                                    <button className="button is-oros is-round" onClick={this.updateButtonHandle}>อัพเดท</button>
                                </div>
                                <div>
                                    <span className="tab-is-15"></span>
                                </div>
                            </div>
                        </div>
                       


                    </div>
                </div>
            </div>
        );
    }
}

export default YearAndTermManage;