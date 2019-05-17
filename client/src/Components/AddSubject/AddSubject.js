import React, { Component } from 'react'
import CFacultyService from '../../Services/FacultyService'

// Components
import Modal from '../Utilities/Modal'
import '../../StyleSheets/userManage.css'
import '../../StyleSheets/addNewSubject.css'
import AddSubjectPopup from './AddSubjectPopup'
import SubjectTable from './SubjectTable'

const FacultyService = new CFacultyService()
class AddSubject extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            subjectIdSearch: '',
            subjectNameSearch: '',
            faculties: []
        }
    }
    _isMounted = false

    componentDidMount() {
        this._isMounted = true
        this.loadInformation()
        this.subTable.loadDataBySubjectIdOrSubjectName(this.state.subjectIdSearch, this.state.subjectNameSearch)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    loadInformation() {
        FacultyService.getAllFaculty().then((result) => {
            if (this._isMounted) {
                this.setState({
                    faculties: result
                })
            }
        })
    }

    handleSearchButton() {
        this.subTable.loadDataBySubjectIdOrSubjectName(this.state.subjectIdSearch, this.state.subjectNameSearch)
    }

    handleInputValidate = (e) => {

        if (e.target.name === 'subjectIdSearch') {
            if (!(/[0-9:]+/g).test(e.key)) {
                e.preventDefault();
            }
        }
        else if (e.target.name === 'subjectNameSearch') {
            if (!(/^[a-zA-Z\s]+$/g).test(e.key)) {
                e.preventDefault()
            }
        }
    }

    handleInputChange(e) {
        const target = e.target
        const name = target.name
        const value = target.value

        this.setState({
            [name]: value
        })

    }

    render() {
        // console.log(this.state)
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
                                        onChange={this.handleInputChange.bind(this)} 
                                        onKeyPress={this.handleInputValidate.bind(this)} />
                                </div>
                                <div className="input-with-text">
                                    <label className="label">หรือ รายวิชา : </label>
                                    <input className="input is-subjectName-width"
                                        type="text"
                                        id="userName"
                                        name="subjectNameSearch"
                                        onChange={this.handleInputChange.bind(this)}
                                        onKeyPress={this.handleInputValidate.bind(this)} />
                                </div>
                                <div className="input-with-text">
                                    <button
                                        type="submit">
                                        <i
                                            className="fa fa-search height50"
                                            onClick={this.handleSearchButton.bind(this)}>
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
                            selectSubId={this.state.subjectIdSearch}
                            selectSubName={this.state.subjectNameSearch}
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