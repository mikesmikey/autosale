import React, { Component } from 'react';

import ClientService from '../Utilities/ClientService';
import readXlsxFile from 'read-excel-file';

const CServiceObj = new ClientService();

class StudentExcelPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileName: this.props.fileName,
            source: this.props.source,
            faculties: [],
            students: []
        }

        this.handleFileChange = this.handleFileChange.bind(this);
    }

    resetFile() {
        this.props.closeModal();
        this.setState({
            fileName: '',
            source: null
        })
    }
    showInsertExcelModal() {

        this.getAllStudentsAndFaculties();

        console.log('fa ',this.state.faculties)
        console.log('st ', this.state.students)
        this.props.showModal();
    }

    getAllStudentsAndFaculties() {
        
        CServiceObj.getAllUserBySelectType('student').then((result) => {
            this.setState({
                faculties: result
            })
        })

        CServiceObj.getAllFaculty().then((result) => {
            this.setState({
                students: result
            })
        })
    }

    

    addManyStudent(JSON_object) {
        CServiceObj.addManyStudents(JSON_object).then((result) => {
            if (result) {
                alert("เพิ่มสำเร็จ")
                this.setState({
                    fileName: '',
                    source: null
                });
            } else {
                alert("เพิ่มไม่สำเร็จ!")
            }
        })
    }

    validateDataFile() {
        if (this.state.fileName.length < 1) {
            alert('ไม่มีไฟล์ อัพโหลดมาใหม่')
        }
        else {
            readXlsxFile(this.state.source).then((rows) => {
                if (rows.length >= 1) {
                    if (rows[0][0] === 'รหัสนิสิต' &&
                        rows[0][1] === 'ชื่อ' &&
                        rows[0][2] === 'นามสกุล' &&
                        rows[0][3] === 'คณะ' &&
                        rows[0][4] === 'สาขา' &&
                        rows[0][5] === 'ชั้นปี') {

                        var users = [], verifier = false;
                        for (var i = 1; i < rows.length; i++) {
                            //console.log(typeof rows[i][0].toString())
                            users.push({
                                "username": rows[i][0].toString(),
                                "password": "changenow",
                                "firstName": rows[i][1],
                                "lastName": rows[i][2],
                                "facultyId": 0,
                                "branchId": 1,
                                "typeOfUser": "student",
                                "year": rows[i][5],
                                "isExaminer": false
                            })
                        }
                        alert('OK')
                    
                        // this.getAllStudents('student')
                        // console.log('users ',usersAlready)
                        console.log(users)
                        this.addManyStudent(users)
                        // if (verifier)
                        //     this.addManyStudent(users)
                        // else
                        // alert('เพิ่มไม่ได้')
                    }
                    else {
                        alert('คอลัมน์ในไฟล์ Excel ไม่ถูกต้อง')
                    }
                }
                else {
                    alert('ไฟล์ Excel ไม่มีข้อมูล')
                    this.setState({
                        fileName: '',
                        source: null
                    })
                }
            }
            )
        }
    }
    handleFileChange = (event) => {
        try {
            var fileExtension = '';
            fileExtension = event.target.files[0].name.split('.').pop();
        } catch (error) { }

        if (fileExtension === 'xlsx') {
            this.setState({
                fileName: event.target.files[0].name,
                source: event.target.files[0]
            });

        } else {
            this.setState({
                fileName: '',
                source: null
            });
        }
        //console.log('handleChange ', this.state.source)
    }

    render() {
        //console.log('FileChanged', this.state.source);
        const fileText = this.state.fileName;
        let file = null;
        file = fileText
            ? (<span>ไฟล์ที่เลือก - {fileText}</span>)
            : (<span>เลือกไฟล์ ...</span>);
        return (
            <div className="box is-user-popUp" style={{ width: "500px" }}>
                <h1 align="center">เลือกไฟล์</h1>
                <div align="left">
                    <label className="label is-fake">อัพโหลดไฟล์ (.xlsx)
                        <input
                            className="input"
                            type="file"
                            multiple={false}
                            name="fileInput"
                            onChange={this.handleFileChange}
                        />
                    </label>
                    <label htmlFor="file">{file}</label>
                </div>
                <div align="right">
                    <button
                        className="button is-oros is-free-size is-round"
                        onClick={() => { this.validateDataFile() }}
                    >
                        นำเข้าข้อมูลนิสิต
                    </button>
                    <button
                        className="button is-yentafo is-round"
                        onClick={() => { this.resetFile() }}
                    >
                        ยกเลิก
                    </button>
                </div>
            </div>
        );
    }
}

export default StudentExcelPopup;