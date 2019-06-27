import React, { Component } from "react";
import HcDeleteModalContainer from "../../HcDeleteModalContainer";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import HcModal from "../../HcModal";
import { ParkingLot } from "../../../redux/parkingSearch/types";
import { onAdminParkingDeleteCancel, postAdminDeleteParking } from "../../../redux/userProfile/userProfileAdminTab/actions";

export interface UserProfileAdminDeleteParkingModalProps {
    error: string,
    selected_parking_id: number,
    parking_lots: ParkingLot[],
    show_admin_delete_parking_modal: boolean,
    postAdminDeleteParking: (selected_car_id: number) => void,
    onAdminParkingDeleteCancel: () => void
}

class UserProfileAdminDeleteParkingModal extends Component<UserProfileAdminDeleteParkingModalProps> {

    public render() {
        const { parking_lots, selected_parking_id, error } = this.props;
        const selected_parking = parking_lots.filter(parking => parking.id === selected_parking_id)[0];
        const question = `Voulez-vous vraiment supprimer le site de parkings à ${selected_parking.label}?`;
        return (
            <HcModal
                show={this.props.show_admin_delete_parking_modal}
                handleClose={() => this.props.onAdminParkingDeleteCancel()}
            >
                {error ? (
                    <div>
                        <h2 className="user-profile-title">Suppression non autorisée du site de parking</h2>
                        <p>{error}</p>
                    </div>
                ) : (
                        <HcDeleteModalContainer
                            title="Suppression d'un site de parking" question={question}
                            onConfirm={() => this.props.postAdminDeleteParking(this.props.selected_parking_id)}
                            onCancel={() => this.props.onAdminParkingDeleteCancel()}
                        />
                    )
                }
            </HcModal>
        );
    }
}

export default connect(
    (state: HcState) => ({
        error: state.user_profile_tabs.user_profile_admin_tab.error,
        selected_parking_id: state.user_profile_tabs.user_profile_admin_tab.selected_parking_id,
        parking_lots: state.user_profile_tabs.user_profile_admin_tab.parking_lots,
        show_admin_delete_parking_modal: state.user_profile_tabs.user_profile_admin_tab.show_admin_delete_parking_modal
    }),
    {
        postAdminDeleteParking: (id: number) => postAdminDeleteParking(id),
        onAdminParkingDeleteCancel: () => onAdminParkingDeleteCancel()
    }
)(UserProfileAdminDeleteParkingModal)