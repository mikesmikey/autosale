/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import CSubjectService from '../../Services/SubjectService'

//Object
import Subject from '../../Objects/Subject'
import { throws } from 'assert';

const SubjectService = new CSubjectService()

class SubjectTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            subjects: []    //store subject
        }

        this.loadDataBySubjectIdOrSubjectName = this.loadDataBySubjectIdOrSubjectName.bind(this)
        this.loadDataIntoTable = this.loadDataIntoTable.bind(this)
    }
    _isMounted = false

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    renderTableHead() {
        return (
            <tr className="is-header">
                <th>รหัสวิชา</th>
                <th>รายวิชา</th>
                <th>คณะ</th>
                <th>สาขา</th>
                <th>จำนวนหน่วยกิต</th>
            </tr>
        )
    }

    loadDataBySubjectIdOrSubjectName(subIdInput, subNameInput) {
        console.log(subIdInput,subNameInput)
        SubjectService.searchAllSubjectBySubjectIdOrSubjectName(subIdInput, subNameInput).then((result) => {                  
            if (this._isMounted) {
                console.log(result)
                this.setState({ data: result })
            }
        }) 
    }
    getfaculties(facultyId,branchId){
        //console.log(this.props.faculties)
        for(let i = 0 ; i<this.props.faculties.length;i++){
           for(let j = 0 ;j<this.props.faculties[i].branches.length;j++){
            if(facultyId === this.props.faculties.facultyId && branchId === this.props.faculties.branches[j].branchId) {
                let data = {}
                data.facultyName = this.props.faculties.facultyName
                data.branchName =  this.props.faculties.branches[j].branchName
                return data
            }
           }
        }
    }
    SubjectObject (data) {
        return new Subject(data)     
    }

    loadDataIntoTable () {
        //console.log(new Subject(this.state.data[i]).getSubjectObjectData())
        var returnData = []
        console.log(this.state.data.length)
        for (var i = 0; i < this.state.data.length; i++) {
            //returnData[i] = 
          <SubjectTableItem
            key={i}
            // selectItem={(e) => { this.selectItem(e) }}
            // inspectItem={(e) => { this.inspectItem(e) }}
            // selectedType={this.props.selectedType}
            itemIndex={i}
            itemData={this.state.data[i]}
            faculties={this.props.faculties}
            dataFaculties = {this.getfaculties(this.state.data[i].facultyId,this.state.data[i].branchId)}
          />
          //console.log(this.state.data[i])
          //new Subject(this.state.data[i])
         // console.log(new Subject(this.state.data[i]).getSubjectObjectData())
        }
        return returnData
    }

    render() {
        return (
            <table className="user-table" id="userTable" >
                <thead>
                    {this.renderTableHead()}
                </thead>
                <tbody>
                    {this.loadDataIntoTable()}
                </tbody>
            </table>
        );
    }
}

class SubjectTableItem extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.itemData)
    }
    //{this.props.faculties[this.props.itemData.facultyId-1].facultyName}
    //{this.props.faculties[this.props.itemData.facultyId-1].branches[this.props.itemData.branchId-1].branchName}
    renderSubjectField() {
        return (
            <tr className="user-table-item"
                index={this.props.itemIndex}
            >
                <td id="tableSubjectId">0</td>
                <td>1</td>
                <td>1</td>
                <td>0</td> 
                <td>0</td>
            </tr>
        )
    }

    render() {
        return (this.renderSubjectField())
    }
}

export default SubjectTable