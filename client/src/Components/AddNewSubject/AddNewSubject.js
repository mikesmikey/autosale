import React, { Component } from 'react'
import ClientService from '../Utilities/ClientService'

import '../../StyleSheets/addNewSubject.css'

const CServiceObj = new ClientService();

class AddNewSubject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subjectId: '',
            subjectName: '',
            credits: '',
            subjects: [],
            canAddThis: 'yes' //status
        }
    }
    _isMounted = false

    componentDidMount() {
        this._isMounted = true
        CServiceObj.getAllSubject().then((result) => {
            if (this._isMounted) {
                this.setState({
                    subjects: result
                })
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    handleInputChange = (evt) => {
        if (evt.target.name === 'subjectIdInput') {
            this.setState({
                subjectId: evt.target.value
            })
        }
        else if (evt.target.name === 'subjectNameInput') {
            this.setState({
                subjectName: evt.target.value
            })
        }
        else {
            this.setState({
                credits: evt.target.value
            })
        }
    }

    handleInputValidate = (evt) => {
        const keyCode = evt.keyCode || evt.which;
        const keyValue = String.fromCharCode(keyCode);
        // if (/\+|-/.test(keyValue))
        //     evt.preventDefault();

        if (evt.target.name === 'subjectIdInput') {
            this.setState({
                subjectId: evt.target.value
            })
        }
        else if (evt.target.name === 'subjectNameInput') {
            this.setState({
                subjectName: evt.target.value
            })
        }
        else {
            this.setState({
                credits: evt.target.value
            })
        }
    }

    validateDataInput() {
        let check = false,sub = this.state.subjects;
        for (var i = 0; i < sub.length; i++) {
            if (this.state.subjectId === sub[i].subject_id ||
                this.state.subjectName === sub[i].subject_name ||
                this.state.credits === sub[i].credits) {
                check = true
                this.setState({
                    canAddThis: 'no'
                })    
                
                //this.add

                break;
            }
        }   
        if(!check) {
            this.setState({
                canAddThis: 'yes'
            })   
        }            
    }

    render() {
        return (
            <div className="subcontent-main-div add-subject">
                <div className="box with-title is-round">
                    <div className="box-title is-violet">
                        เพิ่มรายวิชา
                    </div>
                    <div className="box-content">

                        {/* <div className="columns input-div">
                            <div className="column">
                                <input
                                    className="input is-full-width"
                                    type="text"
                                    name="searchInput"
                                    placeholder="ค้นหารายวิชาที่มีอยู่" />
                            </div>
                        </div> */}

                        <div>
                            <span className="adds-tab-is-15"></span>
                        </div>

                        <div className="columns input-div">
                            <div className="column is-2">
                                <label className="label">รหัสวิชา</label>
                            </div>
                            <div className="column">
                                <input
                                    className="input is-full-width"
                                    type="text"
                                    name="subjectIdInput"
                                    maxLength={8}
                                    onChange={this.handleInputChange.bind(this)}
                                    onKeyPress={this.handleInputValidate.bind(this)} />

                            </div>
                        </div>

                        <div className="columns input-div">
                            <div className="column is-2">
                                <label className="label">รายวิชา</label>
                            </div>
                            <div className="column">
                                <input
                                    className="input is-full-width"
                                    type="text"
                                    name="subjectNameInput"
                                    onChange={this.handleInputChange.bind(this)}
                                    onKeyPress={this.handleInputValidate.bind(this)} />
                            </div>
                        </div>

                        <div className="columns input-div">
                            <div className="column is-2">
                                <label className="label">หน่วยกิต</label>
                            </div>
                            <div className="column">
                                <input
                                    className="input is-full-width"
                                    type="text"
                                    name="creditsInput"
                                    maxLength={1}
                                    onChange={this.handleInputChange.bind(this)}
                                    onKeyPress={this.handleInputValidate.bind(this)} />
                            </div>
                        </div>

                        <div className={`columns input-div ${this.state.canAddThis === 'no' ? '' : 'is-hiding'}`} >
                            <div className="column is-2"></div>
                            <div className="column">
                                <label className="label" style={{ color: 'red' }}>ok</label>
                            </div>
                        </div>

                        <div>
                            <span className="adds-tab-is-15"></span>
                        </div>

                        <div className="columns">
                            <div className="column is-7" style={{ textAlign: 'center' }}>
                                <button
                                    className="button is-oros is-round"
                                    onClick={() => { this.validateDataInput() }}>
                                    ยืนยัน
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default AddNewSubject