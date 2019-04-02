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

    componentDidMount() {
        this.getAllStudentsAndFaculties();
    }

    resetFile() {
        this.props.closeModal();
        this.setState({
            fileName: '',
            source: null
        })
    }
    showInsertExcelModal() {
        this.props.showModal();
    }

    getAllStudentsAndFaculties() {

        CServiceObj.getAllFaculty().then((result) => {
            this.setState({

                faculties: result
            })
        })

        let studentsID = [];
        CServiceObj.getAllUserBySelectType('student').then((result) => {
            for (var i in result) {
                studentsID.push({
                    username: result[i].username
                })
            }
        })
        this.setState({
            students: studentsID
        })
    }


    addManyStudent(JSON_object, count_excel) {
        CServiceObj.addManyStudents(JSON_object).then((result) => {
            if (result) {
                alert(`จากรายการข้อมูลนิสิตทั้งหมดใน excel : ${count_excel}\nเพิ่มสำเร็จ : ${JSON_object.length}`)
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

                        var users = [];
                        var checkFaculty_Branch = new Array(rows.length).fill(false);
                        var checkID_Year = new Array(rows.length).fill(true);

                        //true and true => push to database
                        for (let i = 1; i < rows.length; i++) {

                            // this.state.faculties.forEach(element => {
                            //     if (rows[i][3] === element.facultyName) {
                            //         rows[i][3] = element.facultyId
                            //         element.branches.forEach(element => {
                            //             if (rows[i][4] === element.branchName) {
                            //                 rows[i][4] = element.branchId
                            //                 checkFaculty_Branch[i] = true;
                            //             }
                            //         })
                            //     }
                            // });

                            for (let j = 0; j < this.state.faculties.length; j++) {
                                if (rows[i][3] === this.state.faculties[j].facultyName) {
                                    rows[i][3] = this.state.faculties[j].facultyId
                                    for (var k = 0; k < this.state.faculties[j].branches.length; k++) {
                                        if (rows[i][4] === this.state.faculties[j].branches[k].branchName) {
                                            rows[i][4] = this.state.faculties[j].branches[k].branchId
                                            checkFaculty_Branch[i] = true;
                                            break
                                        }
                                    }
                                    break
                                }
                            }


                            for (let j = 0; j < this.state.students.length; j++) {
                                // console.log(typeof rows[i][0].toString(), typeof this.state.students[j].username)
                                if (rows[i][0].toString() === this.state.students[j].username) {
                                    checkID_Year[i] = false;
                                }
                            }


                            checkID_Year[i] = (rows[i][5] > 0 && rows[i][5] < 7) && checkID_Year[i]


                            if (checkFaculty_Branch[i] && checkID_Year[i]) {
                                users.push({
                                    "username": rows[i][0].toString(),
                                    "password": "changenow",
                                    "firstName": rows[i][1],
                                    "lastName": rows[i][2],
                                    "facultyId": rows[i][3],
                                    "branchId": rows[i][4],
                                    "typeOfUser": "student",
                                    "year": rows[i][5],
                                    "isExaminer": false
                                })
                            }
                        }
                        console.log(checkFaculty_Branch, checkID_Year)
                        alert('OK')

                        // this.getAllStudents('student')
                        // console.log('users ',usersAlready)
                        if(users.length > 0) {
                            this.addManyStudent(users, rows.length - 1)
                        }
                        else {
                            alert('ไม่มีข้อมูล')
                        } 
                        
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
            })
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
        // console.log('fa ',this.state.faculties)
        // console.log('st ', this.state.students)
        // console.log('FileChanged', this.state.source);
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