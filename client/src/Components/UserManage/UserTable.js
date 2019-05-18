/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ClientService from '../../Services/UserService'

// Objects
import Student from '../../Objects/Student'
import Professor from '../../Objects/Professor'
import Staff from '../../Objects/Staff'

const ServiceObj = new ClientService()

class UserTable extends Component {
  _isMounted = false;

  constructor (props) {
    super(props)

    this._isMounted = true

    this.state = {
      selectedRow: null,
      data: []
    }

    this.loadDataByTypeAndUsername = this.loadDataByTypeAndUsername.bind(this)
    this.loadDataIntoTable = this.loadDataIntoTable.bind(this)
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  renderTableHead () {
    return (
      <tr className="is-header">
        <th>รหัสประจำตัว</th>
        <th >ชื่อ-นามสกุล</th>
        {this.props.selectedType !== 'staff' ? <th >คณะ</th> : null}
        {this.props.selectedType === 'student' ? <th >ชั้นปี</th> : null}
        {this.props.selectedType === 'staff' ? <th >ตำแหน่ง</th> : null}
      </tr>
    )
  }

  selectItem (e) {
    const parent = e.target.parentElement
    if (parent.classList.contains('user-table-item')) {
      if (!parent.classList.contains('is-active')) {
        if (this.state.selectedRow != null) {
          this.state.selectedRow.classList.remove('is-active')
        }
        parent.classList.add('is-active')
        this.setState({
          selectedRow: parent
        })
        this.props.setSelectedUser(this.state.data[parent.getAttribute('index')])
      }
    }
  }

  inspectItem (e) {
    const parent = e.target.parentElement
    if (parent.classList.contains('user-table-item')) {
      this.props.showManageModal()
    }
  }

  deleteSelectedItem () {
    const index = Number.parseInt(this.state.selectedRow.getAttribute('index'), 10)
    var arr = this.state.data
    arr.splice(index, 1)
    this.setState({
      data: arr
    })
  }

  editSelectedItem (newData) {
    var arr = this.state.data
    arr[this.state.selectedRow.getAttribute('index')] = newData
    this.setState({
      data: arr
    })
  }

  addItem (newData) {
    var arr = this.state.data
    arr[arr.length] = newData
    this.setState({
      data: arr
    })
  }

  decideUserObject (data) {
    if (data.typeOfUser === 'student') {
      return new Student(data)
    } else if (data.typeOfUser === 'professor') {
      return new Professor(data)
    } else if (data.typeOfUser === 'staff') {
      return new Staff(data)
    }
  }

  loadDataIntoTable () {
    var returnData = []
    for (var i = 0; i < this.state.data.length; i++) {
      returnData[i] = <UserTableItem
        key={i}
        selectItem={(e) => { this.selectItem(e) }}
        inspectItem={(e) => { this.inspectItem(e) }}
        selectedType={this.props.selectedType}
        itemIndex={i}
        itemData={this.decideUserObject(this.state.data[i])}
        facultys={this.props.facultys}
      />
    }
    return returnData
  }

  loadDataByTypeAndUsername (typeInput, usernameInput, startPos) {
    if (!this.props.isDataLoading) {
      this.props.setDataLoadingStatus(true)
      this.setState({
        data: []
      })

      ServiceObj.searchAllUserByTypeAndUsername(typeInput, usernameInput, startPos, 50).then((usersData) => {
        if (this._isMounted) {
          this.props.setDataLoadingStatus(false)
          this.setState({ data: usersData })
        }
      })
    } else {
      console.log('no')
    }
  }

  render () {
    return (
      <table className="user-table" id="userTable" >
        <thead>
          {this.renderTableHead()}
        </thead>
        <tbody>
          {this.loadDataIntoTable()}
        </tbody>
      </table>
    )
  }
}

class UserTableItem extends Component {
  constructor (props) {
    super(props)
    this.renderItemByType = this.renderItemByType.bind(this)
  }

  renderItemByType () {
    const userFaculty = this.props.facultys.find((faculty) => {
      return Number.parseInt(faculty.facultyId) === this.props.itemData.facultyId
    })
    return (
      this.props.facultys.length !== 0
        ? <tr className="user-table-item"
          onClick={(e) => { this.props.selectItem(e) }}
          onDoubleClick={(e) => { this.props.inspectItem(e) }}
          index={this.props.itemIndex}
        >
          <td id="tableUserId">{this.props.itemData.username}</td>
          <td>{`${this.props.itemData.firstName} ${this.props.itemData.lastName}`}</td>

          {this.props.itemData.typeOfUser !== 'staff' ? <td>{userFaculty.facultyName}</td> : null}
          {this.props.itemData.typeOfUser === 'student' ? <td>{this.props.itemData.year}</td> : null}
          {this.props.itemData.typeOfUser === 'staff' ? <td>{this.props.itemData.standing}</td> : null}
        </tr>
        : null
    )
  }

  render () {
    return (this.renderItemByType())
  }
}

export default UserTable
