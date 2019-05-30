import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import HcSignTabs from "./Sign/HcSignTabs";
import { HcState } from "../redux/configureStore";
import { connect } from "react-redux";
import HcCarDelete from "./UserProfile/Form/HcCarDelete";

interface HcModalProps {
    show: boolean,
    handleClose: () => void,
    user_profile_tab_car_delete: boolean
}

class HcModal extends Component<HcModalProps> {

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.handleClose()} dialogClassName="modal-50w" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    {this.props.user_profile_tab_car_delete ? (
                        <HcCarDelete handleClick={this.props.handleClose} />
                    ) : (<HcSignTabs />)}
                </Modal.Body>
            </Modal>
        );
    }
}

export default connect(
    (state: HcState) => ({
        user_profile_tab_car_delete: state.user_profile_tabs.user_profile_tab_car.show_delete_modal
    })
)(HcModal)