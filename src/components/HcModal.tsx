import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import HcSignTabs from "./HcSignTabs";

interface HcModalProps {
    show: boolean,
    handleClose: () => void
}

export default class HcModal extends Component<HcModalProps> {

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.handleClose()} dialogClassName="modal-50w" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <HcSignTabs />
                </Modal.Body>
            </Modal>
        );
    }
}