import React, { Component } from 'react';
import '../../StyleSheets/modal.css';

class Modal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status : false
        }

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    showModal() {

        document.querySelector("body").style.overflow = "hidden";

        this.setState({
            status : true
        });
    }

    closeModal() {
        document.querySelector("body").style.overflow = "auto";

        this.setState({
            status : false
        })
    }

    

    render() {
        return (
            <div className={this.state.status? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    {this.props.content}
                </div>
            </div>
        )
    };
}

export default Modal;