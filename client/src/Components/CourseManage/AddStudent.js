import React, { Component } from 'react'
import ErrorModal from '../Utilities/ErrorModal'
import InfoModal from '../Utilities/InfoModal'
import CUserService from '../../Services/UserService'
import '../../StyleSheets/mainMenuBar.css'
import '../../StyleSheets/courseManager.css'
import '../../StyleSheets/yearAndTermManage.css'
import CSubjectService from '../../Services/SubjectService'
import CCourse from '../../Services/CourseService'

const CourseService = new CCourse()
const SubjectService = new CSubjectService()
const UserService = new CUserService()
class AddNameStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputName: '',
            data: [],
            found: false,
            Notfound: false,
            selectRow: null,
            dataRow: [],
            StudentSelect: [],
            maxGroups: 0,
            maxStudent: 0,
            e: null,
            regstudent: 0,
            subjectData: 0,
            groups: 0,
            selectgroups: 1
        }
        this.setStudentSelect = this.setStudentSelect.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputChangeOption = this.handleInputChangeOption.bind(this)
        this.serach = this.serach.bind(this)
        this.selectItem = this.selectItem.bind(this)
        this.deleteStudent = this.deleteStudent.bind(this)
        this.getGroups = this.getGroups.bind(this)
        this.loadState = this.loadState.bind(this)
        this.setDefaultStudent = this.setDefaultStudent.bind(this)
        this.selectgroups = this.selectgroups.bind(this)
        this.onChangeTY = this.onChangeTY.bind(this)
    }
    selectgroups() {
        try {
            console.log('RUN')
            console.log(`lengthTeacher ${lengthTeacher} || lengthStuden ${lengthStuden}`)
            let lengthTeacher = this.props.addNameTeacher.TeacherSelect.length
            let lengthStuden = this.state.StudentSelect.length
            if (Number.parseInt(lengthTeacher) === 0 && Number.parseInt(lengthStuden) === 0) {
                if(this.state.groups === 0){
                    this.setState({
                        selectgroups: null
                    })
                }else{
                    this.setState({
                        selectgroups: this.state.groups
                    })
                }
            }
        } catch (ex) {

        }

    }
    onChangeTY(e){
        const target = e.target
        const name = target.name
        const value = target.value

        try {
            console.log(typeof this.props.addNameTeacher.state.TeacherSelect)
            let lengthTeacher = this.props.addNameTeacher.state.TeacherSelect === undefined ? 0 : this.props.addNameTeacher.state.TeacherSelect.length
            let lengthStuden = this.state.StudentSelect === undefined ? 0 : this.state.StudentSelect.length
            console.log(`lengthTeacher ${lengthTeacher} || lengthStuden ${lengthStuden}`)
            let check =Number.parseInt(lengthTeacher) === 0  && Number.parseInt(lengthStuden) === 0
            console.log(`check ${check}`)
            console.log('my test')
            if (check) {
                console.log('my test')
                this.setState({
                    selectgroups: value
                })
            }
        } catch (ex) {
console.log(ex)
        }
    }
    setDefaultStudent() {
        this.setState({
            inputName: '',
            data: [],
            found: false,
            Notfound: false,
            selectRow: null,
            dataRow: [],
            StudentSelect: [],
            maxStudent: 0,
            e: null,
            regstudent: 0,
            subjectData: 0,
            groups: 0,
            selectgroups: 1
        })
    }
    componentDidMount() {
        this.loadState()
        this.getGroups(this.props.subjectId, this.props.courseId)
        console.log(this.state.subjectData, this.props.regstudent)
    }
    loadState() {
        CourseService.getObjectCountRegisterCourseBySubjectId(this.props.subjectId).then((data) => {
            let size = data.length
            this.setState({
                regstudent: size
            })
        })
        SubjectService.searchAllSubjectBySubjectId(this.props.subjectId).then((data) => {

            this.setState({
                subjectData: data
            })
        })
    }
    getGroups(subjectId, courseId) {
        SubjectService.searchAllSubjectBySubjectId(subjectId).then((result) => {
            console.log(result)
            var groups = result[0].courses[Number.parseInt(courseId)].max_groups
            var student = result[0].courses[Number.parseInt(courseId)].max_students
            this.setState({
                maxGroups: groups,
                maxStudent: student
            })
        })
    }
    setStudentSelect() {
        var dataObj = this.state.StudentSelect
        dataObj.push(this.state.data)
        this.setState({
            StudentSelect: dataObj
        })
    }
    deleteStudent(username) {
        for (var i = 0; i < this.state.StudentSelect.length; i++) {
            if (this.state.StudentSelect[i].username === username) {
                var CopyData = this.state.StudentSelect
                CopyData.splice(i, 1)
                this.setState({ StudentSelect: CopyData })
            }
        }
    }

    selectItem(e) {
        this.setState({ e: e })
        const parent = e.target.parentElement
        if (parent.classList.contains('course-table-item')) {
            if (!parent.classList.contains('is-active')) {
                if (this.state.selectRow != null) {
                    this.state.selectRow.classList.remove('is-active')
                }
                this.setState({
                    selectRow: parent
                })
                parent.classList.add('is-active')
                this.setState({ dataRow: this.state.data })
                console.log(this.state.dataRow)
            } else {
                parent.classList.remove('is-active')
                this.setState({
                    selectRow: parent
                })
            }
        }
    }
    handleInputChange(e) {
        const target = e.target
        const value = target.value
        console.log(value)
        this.setState({
            inputName: value
        })
    }
    handleInputChangeOption(e) {
        const target = e.target
        const name = target.name
        const value = target.value

        this.setState({
            groups: value
        })
    }
    serach() {
        if (this.state.inputName !== '' && this.state.inputName !== '' && Number.parseInt(this.state.inputName)) {
            UserService.getUserByUsernameTypeStudent(this.state.inputName).then((result) => {
                let checkRegister = true
                if (result !== false) {
                    var checkSubject = true
                    console.log(`skdlaskd;las`)
                    console.log(result.courses)
                    if(!(result.courses === undefined)){
                        for (let i = 0; i < result.courses.length; i++) {
                            if (result.courses[i].subjectId === this.props.subjectId) {
                                this.errorModal.showModal('นิสิตลงทะเบียนวิชานี้แล้ว')
                                checkSubject = false
                                checkRegister = false
                            }
                        } 
                    }
                    if (checkRegister) {
                        console.log(`subjectData[0].courses[${this.props.courseId}]`)
                        console.log(this.state.subjectData[0])
                        var maxSize = Number.parseInt(this.state.subjectData[0].courses[this.props.courseId].max_students)
                        var regStuden = Number.parseInt(this.state.regstudent)
                        var registering = Number.parseInt(this.state.StudentSelect.length)
                        var total = (maxSize - regStuden) - registering

                        if (total <= 0) {
                            checkSubject = false
                            this.errorModal.showModal('นิสิตมีจำนวนเกินกว่าจำนวนนิสิตทั้งหมดในการเรียน')
                        }
                        if (checkSubject) {
                            this.setState({ data: result, found: true })
                            console.log(this.state.data)
                            this.setStudent()
                        }
                    }
                }
            })

        } else {
            this.errorModal.showModal('รหัสนิสิตไม่ต้องเงือนไข')

        }
    }

    loadDataIntoTableStudentSelect() {
        // console.log(this.state.StudentSelect)
        if (this.state.StudentSelect.length !== 0) {
            var DataObj = []
            for (var i = 0; i < this.state.StudentSelect.length; i++) {
                DataObj[i] = <StudentSelect
                    removeStudent={(data) => this.removeStudent(data)}
                    key={i}
                    itemData={this.state.StudentSelect[i]}
                    itemIndex={i}
                />
            }
            return DataObj
        } else {
            var DataObj = []
            return DataObj
        }
    }
    setStudent() {
        let booleanCheckInsert = true
        for (let i = 0; i < this.state.StudentSelect.length; i++) {
            if (this.state.data.username === this.state.StudentSelect[i].username) {
                this.errorModal.showModal('รายชื่อนิสิตซ้ำรหัส ' + this.state.data.username)
                booleanCheckInsert = false
                break
            }
        }
        if (booleanCheckInsert) {
            this.setStudentSelect()
            // console.log(this.state.data)
            this.props.setStudent(this.state.data)
        }
    }
    removeStudent(name) {
        this.deleteStudent(name)
        this.props.deleteStudent(name)
    }
    optionGroups() {
        var DataObj = []
        for (var i = 0; i <= this.state.maxGroups+1; i++) {
            if(i===0){
                DataObj[i] = <Option
                key={i}
                index={'กรุณาเลือกกลุ่ม'}
            />
            }else{
                DataObj[i] = <Option
                key={i}
                index={i}
            />
            }
        }
        return DataObj
    }
    setGroupsSelect(e) {

    }
    render() {
        return <div style={{ padding: 30 }}>
            <div className='columns'>
                กลุ่ม
                &nbsp;
               <select className="year-mange-select-box" id="select_term" value={this.state.groups} name="termInput" onChange={this.onChangeTY}>
                       
                    {this.optionGroups()}
                </select>
            </div>
            <div className='columns'>
                <p>กลุ่มที่เลือก : {this.state.selectgroups}</p>
            </div>
            <div className='columns' style={{ padding: 10 }} >
                รหัสนิสิต
                    &nbsp; <input className="input is-userId-width" type="text" id="Studentid" name="searchInput" onChange={this.handleInputChange} value={this.state.inputName} />
                <button className="button is-oros is-round is-free-size" type="button" onClick={() => this.serach()} style={{ width: '40px', height: '40px' }}><i className="fa fa-search height50"></i></button>
            </div>

            <div className='add-div2'>
                <table className="user-table" id="courseTable2" >
                    <thead>
                        <tr className="is-header">
                            <th>รหัสผู้ใช้</th>
                            <th>ชื่อ</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.loadDataIntoTableStudentSelect()}
                    </tbody>
                </table>
            </div>
            <ErrorModal
                ref={instance => { this.errorModal = instance }}
            />
            <InfoModal
                ref={instance => { this.infoModal = instance }}
            />
        </div>

    }
}
class Option extends Component {
    constructor(props) {
        super(props)
        this.renderItemByType = this.renderItemByType.bind(this)
    }
    renderItemByType() {
        return (
            <option value={this.props.index}>{this.props.index}</option>
        )
    }
    render() {
        return (this.renderItemByType())
    }
}

class StudentSelect extends Component {
    constructor(props) {
        super(props)
        this.renderItemByType = this.renderItemByType.bind(this)
    }
    delete(value) {
        value.props.removeStudent(value.props.itemData.username)
    }
    renderItemByType() {
        return (
            <tr className="course-table-item"
                index={this.props.itemIndex}
            >
                <td >{this.props.itemData.username}</td>
                <td >{this.props.itemData.firstName} {this.props.itemData.lastName}</td>
                <td ><button style={{ cursor: 'pointer' }} className='button is-free-size is-oros is-round is-pulled-right' onClick={() => this.delete(this)}>ลบ</button></td>
            </tr>
        )
    }
    render() {
        return (this.renderItemByType())
    }
}
export default AddNameStudent