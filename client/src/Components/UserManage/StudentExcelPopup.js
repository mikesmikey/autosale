import React, { Component } from 'react';

import ExcelVerify from '../Utilities/ExcelVerify';
import ClientService from '../Utilities/ClientService';

const CServiceObj = new ClientService();

class StudentExcelPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fileName: "",
            source: null
        };
    }

    showInsertExcelModal(status) {

        if (status === "insertFile") {
            if (this.state.fileName.length > 0) {
                this.setState({
                    fileName: '', source: null
                });
            }
        }
        this.props.showModal();
        // console.log('when open',this.state.source);
    }

    onChange = e => {
        // switch (e.target.name) {
        //     // Updated this
        //     case 'selectedFile':
        //       if(e.target.files.length > 0) {
        //           // Accessed .name from file 
        //           this.setState({ fileName: e.target.files[0].name });
        //       }
        //     break;
        //     default:
        //         this.setState({ [e.target.name]: e.target.value });
        // }
        var fileExtension = e.target.files[0].name.split('.').pop()
        

        if(fileExtension === 'xlsx') {
            alert('good '+fileExtension)
            this.setState({ fileName: e.target.files[0].name, source: e.target.files[0] });
        }
        else{
            alert('ugly '+fileExtension)
        }

        //console.log(this.state.source);
    };

    render() {
        console.log('FileChanged', this.state.source);
        const { fileName } = this.state;
        let file = null;
        file = fileName
            ? (<span>File Selected - {fileName}</span>)
            : (<span>Choose a file...</span>);
        return (
            <div className="box is-user-popUp" style={{ width: "500px" }}>
                <h1 align="center">เลือกไฟล์</h1>
                <div align="left">
                    <label className="label is-fake">อัพโหลดไฟล์
                        <input
                            className="input"
                            type="file"
                            multiple={false}
                            type="file"
                            name="fileInput"
                            onChange={(event) => this.onChange(event)}
                        />
                    </label>
                    <label htmlFor="file">{file}</label>
                </div>
                <div align="right">                                                     {/* ค้างไว้ ตรงนี้ */}
                    <button
                        className="button is-oros is-free-size is-round"
                        onClick={this.props.closeModal}
                       
                    >
                        นำเข้าข้อมูลนิสิต
                    </button>
                    <button className="button is-yentafo is-round" onClick={this.props.closeModal}>ยกเลิก</button>
                </div>
            </div>
        );
    }
}


export default StudentExcelPopup;