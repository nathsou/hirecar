import React, { Component } from "react";
import Modal, { ModalProps } from "react-bootstrap/Modal";
import ModalTitle from "react-bootstrap/ModalTitle";
import { connect } from "react-redux";
import { HcState } from "../redux/configureStore";

export interface HcModalProps extends Pick<ModalProps, 'size'> {
    title?: string,
    show: boolean,
    handleClose: () => void,
    logged_in: boolean,
    show_delete_car_modal: boolean,
    show_delete_spot_rental_modal: boolean,
    show_delete_car_rental_modal: boolean
}

class HcModal extends Component<HcModalProps> {

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

export default connect(
    (state: HcState) => ({
        logged_in: state.user.logged_in,
        show_delete_car_modal: state.user_profile_tabs.user_profile_tab_car.show_delete_car_modal,
        show_delete_spot_rental_modal: state.user_profile_tabs.user_profile_tab_spot_rental.show_delete_spot_rental_modal,
        show_delete_car_rental_modal: state.user_profile_tabs.user_profile_car_rental_tab.show_delete_car_rental_modal
    })
)(HcModal)