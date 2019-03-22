import React, { Component } from 'react';

import ClientService from '../Utilities/ClientService';

class ScoreTable extends Component{

    constructor(props) {
        super(props);

        this.state = {
            selectedRow: null,
            data: []
        }


        this.loadDataIntoTable = this.loadDataIntoTable.bind(this);
    }


    renderTableHead() {
        return (
            <tr className="is-header">
                <th>วันที่ประกาศ</th>
                <th >รหัสวิชา</th>
                <th>ชื่อวิชา</th>
                <th >ประเภท</th>
            </tr>
        );
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
                this.props.setSelectedUser(this.state.data[parent.getAttribute("index")]);
            }
        }
    }

    inspectItem(e) {
        const parent = e.target.parentElement;
        if (parent.classList.contains("user-table-item")) {
            this.props.showManageModal();
            this.props.setSelectedUser(this.state.data[parent.getAttribute("index")]);
        }
    }

    loadDataIntoTable() {
        var returnData = [];
        for (var i = 0; i < this.state.data.length; i++) {
            returnData[i] = <ScoreTableItem
                key={i}
                selectItem={(e) => { this.selectItem(e) }}
                inspectItem={(e) => { this.inspectItem(e) }}
                itemIndex={i}
                itemData={this.state.data[i]}
            />
        }
        return returnData;
    }

    render() {
        return (
            <table className="score-table" id="scoreTable" >
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


class ScoreTableItem extends Component {

    constructor(props) {
        super(props);
        this.renderItemByType = this.renderItemByType.bind(this);
    }

    renderItemByType() {
        return (
            <tr className="score-table-item"
                onClick={(e) => { this.props.selectItem(e) }}
                onDoubleClick={(e) => { this.props.inspectItem(e) }}
                index={this.props.itemIndex}
            >
                <td id="tableUserId">55</td>
                
            </tr>
        );
    }

    render() {
        return (this.renderItemByType());
    }
}


export default ScoreTable;