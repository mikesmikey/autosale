import React, { Component } from 'react';

//Components
import Modal from '../Utilities/Modal';
import '../../StyleSheets/userManage.css'
import userImage from '../../Resources/imgs/default-user-image.png';



class UserManage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedType: "student",
            selectedUser: false
        }

        this.handleSelectType = this.handleSelectType.bind(this);
        this.setSelectedUser = this.setSelectedUser.bind(this);
    }

    handleSelectType(e) {
        const target = e.target;
        const name = target.options[target.selectedIndex].value;

        this.setState({
            selectedType: name
        })
    }

    setSelectedUser(user) {
        this.setState({
            selectedUser: user
        })
    }

    render() {
        return (
            <div className="subcontent-main-div user-manage">
                <div className="box with-title is-round">
                    <div className="box-title is-violet">
                        จัดการผู้ใช้
                    </div>
                    <div className="box-content">
                        <div>
                            <label className="label">ผู้ใช้ : </label>
                            <select className="user-mange-select-box" onChange={this.handleSelectType}>
                                <option value="student">นิสิต</option>
                                <option value="professor">อาจารย์</option>
                                <option value="staff">เจ้าหน้าที่</option>
                            </select>

                            <label className="label">รหัสประจำตัว : </label>
                            <input className="input is-userId-width" type="text" id="userId" />

                            <span className="user-tab-is-15">
                                <button type="submit"><i className="fa fa-search height50"></i></button>
                            </span>

                            <button className="button is-oros is-round is-pulled-right" onClick={() => { this.managePopup.showManageModal("insert") }}>เพิ่มผู้ใช้</button>
                        </div>
                        <div>
                            <span className="user-tab-is-15"></span>
                        </div>
                        <div className="columns is-stay-top">
                            <div className="column is-6 user-column-table">
                                <UserTable
                                    showManageModal={() => { this.managePopup.showManageModal("view") }}
                                    selectedType={this.state.selectedType}
                                    setSelectedUser={this.setSelectedUser}
                                />
                            </div>
                            <div className="column">
                                <div className="border-user-1">
                                    <div className="user-column-image">
                                        <img className="user-image" src={userImage} height="200" width="170" />
                                    </div>
                                    <div className="user-column-detail">
                                        {this.state.selectedUser ?
                                            <span>
                                                <label className="label">รหัสประจำตัว : </label> <p id="userId" className="p-inline">{this.state.selectedUser.username}</p> <br />
                                                <label className="label">ชื่อ : </label> <p id="userName" className="p-inline">{this.state.selectedUser.gname}</p> <br />
                                                {
                                                    this.state.selectedUser.type !== "staff" ?
                                                        <span>
                                                            <label className="label">คณะ : </label> <p id="userFaculty" className="p-inline">{this.state.selectedUser.faculty.name}</p> <br />
                                                            <label className="label">สาขา : </label> <p id="userBranch" className="p-inline">{this.state.selectedUser.faculty.branch}</p> <br />
                                                        </span>
                                                        :
                                                        null
                                                }
                                                {this.state.selectedUser.type === "student" ? <label className="label">ชั้นปี :  <p id="userBranch" className="p-inline">{this.state.selectedUser.year}</p> </label> : null}
                                                {this.state.selectedUser.type === "staff" ? <label className="label">ตำแหน่ง :  <p id="userBranch" className="p-inline">{this.state.selectedUser.standing}</p> </label> : null}
                                            </span>
                                            :
                                            <span>
                                                <label className="label">รหัสประจำตัว : -</label> <br />
                                                <label className="label">ชื่อ : -</label><br />
                                                <label className="label">คณะ : -</label><br />
                                                <label className="label">สาขา : -</label><br />
                                                <label className="label">ชั้นปี : -</label><br />
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Modal ref={instance => { this.manageUserModal = instance }} content={
                    <ManageUserPopUp
                        ref={instance => { this.managePopup = instance }}
                        closeModal={() => {
                            this.manageUserModal.closeModal()
                        }}
                        showModal={() => {
                            this.manageUserModal.showModal()
                        }}
                        selectedType={this.state.selectedType}
                        selectedUser={this.state.selectedUser}
                    />
                }
                />
            </div>
        );
    }
}

class UserTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRow: null,
        }

        this.userArr = [{
            username: "59161075",
            password: "jo500",
            gname: "Chainarong",
            sname: "Chantian",
            type: "student",
            faculty: {
                name: "Informatics",
                branch: "Computer Science"
            },
            year: 3
        }, {
            username: "BurnBinRoomA",
            password: "jo500",
            gname: "NineB",
            sname: "AndNineA",
            type: "professor",
            faculty: {
                name: "Informatics",
                branch: "Computer Science"
            }
        }, {
            username: "AAAA",
            password: "jo1000",
            gname: "Love",
            sname: "Live",
            type: "staff",
            standing: "Housewife"
        }];
    }

    sampleTableData() {
        var dataArr = [];
        for (var i = 0; i < this.userArr.length; i++) {
            if (this.props.selectedType === this.userArr[i].type) {
                dataArr[i] = <UserTableItem
                    key={i}
                    selectItem={(e) => { this.selectItem(e) }}
                    editItem={(e) => { this.editItem(e) }}
                    selectedType={this.props.selectedType}
                    itemIndex={i}
                    itemData={this.userArr[i]}
                />
            }
        }
        return dataArr;
    }

    renderTableHead() {
        if (this.props.selectedType === "student") {
            return (
                <tr >
                    <th>รหัสประจำตัว</th>
                    <th >ชื่อ-นามสกุล</th>
                    <th >คณะ</th>
                    <th >ชั้นปี</th>
                </tr>
            );
        } else if (this.props.selectedType === "professor") {
            return (
                <tr >
                    <th>รหัสประจำตัว</th>
                    <th >ชื่อ-นามสกุล</th>
                    <th >คณะ</th>
                </tr>
            );
        } else if (this.props.selectedType === "staff") {
            return (
                <tr >
                    <th>รหัสประจำตัว</th>
                    <th >ชื่อ-นามสกุล</th>
                    <th >ต่ำแหน่ง</th>
                </tr>
            );
        }
    }

    selectItem(e) {
        const parent = e.target.parentElement
        if (parent.classList.contains("user-table-item")) {
            if (!parent.classList.contains("is-active")) {
                if (this.state.selectedRow != null) {
                    this.state.selectedRow.classList.remove("is-active");
                }
                parent.classList.add("is-active");
                this.setState({
                    selectedRow: parent
                })
                this.props.setSelectedUser(this.userArr[parent.getAttribute("index")]);
            }
        }
    }

    editItem(e) {
        const parent = e.target.parentElement
        if (parent.classList.contains("user-table-item")) {
            this.props.showManageModal();
            this.props.setSelectedUser(this.userArr[parent.getAttribute("index")]);
        }
    }

    render() {
        return (
            <table className="select-table" id="userTable" >
                <thead>
                    {this.renderTableHead()}
                </thead>
                <tbody>
                    {this.sampleTableData()}
                </tbody>
            </table>
        );
    }
}

class UserTableItem extends Component {

    constructor(props) {
        super(props);

        this.renderItemByType = this.renderItemByType.bind(this);
    }

    renderItemByType() {
        if (this.props.selectedType === "student") {
            return (
                <tr className="user-table-item"
                    onClick={(e) => { this.props.selectItem(e) }}
                    onDoubleClick={(e) => { this.props.editItem(e) }}
                    index={this.props.itemIndex}
                >
                    <td id="tableUserId">{this.props.itemData.username}</td>
                    <td>{this.props.itemData.gname}</td>
                    <td>{this.props.itemData.faculty.name}</td>
                    <td>{this.props.itemData.faculty.year}</td>
                </tr>
            );
        } else if (this.props.selectedType === "professor") {
            return (
                <tr className="user-table-item"
                    onClick={(e) => { this.props.selectItem(e) }}
                    onDoubleClick={(e) => { this.props.editItem(e) }}
                    username={this.props.itemData.username}
                    index={this.props.itemIndex}
                >
                    <td id="tableUserId">{this.props.itemData.username}</td>
                    <td>{this.props.itemData.gname}</td>
                    <td>{this.props.itemData.faculty.name}</td>
                </tr>
            );
        } else if (this.props.selectedType === "staff") {
            return (
                <tr className="user-table-item"
                    onClick={(e) => { this.props.selectItem(e) }}
                    onDoubleClick={(e) => { this.props.editItem(e) }}
                    username={this.props.itemData.username}
                    index={this.props.itemIndex}
                >
                    <td id="tableUserId">{this.props.itemData.username}</td>
                    <td>{this.props.itemData.gname}</td>
                    <td>{this.props.itemData.standing}</td>
                </tr>
            );
        }
    }

    render() {
        return (this.renderItemByType());
    }
}

class ManageUserPopUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            popupStatus: "view",
            fnameInput: "",
            snameInput: "",
            usernameInput: "",
            yearIndex: 0
        }

        this.changeStatus = this.changeStatus.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })
    }

    clearInput() {
        this.setState({
            fname_input: "",
            sname_input: "",
            username_input: "",
            yearIndex : 0
        })
    }

    loadUserInput() {
        this.setState({
            fnameInput: this.props.selectedUser.gname,
            snameInput: this.props.selectedUser.sname,
            usernameInput: this.props.selectedUser.username,
            yearIndex: this.props.selectedUser.year
        })
    }

    changeStatus(status) {
        this.setState({
            popupStatus: status
        });
    }

    showManageModal(status) {
        if (status === "insert") {
            this.clearInput();
        } else {
            this.loadUserInput();
        }
        this.changeStatus(status);

        this.props.showModal();
    }

    defindInputClassByType() {
        const popupInputs = document.querySelectorAll('.is-user-popUp .input, .is-user-popUp select');

        popupInputs.forEach((element) => {
            if (this.state.popupStatus === "edit" || this.state.popupStatus === "insert") {
                element.classList.remove("disabled");
            } else if (this.state.popupStatus === "view") {
                element.classList.add("disabled");
            }
        })
    }

    componentDidUpdate() {
        this.defindInputClassByType();
    }

    getManageTitleByType() {

        const compareSelectedTypeTable = {
            "student": "นิสิต",
            "professor": "อาจารย์",
            "staff": "เจ้าหน้าที่"
        };

        const compareStatusTable = {
            "view": `ข้อมูล${compareSelectedTypeTable[this.props.selectedType]}`,
            "edit": `แก้ไขข้อมูล${compareSelectedTypeTable[this.props.selectedType]}`,
            "insert": `เพิ่มข้อมูล${compareSelectedTypeTable[this.props.selectedType]}`
        };

        return compareStatusTable[this.state.popupStatus];
    }

    render() {
        return (
            <div className="box is-user-popUp" style={{ width: "500px" }}>
                <div>
                    <h1 align="center">{this.getManageTitleByType()}</h1>

                    <div className="columns input-div">
                        <div className="column is-2">
                            <label className="label">ชื่อ</label>
                        </div>
                        <div className="column">
                            <input
                                className="input is-full-width"
                                type="text" id="popAddUserName"
                                value={this.state.fnameInput}
                                name="fnameInput"
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="columns input-div">
                        <div className="column is-2">
                            <label className="label">นามสกุล</label>
                        </div>
                        <div className="column">
                            <input
                                className="input is-full-width"
                                type="text"
                                id="popAddLastName"
                                value={this.state.snameInput}
                                name="snameInput"
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="columns input-div">
                        <div className="column is-2">
                            <label className="label">รหัสประจำตัว</label>
                        </div>
                        <div className="column">
                            <input
                                className="input is-full-width"
                                type="text"
                                id="popAddUserId"
                                value={this.state.usernameInput}
                                name="usernameInput"
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>

                    {this.props.selectedType === "student" || this.props.selectedType === "professor" ?
                        <div className="columns input-div">
                            <div className="column is-2">
                                <label className="label">คณะ</label>
                            </div>
                            <div className="column">
                                <select className="user-mange-select-box-popUp is-full-width" type="text" id="popAddUserFaculty">
                                    <option value="0"></option>
                                    <option value="1">วิทยาการสารสนเทศ</option>
                                    <option value="2">นิเทศ</option>
                                    <option value="3">แพทย์</option>
                                </select>
                            </div>
                        </div>
                        :
                        null
                    }
                    {this.props.selectedType === "student" || this.props.selectedType === "professor" ?
                        <div className="columns input-div">
                            <div className="column is-2">
                                <label className="label">สาขา</label>
                            </div>
                            <div className="column">
                                <select className="user-mange-select-box-popUp is-full-width" type="text" id="popAddUserBranch">
                                    <option value="0"></option>
                                    <option value="1">วิยาการคอมพิวเตอร์</option>
                                    <option value="2">วิศวะซอฟแวร์</option>
                                    <option value="3">เทคโนโลยีสารสนเทศ</option>
                                </select>
                            </div>
                        </div>
                        :
                        null
                    }

                    {this.props.selectedType === "student" ?
                        <div className="columns input-div">
                            <div className="column is-2">
                                <label className="label">ชั้นปี</label>
                            </div>
                            <div className="column">
                                <select
                                    className="user-mange-select-box-popUp is-full-width"
                                    id="popAddYear"
                                    name="yearIndex"
                                    onChange={this.handleInputChange}
                                    value={this.state.yearIndex}
                                >
                                    <option value="0"></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>
                        </div>

                        :
                        null
                    }

                    {this.props.selectedType === "staff" ?

                        <div className="columns input-div">
                            <div className="column is-2">
                                <label className="label">ตำแหน่ง</label>
                            </div>
                            <div className="column">
                                <input className="input is-full-width" type="text" id="popAddPosition" value={this.props.selectedUser.standing} />
                            </div>
                        </div>
                        :
                        null
                    }

                    <div className="columns" style={{ marginTop: "20px" }}>
                        {this.state.popupStatus === "view" ?
                            <div className="column is-7" style={{ textAlign: "center" }}>
                                <button className="button is-oros is-round" onClick={() => { this.deleteUser() }}>ลบข้อมูล</button>
                                <button className="button is-orange is-round" onClick={() => { this.changeStatus("edit") }}>แก้ไขข้อมูล</button>
                                <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ยกเลิก</button>
                            </div>
                            :
                            null
                        }

                        {this.state.popupStatus === "edit" ?
                            <div className="column is-7" style={{ textAlign: "center" }}>
                                <button className="button is-orange is-round" onClick={() => { this.editUser() }}>บันทึก</button>
                                <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ยกเลิก</button>
                            </div>
                            :
                            null
                        }

                        {this.state.popupStatus === "insert" ?
                            <div className="column is-7" style={{ textAlign: "center" }}>
                                <button className="button is-oros is-round" onClick={() => { this.editUser() }}>เพิ่มข้อมูล</button>
                                <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ยกเลิก</button>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export default UserManage;