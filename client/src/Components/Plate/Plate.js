import React, { Component } from 'react';

import '../../StyleSheets/colorStyle.css';
class Plate extends Component {
    render() {
        return (
            <div class="subcontent-main-div box plate" >
                <section class="section">
                    <div class="container" id="bg-colorWhite">
                        <div class="columns is-centered">
                            <div class="column">
                                <div class="columns">
                                    <section class="section">
                                        <div class="container">
                                            <div class="columns is-centered">
                                                <div class="column">
                                                    <div class="columns">
                                                        <div class="column is-3" id="m3">
                                                            <div class="field">
                                                                <p class="control has-icons-left">
                                                                    <input class="input" placeholder="ค้นหา" />
                                                                    <span class="icon is-small is-left">
                                                                        <i class="fas fa-search"></i>
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div class="select is-multiple" id="width100">
                                                                <select multiple size="8" id="width100">
                                                                    <option value="Argentina">กข123</option>
                                                                    <option value="Bolivia">ฟห121</option>
                                                                    <option value="Brazil">พก999</option>
                                                                </select>
                                                            </div>
                                                            <div class="column">
                                                                <a class="button is-buttonMINT ">เพิ่ม</a>
                                                                <a class="button is-buttonRED " id="m22">ลบ</a>
                                                            </div>
                                                        </div>
                                                        <div class="column " id="m5">
                                                            <div class="columns">
                                                                <div class="column is-10 big-box-border">
                                                                    <table >
                                                                        <tr>
                                                                            <th>รายละเอียดลูกค้า</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>เลขออเดอร์ : 214321890427140721</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>เลขทะเบียน : กข123</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>ยี่ห้อ : susuki</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>รุ่น : swift model-ab123</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>เจ้าของ : James Goodman</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>รายละเอียด : ทะเบียนขาด 10 ปี</td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <a class="button is-buttonMINT " id="m75" >พิมพ์</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Plate;