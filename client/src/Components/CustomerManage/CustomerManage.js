import React, { Component } from 'react';

import '../../StyleSheets/colorStyle.css';
class CustomerManage extends Component {
    render() {
        return (
            <div className="subcontent-main-div box customer-manage">
                <section class="section">
                    <div class="container">
                        <div class="columns is-centered">
                            <div class="column">
                                <div class="columns">
                                    <div class="column is-3">
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
                                                <option value="Argentina">James Goodman</option>
                                                <option value="Bolivia">Maria Brown</option>
                                                <option value="Brazil">Saul Walker</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="column " id="m5">
                                        <div class="columns">
                                            <div class="column is-10 big-box-border">
                                                <p>ชื่อ : James GoodMan</p>
                                                <p>ที่อยู่ : New York USA</p>
                                                <p>โทรศัพท์ : 0999999999</p>
                                                <p>ประเภท : ทั่วไป</p>
                                            </div>
                                        </div>

                                        <a class="button is-button1 ">พิมพ์รายละเอียดลูกค้า</a>


                                        <a class="button is-button1">พิมพ์รายการออเดอร์ของลูกค้า</a>


                                        <a class="button is-button2" id="m18">แก้ไขข้อมูลลูกค้า</a>


                                        <a class="button is-button3">ลบลูกค้า</a>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        )
    }
}

export default CustomerManage;