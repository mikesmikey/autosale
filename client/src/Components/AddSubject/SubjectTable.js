import React, { Component } from 'react'
import ClientService from '../Utilities/ClientService'

//Object
import Subject from '../../Objects/Subject'

const CServiceObj = new ClientService()

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
        CServiceObj.searchAllSubjectBySubjectIdOrSubjectName(subIdInput, subNameInput).then((result) => {                  
            if (this._isMounted) {
                this.setState({ data: result })
            }
        }) 
    }

    SubjectObject (data) {
        return new Subject(data)     
    }

    loadDataIntoTable () {
        var returnData = []
        for (var i = 0; i < this.state.data.length; i++) {
          returnData[i] = <SubjectTableItem
            key={i}
            // selectItem={(e) => { this.selectItem(e) }}
            // inspectItem={(e) => { this.inspectItem(e) }}
            // selectedType={this.props.selectedType}
            itemIndex={i}
            itemData={new Subject(this.state.data[i])}
            faculties={this.props.faculties}
          />
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
        super(props);
    }
    
    renderSubjectField() {
        return (
            <tr className="user-table-item"
                index={this.props.itemIndex}
            >
                <td id="tableSubjectId">{this.props.itemData.subjectId}</td>
                <td>{this.props.itemData.subjectName}</td>
                <td>{this.props.faculties[this.props.itemData.facultyId-1].facultyName}</td>
                <td>{this.props.faculties[this.props.itemData.facultyId-1].branches[this.props.itemData.branchId-1].branchName}</td> 
                <td>{this.props.itemData.credits}</td>
            </tr>
        );
    }

    render() {
        return (this.renderSubjectField());
    }
}

export default SubjectTable