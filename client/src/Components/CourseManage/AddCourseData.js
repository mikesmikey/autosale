import React, { Component } from 'react'
import ErrorModal from '../Utilities/ErrorModal'
import InfoModal from '../Utilities/InfoModal'
import CUserService from '../../Services/UserService'
import '../../StyleSheets/mainMenuBar.css'
import '../../StyleSheets/courseManager.css'
import AddNameTeacher from './AddTeacher'
import AddNameStudent from './AddStudent'
import { Link } from 'react-router-dom'
import CCourse from '../../Services/CourseService'
import CSubjectService from '../../Services/SubjectService'

const SubjectService = new CSubjectService()
const CourseService = new CCourse()
const UserService = new CUserService()

class AddCourseData extends Component {
    _isMounted = false;
    constructor(props) {
        var string = window.location.pathname;
        var url = string.split("/");
        var courseId = Number.parseInt(url[3]) - 1
        var id = url[2]
        super(props)
        this._isMounted = true
        this.state = {
            selectedRow: null,
            subjectId: id,
            courseId: courseId,
            dataRow: [],
            teacher: [],
            student: [],
            regstudent: 0,
            subjectData: null,
            group: 1
        }
        this.setStudent = this.setStudent.bind(this)
        this.deleteStudent = this.deleteStudent.bind(this)
        this.deleteTeacher = this.deleteTeacher.bind(this)
        this.setTeacher = this.setTeacher.bind(this)
        this.loadState = this.loadState.bind(this)
        this.setGroup = this.setGroup.bind(this)
    }
    setGroup() {
        this.setState({
            group: this.addNameStudent.state.groups
        })
        return this.state.group
    }
    setStudent(Student) {
        console.log(Student)
        var data = this.state.student
        data.push(Student)
        this.setState({
            student: data
        })
        console.log('setStudent--------------------------')
        console.log(this.state.student)
    }
    deleteStudent(username) {
        console.log(username)
        for (var i = 0; i < this.state.student.length; i++) {
            if (this.state.student[i].username === username) {
                var CopyData = this.state.student
                CopyData.splice(i, 1)
                this.setState({ student: CopyData })
            }
        }
        console.log('deleteStudent--------------------------')
        console.log(this.state.student)
    }
    setTeacher(Tearcher) {
        var data = this.state.teacher
        data.push(Tearcher)
        this.setState({
            teacher: data
        })
    }
    deleteTeacher(username) {
        for (var i = 0; i < this.state.teacher.length; i++) {
            if (this.state.teacher[i].username === username) {
                var CopyData = this.state.teacher
                CopyData.splice(i, 1)
                this.setState({ teacher: CopyData })
            }
        }
    }
    componentDidMount() {
        this.loadState()
    }
    loadState() {
        CourseService.getObjectCountRegisterCourseBySubjectId(this.state.subjectId).then((data) => {
            let size = data.length
            this.setState({
                regstudent: size
            })
        })
        SubjectService.searchAllSubjectBySubjectId(this.state.subjectId).then((data) => {
            this.setState({
                subjectData: data
            })
        })
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    insertCourse() {
        let couresId = null
        let subjectId = null
        let groups = null
        let userId = null
        try {
            console.log(this.addNameStudent.state.groups)
            couresId = Number.parseInt(this.state.courseId) + 1
            subjectId = this.state.subjectId
            groups = this.addNameStudent.state.groups
            userId = ''
        } catch (ex) {
            this.errorModal.showModal('ข้อมูลผิดพลาด ')
        }
        // let couresId = this.state.courseId
        // let subjectId = this.state.subjectId
        // let groups = 1
        // let userId = '59100159'
        var arrSize = this.state.teacher.length + this.state.student.length
        console.log(arrSize)
        console.log(this.state.teacher.length)
        console.log(this.state.student.length)
        for (let i = 0, j = 0; i < arrSize; i++) {

            if (i < this.state.teacher.length) {
                userId = this.state.teacher[i].username
                UserService.addCourseByUserId(subjectId, userId, couresId, groups).then((data) => {
                    if (!data) {
                        this.errorModal.showModal('เกิดข้อผิดพลาดทางเซิฟเวอร์ ')
                    } else if (i === Number.parseInt(arrSize) - 1) {
                        this.addNameTeacher.setDefaultTeacher()
                        this.addNameStudent.setDefaultStudent()
                        this.infoModal.showModal('บันทึกข้อมูลสำเร็จ')
                    }
                })
            } else {

                userId = this.state.student[j].username
                j++
                UserService.addCourseByUserId(subjectId, userId, couresId, groups).then((data) => {
                    if (!data) {
                        this.errorModal.showModal('เกิดข้อผิดพลาดทางเซิฟเวอร์ ')
                    } else if (i === Number.parseInt(arrSize) - 1) {
                        this.addNameTeacher.setDefaultTeacher()
                        this.addNameStudent.setDefaultStudent()
                        this.infoModal.showModal('บันทึกข้อมูลสำเร็จ')
                    }
                })
            }

        }

    }
    render() {
        return (
            <div className="subcontent-main-div coures">
                <div className="box with-title is-round ">
                    <div className="box-title is-violet">
                        เพิ่มข้อมูลการเรียน
                    </div>
                    <div className='columns' >
                        <div className='column is-4'>
                            <h3 style={{ marginLeft: 40 }}>เพิ่มรายชื่อครู</h3>
                        </div>
                        <div className='column is-4'>

                            <h3 style={{ marginLeft: 40 }}>เพิ่มรายชื่อนิสิต</h3>
                        </div>
                    </div>
                    <div className='columns padding ' >
                        <div className='column is-4 ' >
                            <AddNameTeacher
                                ref={instance => { this.addNameTeacher = instance }}
                                setGroup={() => { this.setGroup() }}
                                group={this.state.group}
                                addNameStudent={this.addNameStudent}
                                subjectId={this.state.subjectId}
                                courseId={this.state.courseId}
                                deleteTeacher={(data) => { this.deleteTeacher(data) }}
                                setTeacher={(data) => { this.setTeacher(data) }} />
                        </div>
                        <div className='column is-4 '>
                            <AddNameStudent
                                ref={instance => { this.addNameStudent = instance }}
                                courseId={this.state.courseId}
                                setGroup={() => { this.setGroup() }}
                                subjectData={this.state.subjectData}
                                regStudent={this.state.regstudent}
                                deleteStudent={(data) => { this.deleteStudent(data) }}
                                setStudent={(data) => { this.setStudent(data) }}
                                setGroup={(data) => { this.setGroup(data) }}
                                subjectId={this.state.subjectId}
                            />
                        </div>
                    </div>
                    <div className='columns' >
                        <button className="button is-free-size is-oros is-round is-pulled-right"
                            onClick={() => this.insertCourse()}>บันทึกการเรียน</button>
                        <Link to='/course_manage'>
                            <button className="button is-oros is-round is-pulled-right"
                            >ยกเลิก</button>
                        </Link>
                    </div>
                </div>
                <ErrorModal
                    ref={instance => { this.errorModal = instance }}
                />
                <InfoModal
                    ref={instance => { this.infoModal = instance }}
                />
            </div>

        );
    }
}

export default AddCourseData;