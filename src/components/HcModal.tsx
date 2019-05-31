import React, { Component } from "react";
import Modal, { ModalProps } from "react-bootstrap/Modal";
import ModalTitle from "react-bootstrap/ModalTitle";

export interface HcModalProps extends Pick<ModalProps, 'size'> {
    title?: string,
    show: boolean,
    handleClose: () => void
}

export default class HcModal extends Component<HcModalProps> {

    public render() {

        const { show, handleClose, title, size, children } = this.props;

        return (
            <Modal
                size={size}
                show={show}
                onHide={handleClose}
                dialogClassName="modal-50w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <ModalTitle className='hc-modal-title'>{title}</ModalTitle>
                </Modal.Header>

                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal>
        );
    }
}