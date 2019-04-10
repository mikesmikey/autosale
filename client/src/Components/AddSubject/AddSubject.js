import React, { Component } from 'react'
import ClientService from '../Utilities/ClientService'

// Components
import Modal from '../Utilities/Modal'
import '../../StyleSheets/userManage.css'
import '../../StyleSheets/addNewSubject.css'
import AddSubjectPopup from './AddSubjectPopup'
import SubjectTable from './SubjectTable'

const CServiceObj = new ClientService()
class AddSubject extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            selectSubId: '',
            selectSubName: '',
            faculties: [],
        }
        this.handleSearchButton = this.handleSearchButton.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    _isMounted = false

    componentDidMount() {
        this._isMounted = true
        this.loadFacultyData()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    loadFacultyData() {
        CServiceObj.getAllFaculty().then((result) => {
            if (this._isMounted) {
                this.setState({
                    faculties: result
                })
            }
        })
    }

    handleSearchButton() {
        this.subTable.loadDataBySubjectIdOrSubjectName(this.state.selectSubId, this.state.selectSubName)
    }

    handleInputChange = (evt) => {
        if (evt.target.name === 'subjectIdSearch') {
            this.setState({
                selectSubId: evt.target.value
            })
        }
        else {
            this.setState({
                selectSubName: evt.target.value
            })
        }
    }

    render() {
        return (
            <div className="subcontent-main-div user-manage">
                <div className="add-subject-box box with-title is-round">
                    <div className="box-title is-violet">
                        เพิ่มรายวิชา
                    </div>
                    <div className="box-content">
                        <div className='columns'>
                            <div className="column is-7">
                                <div className="input-with-text">
                                    <label className="label">รหัสวิชา : </label>
                                    <input
                                        className="input is-subjectId-width"
                                        type="text"
                                        id="userId"
                                        name="subjectIdSearch"
                                        onChange={this.handleInputChange} />
                                </div>
                                <div className="input-with-text">
                                    <label className="label">หรือ รายวิชา : </label>
                                    <input className="input is-subjectName-width"
                                        type="text"
                                        id="userName"
                                        name="subjectNameSearch"
                                        onChange={this.handleInputChange} />
                                </div>
                                <div className="input-with-text">
                                    <button
                                        type="submit">
                                        <i
                                            className="fa fa-search height50"
                                            onClick={this.handleSearchButton}>
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="adds-tab-is-15"></span>
                        </div>
                        <SubjectTable
                            ref={instance => { this.subTable = instance }}
                            selectSubId={this.state.selectSubId}
                            selectSubName={this.state.selectSubName}
                            faculties={this.state.faculties}
                        />
                        <div>
                            <span className="adds-tab-is-15"></span>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <button
                                className="button is-oros is-round"
                                onClick={() => { this.subjectPopup.showSubjectAddModal() }} >
                                เพิ่มวิชา
                             </button>
                        </div>
                    </div>
                </div>
                <Modal ref={instance => { this.manageSubjectModal = instance }} content={
                    <AddSubjectPopup
                        ref={instance => { this.subjectPopup = instance }}
                        closeModal={() => {
                            this.manageSubjectModal.closeModal()
                        }}
                        showModal={() => {
                            this.manageSubjectModal.showModal()
                        }}
                        // addItem={(data) => { this.subTable.addItem(data) }}
                        faculties={this.state.faculties}               
                    // isDataLoading={this.state.isDataLoading}
                    />
                } />
            </div>
        );
    }
}

export default AddSubject