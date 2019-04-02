import React, { Component } from 'react';
import ClientService from '../Utilities/ClientService';

import '../../StyleSheets/addNewSubject.css'

class AddNewSubject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputSubject: ''
        }
    }

    handleInputChange(evt) {
        this.setState({
            inputValue: evt.target.value
        })
    }

    render() {
        console.log(this.state.inputValue)
        return (
            <div className="subcontent-main-div add-subject">
                <div className="box with-title is-round">
                    <div className="box-title is-violet">
                        เพิ่มรายวิชา
                    </div>
                    <div className="box-content">
                        <div className="column">
                            <input 
                                className="input is-full-width" 
                                type="text" 
                                placeholder="ค้นหารายวิชาที่มีอยู่" />
                        </div>
                        <div>
                            <span className="adds-tab-is-15"></span>
                        </div>
                        <div className="input-with-text">
                            <label className="label">รายวิชา : </label>
                            <input
                                className="input"
                                type="text"
                                name="searchInput"
                                onChange={(evt) => { this.handleInputChange(evt) }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNewSubject;