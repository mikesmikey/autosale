import React, { Component } from 'react';

import Modal from '../Utilities/Modal'

class CarBuy extends Component {

    example = () => {
        return (<Example />);
    }

    createExample() {
        var exam = <Example/>;
        var modal = <Modal content={exam}/>

        exam.props.modal = modal;
        modal.props.exam = exam;
        return modal;
    }

    render() {
        return (
            <div className="subcontent-main-div box car-buy">
                ซื้อรถ
                <button className="button is-primary" onClick={()=>{this.modal.showModal()}}>modal1</button>
                <button className="button is-danger" onClick={()=>{this.modal2.showModal()}}>modal2</button>
                <Modal ref={instance => { this.modal = instance } } content={<Example closeModal={()=>{this.modal.closeModal()}}/>}/>
                <Modal ref={instance => { this.modal2 = instance } } 
                content={
                <div className="box">
                    อะไร
                    <button className="button" onClick={()=>{this.modal2.closeModal()}}>ปิด</button>
                </div>
            }/>
            </div>
        )
    }
}

class Example extends Component {

    hello() {
        console.log("Hello!")
    }

    render() {
        return (
            <div className="box">
                <button className="button" onClick={()=>{this.hello()}}>print Hello</button>
                <button className="button" onClick={this.props.closeModal}>close</button>
            </div>
        );
    }
}

export default CarBuy;