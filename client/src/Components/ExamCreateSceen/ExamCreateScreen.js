import React, { Component } from 'react';

import '../../StyleSheets/ExamCreateScreen.css';

class ExamCreateScreen extends Component {
    render() {
        return (
            <div className="subcontent-main-div exam-create-screen">
                <div className="box with-title is-round">
                    <div className="box-title is-violet">
                        เพิ่มการสอบ
                    </div>
                    <div className="box-content">
                        <div className="search-area">
                            <div className="columns is-stay-top">
                                <div className="column is-1">
                                    <p className="label is-2">รหัสวิชา</p>
                                </div>
                                <div className="column">
                                    <input className="input is-full-width" type="text" placeholder="ค้นหา" />
                                </div>
                            </div>
                        </div>
                        <div className="table-area">
                            table
                        </div>
                        <div className="button-area">
                            button
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExamCreateScreen;