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
            selectedUser: null
        }

        this.handleSelectType = this.handleSelectType.bind(this);
    }

    handleSelectType(e) {
        const target = e.target;
        const name = target.options[target.selectedIndex].value;

        this.setState({
            selectedType: name
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

                            <button className="button is-oros is-round is-pulled-right" onClick={() => { this.addUserModal.showModal() }}>เพิ่มผู้ใช้</button>
                        </div>
                        <div>
                            <span className="user-tab-is-15"></span>
                        </div>
                        <div className="columns is-stay-top">
                            <div className="column is-6 user-column-table">
                                <UserTable
                                    showManageModal={() => { this.manageUserModal.showModal() }}
                                    selectedType={this.state.selectedType}
                                />
                            </div>
                            <div className="column">
                                <div className="border-user-1">
                                    <div className="user-column-image">
                                        <img className="user-image" src={userImage} height="200" width="170" />
                                    </div>
                                    <div className="user-column-detail">
                                        <label className="label">รหัสประจำตัว : </label><p id="userId" className="p-inline">987654</p><br />
                                        <label className="label">ชื่อ : </label><p id="userName" className="p-inline">นาย ลาลี  เมสอน </p><br />
                                        <label className="label">คณะ : </label><p id="userFaculty" className="p-inline">วิทยาการสารสนเทศ</p><br />
                                        <label className="label">สาขา : </label><p id="userBranch" className="p-inline">วิทยาการคอมพิวเตอร์</p><br />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Modal ref={instance => { this.addUserModal = instance }} content={<AddUserPopUp showModal={() => { this.addUserModal.showModal() }} />} />
                <Modal ref={instance => { this.manageUserModal = instance }} content={
                    <ManageUserPopUp
                        closeModal={() => {
                            this.manageUserModal.closeModal()
                        }}
                        selectedType={this.state.selectedType}
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

        this.studentArr = [{
            username: "59161075",
            password: "jo500",
            gname: "Chainarong",
            sname: "Chantian",
            type: "Student",
            faculty: {
                name: "Informatics",
                branch: "Computer Science"
            },
            year: 3
        }];

        this.professorArr = [{
            username: "BurnBinRoomA",
            password: "jo500",
            gname: "NineB",
            sname: "AndNineA",
            type: "Professor",
            faculty: {
                name: "Informatics",
                branch: "Computer Science"
            }
        }];

        this.staffArr = [{
            username: "AAAA",
            password: "jo1000",
            gname: "Love",
            sname: "Live",
            type: "Staff",
            standing: "Housewife"
        }];
    }

    sampleTableData() {
        var dataArr = [];
        for (var i = 0; i < 30; i++) {
            dataArr[i] = <UserTableItem
                key={i}
                selectItem={(e) => { this.selectItem(e) }}
                editItem={(e) => { this.editItem(e) }}
                selectedType={this.props.selectedType}
            />
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
            }
        }
    }

    editItem(e) {
        const parent = e.target.parentElement
        if (parent.classList.contains("user-table-item")) {
            this.props.showManageModal();
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
                >
                    <td id="tableUserId">59160378</td>
                    <td>นายพีรณัฐ กันภัย</td>
                    <td>วิทยาการสารสนเทศ</td>
                    <td>3</td>
                </tr>
            );
        } else if (this.props.selectedType === "professor") {
            return (
                <tr className="user-table-item"
                    onClick={(e) => { this.props.selectItem(e) }}
                    onDoubleClick={(e) => { this.props.editItem(e) }}
                >
                    <td id="tableUserId">59160378</td>
                    <td>ส้นตีน กันภัย</td>
                    <td>วิทยาการสารสนเทศ</td>
                </tr>
            );
        } else if (this.props.selectedType === "staff") {
            return (
                <tr className="user-table-item"
                    onClick={(e) => { this.props.selectItem(e) }}
                    onDoubleClick={(e) => { this.props.editItem(e) }}
                >
                    <td id="tableUserId">59160378</td>
                    <td>นายพีรณัฐ กันภัย</td>
                    <td>วิทยาการสารสนเทศ</td>
                </tr>
            );
        }
    }

    render() {
        return (this.renderItemByType());
    }
}

class AddUserPopUp extends Component {
    addUser() {
        console.log("dddd!")
    }
    render() {
        return (
            <div className="box">
                <div className="column is-user-popUp">
                    <h1 align="center">เพิ่มข้อมูลนิสิต</h1>
                    <label className="label">ชื่อ</label>
                    <input className="input is-userName-width is-pulled-right" type="text" id="popAddUserName" /><br /><br />

                    <label className="label">นามสกุล</label>
                    <input className="input is-userName-width is-pulled-right" type="text" id="popAddLastName" /><br /><br />

                    <label className="label">รหัสประจำตัว</label>
                    <input className="input is-userName-width is-pulled-right" type="text" id="popAddUserId" /><br /><br />

                    <label className="label">คณะ</label>
                    <select className="user-mange-select-box-popUp is-pulled-right " type="text" id="popAddUserFaculty">
                        <option value="0"></option>
                        <option value="1">วิทยาการสารสนเทศ</option>
                        <option value="2">นิเทศ</option>
                        <option value="3">แพทย์</option>
                    </select><br /><br />

                    <label className="label">สาขา</label>
                    <select className="user-mange-select-box-popUp is-pulled-right" type="text" id="popAddUserBranch">
                        <option value="0"></option>
                        <option value="1">วิยาการคอมพิวเตอร์</option>
                        <option value="2">วิศวะซอฟแวร์</option>
                        <option value="3">เทคโนโลยีสารสนเทศ</option>
                    </select><br /><br />

                    <label className="label">ชั้นปี</label>
                    <select className="user-mange-select-box-popUp is-pulled-right" type="text" id="popAddUserYear">
                        <option value="0"></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select><br /><br />

                    <div className="column">
                        <button className="button is-oros is-round margin-user-popUp" onClick={() => { this.addUser() }}>เพิ่มข้อมูล</button>
                        <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ยกเลิก</button>
                    </div>
                </div>
            </div>
        );
    }
}

class ManageUserPopUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            popupStatus: "view"
        }

        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus(status) {
        this.setState({
            popupStatus: status
        });
    }

    renderPopupStatusByUserType() {
        if (this.props.selectedType === "student") {
            return (
                <tr className="user-table-item"
                    onClick={(e) => { this.props.selectItem(e) }}
                    onDoubleClick={(e) => { this.props.editItem(e) }}
                >
                    <td id="tableUserId">59160378</td>
                    <td>นายพีรณัฐ กันภัย</td>
                    <td>วิทยาการสารสนเทศ</td>
                    <td>3</td>
                </tr>
            );
        } else if (this.props.selectedType === "professor") {
            return (
                <tr className="user-table-item"
                    onClick={(e) => { this.props.selectItem(e) }}
                    onDoubleClick={(e) => { this.props.editItem(e) }}
                >
                    <td id="tableUserId">59160378</td>
                    <td>ส้นตีน กันภัย</td>
                    <td>วิทยาการสารสนเทศ</td>
                </tr>
            );
        } else if (this.props.selectedType === "staff") {
            return (
                <tr className="user-table-item"
                    onClick={(e) => { this.props.selectItem(e) }}
                    onDoubleClick={(e) => { this.props.editItem(e) }}
                >
                    <td id="tableUserId">59160378</td>
                    <td>นายพีรณัฐ กันภัย</td>
                    <td>วิทยาการสารสนเทศ</td>
                </tr>
            );
        }
    }

    defindInputClassByType() {
        const popup = document.querySelector('.is-user-popUp');
        const popupInputs = popup.querySelectorAll('.input');

        popupInputs.map((element) => {
            if (this.state.popupStatus === "view" || this.state.popupStatus === "add") {
                element.classList.remove("disabled");
            } else if (this.state.popupStatus === "edit") {
                element.classList.add("disabled");
            }
        })
    }

    render() {
        return (
            <div className="box">
                <div>
                    <h1 align="center">ข้อมูลนิสิต</h1>

                    <div className="columns input-div">
                        <div className="column is-2">
                            <label className="label">ชื่อ</label>
                        </div>
                        <div className="column">
                            <input className="input is-full-width" type="text" id="popAddUserName" />
                        </div>
                    </div>

                    <div className="columns input-div">
                        <div className="column is-2">
                            <label className="label">นามสกุล</label>
                        </div>
                        <div className="column">
                            <input className="input is-full-width" type="text" id="popAddLastName" />
                        </div>
                    </div>

                    <div className="columns input-div">
                        <div className="column is-2">
                            <label className="label">รหัสประจำตัว</label>
                        </div>
                        <div className="column">
                            <input className="input is-full-width" type="text" id="popAddUserId" />
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
                                <select className="user-mange-select-box-popUp is-full-width" type="text" id="popAddYear">
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
                                <select className="user-mange-select-box-popUp is-full-width" type="text" id="popAddPosition">
                                    <option value="0"></option>
                                    <option value="1">แม่บ้าน</option>
                                    <option value="2">ช่างไฟ</option>
                                    <option value="3">คนล้างส้วม</option>
                                </select>
                            </div>
                        </div>
                        :
                        null
                    }

                    <div className="columns is-center">
                        <button className="button is-oros is-round margin-user-popUp-1" onClick={() => { this.deleteUser() }}>ลบข้อมูล</button>
                        <button className="button is-orange is-round" onClick={() => { this.editUser() }}>แก้ไขข้อมูล</button>
                        <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ยกเลิก</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default UserManage;