import React, { Component } from "react";
import { HcState } from "../../../redux/configureStore";
import { connect } from "react-redux";
import { ParkingSpot } from "../../../redux/carSearch/types";
import { postDeleteUserProfileSpotRental, onUserProfileSpotRentalDeleteCancel } from "../../../redux/userProfile/userProfileSpotRentalTab/actions";
import HcDeleteModalContainer from "../../HcDeleteModalContainer";
import HcModal from "../../HcModal";

export interface UserProfileDeleteSpotRentalModalProps {
    show_delete_spot_rental_modal: boolean,
    selected_spot_id: number,
    spot_rentals: ParkingSpot[],
    onUserProfileSpotRentalDelete: (selected_car_id: number) => void,
    onUserProfileSpotRentalDeleteCancel: () => void
}


class UserProfileDeleteSpotRentalModal extends Component<UserProfileDeleteSpotRentalModalProps> {

    public render() {
        const { spot_rentals, selected_spot_id } = this.props;
        const selected_spot_rental = spot_rentals.filter(spot => spot.id === selected_spot_id)[0];
        const question = `Voulez-vous vraiment supprimer votre réservation à ${selected_spot_rental.parking_lot.label} pour votre ${selected_spot_rental.car.model} ?`;
        return (
            <HcModal
                show={this.props.show_delete_spot_rental_modal}
                handleClose={() => this.props.onUserProfileSpotRentalDeleteCancel()}
            >
                <HcDeleteModalContainer
                    title="Suppression d'une réservation de parking" question={question}
                    onConfirm={() => this.props.onUserProfileSpotRentalDelete(this.props.selected_spot_id)} 
                    onCancel={() => this.props.onUserProfileSpotRentalDeleteCancel()}
                />
            </HcModal>
        );
    }
}

export default connect(
    (state: HcState) => ({
        selected_spot_id: state.user_profile_tabs.user_profile_tab_spot_rental.selected_spot_rental_id,
        spot_rentals: state.user_profile_tabs.user_profile_tab_spot_rental.parking_spot_rentals,
        show_delete_spot_rental_modal: state.user_profile_tabs.user_profile_tab_spot_rental.show_delete_spot_rental_modal
    }),
    {
        onUserProfileSpotRentalDelete: (id: number) => postDeleteUserProfileSpotRental(id),
        onUserProfileSpotRentalDeleteCancel: () => onUserProfileSpotRentalDeleteCancel()
    }
)(UserProfileDeleteSpotRentalModal)