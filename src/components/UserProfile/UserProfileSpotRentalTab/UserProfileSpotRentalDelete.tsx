import React, { Component } from "react";
import { HcState } from "../../../redux/configureStore";
import { connect } from "react-redux";
import { ParkingSpot } from "../../../redux/carSearch/types";
import { postDeleteUserProfileSpotRental, onUserProfileSpotRentalDeleteCancel } from "../../../redux/userProfile/userProfileTabSpotRental/actions";
import HcDelete from "../../HcDeleteModalContainer";

export interface UserProfileSpotRentalDeleteProps {
    selected_spot_id: number,
    spot_rentals: ParkingSpot[],
    handleClick: () => void,
    onUserProfileSpotRentalDelete: (selected_car_id: number) => void,
    onUserProfileSpotRentalDeleteCancel: () => void
}


class UserProfileSpotRentalDelete extends Component<UserProfileSpotRentalDeleteProps> {

    public onCancel = () => {
        this.props.handleClick();
        this.props.onUserProfileSpotRentalDeleteCancel();
    }

    public onConfirm = () => {
        this.props.onUserProfileSpotRentalDelete(this.props.selected_spot_id);
    }

    public render() {
        const { spot_rentals, selected_spot_id } = this.props;
        const selected_spot_rental = spot_rentals.filter(spot => spot.id === selected_spot_id)[0];
        const question = `Voulez-vous vraiment supprimer votre réservation à ${selected_spot_rental.parking_lot.label} pour votre ${selected_spot_rental.car.model} ?`;
        return (
            <HcDelete
                title="Supression d'une réservation de parking" question={question}
                onConfirm={this.onConfirm} onCancel={this.onCancel}
            />
        );
    }
}

export default connect(
    (state: HcState) => ({
        selected_spot_id: state.user_profile_tabs.user_profile_tab_spot_rental.selected_spot_rental_id,
        spot_rentals: state.user_profile_tabs.user_profile_tab_spot_rental.parking_spot_rentals
    }),
    {
        onUserProfileSpotRentalDelete: (id: number) => postDeleteUserProfileSpotRental(id),
        onUserProfileSpotRentalDeleteCancel: () => onUserProfileSpotRentalDeleteCancel()
    }
)(UserProfileSpotRentalDelete)