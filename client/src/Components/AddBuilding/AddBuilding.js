/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ClientService from '../Utilities/ClientService'

// Components
import Modal from '../Utilities/Modal'

import '../../StyleSheets/home.css'
import '../../StyleSheets/addBuilding.css'

const CServiceObj = new ClientService()
class AddBuilding extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedRow: null,
      selectedBuilding: null,
      dataBuilding: [],
      searchShortName: ''
    }
    this.loadDataIntoTable = this.loadDataIntoTable.bind(this)
    this.setSelectedBuilding = this.setSelectedBuilding.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount () {
    this.loadBuilding()
  }

  loadBuilding () {
    CServiceObj.getBuilding().then((data) => {
      this.setDataBuilding(data)
    })
  }

  loadBuildingByShortName (searchShortName) {
    CServiceObj.searchBuilding(searchShortName).then((data) => {
      console.log(data)
    })
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  setDataBuilding (data) {
    this.setState({
      dataBuilding: data
    })
    var test = this.state.dataBuilding
    console.log(test)
  }

  renderTableHead () {
    return (
      <tr className="is-header">
        <th>รหัสตึก</th>
        <th >ชื่อตึก</th>
        <th >จำนวนชั้น</th>
      </tr>
    )
  }

  loadDataIntoTable () {
    var returnData = []

    for (var i = 0; i < this.state.dataBuilding.length; i++) {
      returnData[i] = <BuildingTableItem
        key={i}
        selectItem={(e) => { this.selectItem(e) }}
        itemIndex={i}
        itemData={this.state.dataBuilding[i]}
      />
    }
    return returnData
  }

  setSelectedBuilding (building) {
    this.setState({
      selectedBuilding: building
    })
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
        this.setSelectedBuilding(this.state.dataBuilding[parent.getAttribute('index')].short_name)
      }
    }
  }

  render () {
    return (
      <div className="subcontent-main-div home">
        <div className="box with-title is-round">
          <div className="box-title is-violet">
                        จัดการตึก
          </div>
          <div className="box-content">
            <div className="columns">
              <div className="column is-pulled-left ">
                <div className="input-with-find-building ">
                  <label className="label">รหัสตึก : </label>
                  <input className="input is-building-width" type="text" name="searchShortName" value={this.state.searchShortName} onChange={this.handleInputChange} />
                </div>
                <div className="input-with-find-building">
                  <button type="submit"><i className="fa fa-search height50" onClick={this.loadBuildingByShortName} ></i></button>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-pulled-left building-table-auto">
                <table className="user-table" id="buildingTable" >
                  <thead>
                    {this.renderTableHead()}
                  </thead>
                  <tbody>
                    {this.loadDataIntoTable()}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-bottom">
            </div>
            <div className="columns">
              <div className="column is-building-button">
                <button className="button is-oros is-round" onClick={() => { this.manageBuildingPopUp.showModal() }}>เพิ่มตึก</button>
                <button className="button is-yentafo is-round" onClick={() => { this.deleteBuildingPopUp.showModal() }}>ลบตึก</button>
              </div>
            </div>
          </div>
          <BuildingTableItem
            ref={instance => { this.buildingTable = instance }}
          />
        </div>
        <Modal ref={instance => { this.manageBuildingPopUp = instance }} content={
          <BuildingPopUp closeBuildingPopUp={() => { this.manageBuildingPopUp.closeModal() }}
          />}
        />
        <Modal ref={instance => { this.deleteBuildingPopUp = instance }} content={
          <DeleteBuildingPopUp closeDeleteBuildingPopUp={() => { this.deleteBuildingPopUp.closeModal() }}
            selectedBuilding={this.state.selectedBuilding}
          />}
        />
      </div>
    )
  }
}

class BuildingTableItem extends Component {
  constructor (props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }

  renderItem () {
    return (
      <tr className="user-table-item"
        onClick={(e) => { this.props.selectItem(e) }}
        index={this.props.itemIndex}
      >
        <td>{this.props.itemData.short_name}</td>
        <td>{this.props.itemData.building_name}</td>
        <td>{this.props.itemData.floors}</td>
      </tr>
    )
  }

  render () {
    return (this.renderItem())
  }
}

class BuildingPopUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inputShortNameBuilding: '',
      inputNameBuilding: '',
      inputFloorsBuilding: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.addButtonPopUpHandle = this.addButtonPopUpHandle.bind(this)
  }

  handleInputChange (e) {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  setBuldingInput (name, shortname, floor) {
    this.setState({
      inputNameBuilding: name,
      inputShortNameBuilding: shortname,
      inputFloorsBuilding: floor
    })
  }

  addButtonPopUpHandle () {
    // eslint-disable-next-line radix
    var floorInt = parseInt(this.state.inputFloorsBuilding)
    if (floorInt <= 0 || isNaN(floorInt) || this.state.inputNameBuilding === '' || this.state.inputShortNameBuilding === '' || this.state.inputFloorsBuilding === '') {
      alert('กรุณาใส่ข้อมูลให้ถูกต้อง')
    } else {
      var newBuilding = {}
      newBuilding.building_name = this.state.inputNameBuilding
      newBuilding.short_name = this.state.inputShortNameBuilding
      newBuilding.floors = floorInt
      newBuilding.Rooms = []

      const buildingObj = CServiceObj.createBuildingDataObject(newBuilding)
      CServiceObj.addBuilding(buildingObj.getBuildingObjectData()).then((result) => {
        if (result) {
          alert('เพิ่มสำเร็จ')
          this.setBuldingInput('', '', '')
        } else {
          alert('เพิ่มไม่สำเร็จ!')
        }
      })
    }
  }

  render () {
    return (
      <div className="box " style={{ width: '500px' }}>
        <div className="columns">
          <label className="label font-size-2" >เพิ่มตึก</label>
        </div>
        <br />
        <div className="columns">
          <div className="column is-building-popup">
            <label className="label font-size-1" >ชื่อตึก</label>
          </div>
          <div className="column">
            <input className="input is-building-popup-width " type="text" value={this.state.inputNameBuilding} name="inputNameBuilding" onChange={this.handleInputChange} />
          </div>
        </div>
        <br />
        <div className="columns">
          <div className="column is-building-popup">
            <label className="label font-size-1" >รหัสตึก</label>
          </div>
          <div className="column">
            <input className="input is-building-popup-width " type="text" value={this.state.inputShortNameBuilding} name="inputShortNameBuilding" onChange={this.handleInputChange} />
          </div>
        </div>
        <br />
        <div className="columns">
          <div className="column is-building-popup">
            <label className="label font-size-1" >จำนวนชั้น</label>
          </div>
          <div className="column">
            <input className="input is-building-popup-width " type="text" value={this.state.inputFloorsBuilding} name="inputFloorsBuilding" onChange={this.handleInputChange} />
          </div>
        </div>
        <br />
        <div className="columns">
          <button className="button is-oros is-round" onClick={this.addButtonPopUpHandle}>บันทึก</button>
          <button className="button is-yentafo is-round" onClick={this.props.closeBuildingPopUp}>ยกเลิก</button>
        </div>
      </div>
    )
  }
}

class DeleteBuildingPopUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      shortnameDelete: null
    }
    this.deleteButtonHandle = this.deleteButtonHandle.bind(this)
  }
  setShortnameDelete () {
    this.setState({
      shortnameDelete: this.props.selectedBuilding
    })
    this.deleteButtonHandle()
  }

  deleteButtonHandle () {
    CServiceObj.deleteBuilding(this.props.selectedBuilding).then((result) => {
      if (result) {
        alert('ลบสำเร็จ')
        this.props.closeDeleteBuildingPopUp()
      } else {
        alert('ลบไม่สำเร็จ!')
      }
    })
  }

  render () {
    return (
      <div className="box " style={{ width: '400px' }}>
        <div className="columns">
          <label className="label font-size-1" >ต้องการลบหรือไม่</label>
        </div>
        <br />
        <div className="columns">
          <button className="button is-oros is-round" onClick={this.deleteButtonHandle}>ตกลง</button>
          <button className="button is-yentafo is-round" onClick={this.props.closeDeleteBuildingPopUp}>ยกเลิก</button>
        </div>
      </div>
    )
  }
}

export default AddBuilding
