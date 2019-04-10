import React, { Component } from 'react'
import ClientService from '../Utilities/ClientService'
import Subject2Table from '../CourseManage/Subject2Table'
import '../../StyleSheets/addNewSubject.css'
import '../../StyleSheets/addCourse.css'

const CServiceObj = new ClientService()
class AddCourse extends Component {

    constructor(props) {
        super(props)
        this.state = {
            facultyIndex: 1,
            branchIndex: 1,
            selectSubId: '',
            faculties: []
        }
        this.handleSearchButton = this.handleSearchButton.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSearchButton = this.handleSearchButton.bind(this)
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

    renderFacultyComponent() {
        return this.state.faculties.map((item) => {
            return <option key={item.facultyId} value={item.facultyId}>{item.facultyName}</option>
        })
    }

    renderFacultyBranchComponent() {
        const faculties = this.state.faculties[this.state.facultyIndex === 0 ? this.state.facultyIndex : this.state.facultyIndex - 1]
        if (!faculties) return null
        var returnArr = []
        for (var i = 0; i < faculties.branches.length; i++) {
            returnArr[i] = <option key={faculties.branches[i].branchId} value={faculties.branches[i].branchId}>{faculties.branches[i].branchName}</option>
        }
        return returnArr
    }

    handleInputChange(e) {
        const target = e.target
        const name = target.name
        const value = target.value

        this.setState({
            [name]: value
        })
    }

    handleInputValidate = (e) => {
        if (!(/[0-9:]+/g).test(e.key)) {
            e.preventDefault();
        }
    }

    handleSearchButton() {
        this.subTable.loadDataBySubjectId(this.state.selectSubId, this.state.selectSubName)
    }

    render() {
        return (
            <div className="subcontent-main-div user-manage">
                <div className="add-subject-box box with-title is-round">
                    <div className="box-title is-violet">
                        เพิ่มการเรียน
                    </div>
                    <div className="box-content">
                        <div className='columns'>
                            <div className="column is-3">
                                <div className="columns input-div">
                                    <div className="column is-2">
                                        <label className="label">คณะ</label>
                                    </div>
                                    <div className="column">
                                        <select
                                            className="select user-mange-select-box-popUp is-full-width"
                                            type="text"
                                            id="popAddUserFaculty"
                                            name="facultyIndex"
                                            onChange={this.handleInputChange}
                                            value={this.state.facultyIndex}
                                        >
                                            {this.renderFacultyComponent()}
                                        </select>
                                    </div>
                                </div>

                                <div className="columns input-div">
                                    <div className="column is-2">
                                        <label className="label">สาขา</label>
                                    </div>
                                    <div className="column">
                                        <select
                                            className="select user-mange-select-box-popUp is-full-width"
                                            type="text"
                                            id="popAddUserBranch"
                                            name="branchIndex"
                                            onChange={this.handleInputChange}
                                            value={this.state.branchIndex}
                                        >
                                            {this.renderFacultyBranchComponent()}
                                        </select>
                                    </div>
                                </div>
                                <div className="columns input-div">
                                    <div className="column is-2">
                                        <label className="label">รหัสวิชา</label>
                                    </div>
                                    <div className="column">
                                        <input
                                            className="input is-subjectId-width"
                                            type="text"
                                            id="userId"
                                            name="subjectIdSearch"
                                            onChange={this.handleInputChange}
                                            onKeyPress={this.handleInputValidate.bind(this)} />
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

                                <div>
                                    <span className="adds-tab-is-15"></span>
                                </div>

                                <Subject2Table
                                    ref={instance => { this.subTable = instance }}
                                    selectSubId={this.state.selectSubId}
                                    selectSubName={this.state.selectSubName}
                                    faculties={this.state.faculties}
                                />
                            </div>
                            <div className="column is-3">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddCourse;