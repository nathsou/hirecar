import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import HcSignTabs from "./Sign/HcSignTabs";
import { HcState } from "../redux/configureStore";
import { connect } from "react-redux";
import HcCarDelete from "./UserProfile/UserProfileCarTab/UserProfileCarDelete";
import UserProfileSpotRentalDelete from "./UserProfile/UserProfileSpotRentalTab/UserProfileSpotRentalDelete";
import UserProfileCarRentalDelete from "./UserProfile/UserProfileCarRentalTab/UserProfileCarRentalDelete";

interface HcModalProps {
    show: boolean,
    handleClose: () => void,
    logged_in: boolean,
    show_delete_car_modal: boolean,
    show_delete_spot_rental_modal: boolean,
    show_delete_car_rental_modal: boolean
}

class HcModal extends Component<HcModalProps> {

    render() {
        const { logged_in, show_delete_car_modal, show_delete_spot_rental_modal, show_delete_car_rental_modal, handleClose } = this.props
        const default_content = !show_delete_car_modal && !show_delete_spot_rental_modal && !show_delete_car_rental_modal;

        return (
            <Modal show={this.props.show} onHide={() => this.props.handleClose()} dialogClassName="modal-50w" aria-labelledby="contained-modal-title-vcenter" centered backdrop='static'>
                {default_content && <Modal.Header closeButton></Modal.Header>}
                <Modal.Body>
                    {!logged_in && <HcSignTabs />}
                    {show_delete_car_modal && <HcCarDelete handleClick={handleClose} />}
                    {show_delete_spot_rental_modal && <UserProfileSpotRentalDelete handleClick={handleClose} />}
                    {show_delete_car_rental_modal && <UserProfileCarRentalDelete handleClick={handleClose} />}
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