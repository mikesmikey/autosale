// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'

import ClientService from '../Utilities/ClientService'
import readXlsxFile from 'read-excel-file'

const CServiceObj = new ClientService()

class StudentExcelPopup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fileName: '',
      source: null
    }

    this.handleFileChange = this.handleFileChange.bind(this)
  }
  resetFile () {
    this.props.closeModal()
    this.setState({
      fileName: '',
      source: null
    })
  }
  showInsertExcelModal () {
    this.props.showModal()
  }

  addManyStudent (studentsObj) {
    // console.log('json object ', JSON_object)
    CServiceObj.addManyUsers(studentsObj).then((result) => {
      if (result) {
        alert('เพิ่มสำเร็จ')
        this.setState({
          fileName: '',
          source: null
        })
      } else {
        alert('เพิ่มไม่สำเร็จ!')
      }
    })
  }
  validateDataInFile () {
    if (this.state.fileName.length < 1) {
      alert('ไม่มีไฟล์ อัพโหลดมาใหม่')
    } else {
      readXlsxFile(this.state.source).then((rows) => {
        if (rows.length >= 1) {
          if (rows[0][0] === 'รหัสนิสิต' &&
                        rows[0][1] === 'ชื่อ' &&
                        rows[0][2] === 'นามสกุล' &&
                        rows[0][3] === 'คณะ' &&
                        rows[0][4] === 'สาขา' &&
                        rows[0][5] === 'ชั้นปี') {
            var users = []

            for (var i = 1; i < rows.length; i++) {
              users.push({
                'username': rows[i][0],
                'gname': rows[i][1],
                'sname': rows[i][2],
                'faculty': {
                  'name': rows[i][3],
                  'branch': rows[i][4]
                },
                'typeof_user': 'student',
                'year': rows[i][5],
                'isExaminer': false
              })
            }
            alert('OK')
            this.addManyStudent(users)
          } else {
            alert('คอลัมน์ในไฟล์ Excel ไม่ถูกต้อง')
          }
        } else {
          alert('คอมัมน์ในไฟล์ Excel ไม่มีข้อมูล')
          this.setState({
            fileName: '',
            source: null
          })
        }
      })
      // console.log('deleted-file ', this.state.source)
    }
  }
    handleFileChange = (event) => {
      try {
        var fileExtension = ''
        fileExtension = event.target.files[0].name.split('.').pop()
      } catch (error) { }

      if (fileExtension === 'xlsx') {
        this.setState({
          fileName: event.target.files[0].name,
          source: event.target.files[0]
        })
      } else {
        this.setState({
          fileName: '',
          source: null
        })
      }
      // console.log('handleChange ', this.state.source)
    }

    render () {
      console.log('FileChanged', this.state.source)
      const { fileName } = this.state
      let file = null
      file = fileName
        ? (<span>ไฟล์ที่เลือก - {fileName}</span>)
        : (<span>เลือกไฟล์ ...</span>)
      return (
        <div className="box is-user-popUp" style={{ width: '500px' }}>
          <h1 align="center">เลือกไฟล์</h1>
          <div align="left F">
            <label className="label is-fake">อัพโหลดไฟล์ (.xlsx)
              <input
                className="input"
                type="file"
                multiple={false}
                type="file"
                name="fileInput"
                onChange={this.handleFileChange}
              />
            </label>
            <label htmlFor="file">{file}</label>
          </div>
          <div align="right">
            <button
              className="button is-oros is-free-size is-round"
              onClick={() => { this.validateDataInFile() }}

            >
                        นำเข้าข้อมูลนิสิต
            </button>
            <button className="button is-yentafo is-round" onClick={() => { this.resetFile() }}>ยกเลิก</button>
          </div>
        </div>
      )
    }
}

export default StudentExcelPopup
