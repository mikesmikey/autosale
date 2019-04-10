import React, { Component } from 'react'
import ClientService from '../Utilities/ClientService'

const CServiceObj = new ClientService()

class AddSubjectPopup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            subjectId: '',
            subjectName: '',
            credits: '',
            subjects: [],
            facultyIndex: 1,
            branchIndex: 1
        }
        this.handleInputChange = this.handleInputChange.bind(this)
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

    clearInputAndCloseModal() {
        this.setState({
            subjectId: '',
            subjectName: '',
            credits: '',
            subjects: [],
            facultyIndex: 1,
            branchIndex: 1
        })
        this.props.closeModal()
    }

    showSubjectAddModal() {
        this.props.showModal()
    }

    renderFacultyComponent() {
        return this.props.faculties.map((item) => {
            return <option key={item.facultyId} value={item.facultyId}>{item.facultyName}</option>
        })
    }

    renderFacultyBranchComponent() {
        const faculties = this.props.faculties[this.state.facultyIndex === 0 ? this.state.facultyIndex : this.state.facultyIndex - 1]
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

        if (e.target.name === 'subjectId') {
            if (!(/[0-9:]+/g).test(e.key)) {
                e.preventDefault();
            }
        }
        else if (e.target.name === 'subjectName') {
            if (!(/^[a-zA-Z\s]+$/g).test(e.key)) {
                e.preventDefault()
            }
        }
    }

    validateDataInput() {
        var valid = true

        if (this.state.subjectId.trim().length < 1 ||
            this.state.subjectName.trim().length < 1 ||
            this.state.credits.length < 1) {
            valid = false;
        }

        //done
        if (valid) {
            var subjectJson = {
                subjectId: this.state.subjectId,
                subjectName: this.state.subjectName,
                credits: parseInt(this.state.credits, 10),
                facultyId: parseInt(this.state.facultyIndex, 10),
                branchId: parseInt(this.state.branchIndex, 10),
                courses: []
            }

            CServiceObj.addSubject(subjectJson).then((result) => {
                if (result) {
                    alert('เพิ่มสำเร็จ!')
                    this.props.closeModal()
                } else {
                    alert('เพิ่มไม่สำเร็จ!')
                }
            })

            this.clearInputAndCloseModal()
        }
        else {
            alert('กรอกข้อมูลให้ครบ')
        }
    }

    render() {
        return (
            <div className="box is-user-popUp" style={{ width: "500px" }}>
                <h1 align="center">เพิ่มรายวิชา</h1>
                <div className="columns input-div">
                    <div className="column is-2">
                        <label className="label">รหัสวิชา</label>
                    </div>
                    <div className="column">
                        <input
                            className="input is-full-width"
                            type="text"
                            name="subjectId"
                            value={this.state.subjectId}
                            onChange={this.handleInputChange}
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
                            name="subjectName"
                            value={this.state.subjectName}
                            onChange={this.handleInputChange}
                            onKeyPress={this.handleInputValidate.bind(this)} />
                    </div>
                </div>

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
                        <label className="label">จำนวนหน่วยกิต</label>
                    </div>
                    <div className="column">
                        <select
                            className="select user-mange-select-box-popUp is-full-width"
                            id="popAddYear"
                            name="credits"
                            onChange={this.handleInputChange}
                            value={this.state.credits}
                        >
                            <option value="0"></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>

                <div>
                    <span className="adds-tab-is-15"></span>
                </div>

                <div className="columns">
                    <div className="column is-7" style={{ textAlign: 'center' }}>
                        <button
                            className="button is-oros is-round"
                            onClick={() => { this.validateDataInput() }} >
                            ยืนยัน
                                </button>
                        <button
                            className="button is-yentafo is-round"
                            onClick={() => {this.clearInputAndCloseModal()}} >
                            ยกเลิก
                                </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddSubjectPopup;