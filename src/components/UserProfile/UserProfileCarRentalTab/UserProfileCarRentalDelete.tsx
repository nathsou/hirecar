import React, { Component } from "react";
import HcDeleteModalContainer from "../../HcDeleteModalContainer";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { CarRental } from "../../../redux/carSearch/types";
import { postDeleteUserProfileCarRental, onUserProfileCarRentalDeleteCancel } from "../../../redux/userProfile/userProfileCarRentalTab/actions";

export interface UserProfileCarRentalDeleteProps {
    selected_car_rental_id: number,
    car_rentals: CarRental[],
    handleClick: () => void,
    onUserProfileCarRentalDelete: (selected_car_id: number) => void,
    onUserProfileCarRentalDeleteCancel: () => void
}


class UserProfileCarRentalDelete extends Component<UserProfileCarRentalDeleteProps> {

    public onCancel = () => {
        this.props.handleClick();
        this.props.onUserProfileCarRentalDeleteCancel();
    }

    public onConfirm = () => {
        this.props.onUserProfileCarRentalDelete(this.props.selected_car_rental_id);
    }

    public render() {
        const { car_rentals, selected_car_rental_id } = this.props;
        const selected_car_rental = car_rentals.filter(spot => spot.id === selected_car_rental_id)[0];
        const question = `Voulez-vous vraiment supprimer la réservation de la ${selected_car_rental.parking_spot.car.model} ?`;
        return (
            <HcDeleteModalContainer
                title="Suppression d'une réservation de véhicule" question={question}
                onConfirm={this.onConfirm} onCancel={this.onCancel}
            />
        );
    }
}

export default connect(
    (state: HcState) => ({
        selected_car_rental_id: state.user_profile_tabs.user_profile_car_rental_tab.selected_car_rental_id,
        car_rentals: state.user_profile_tabs.user_profile_car_rental_tab.car_rentals
    }),
    {
        onUserProfileCarRentalDelete: (id: number) => postDeleteUserProfileCarRental(id),
        onUserProfileCarRentalDeleteCancel: () => onUserProfileCarRentalDeleteCancel()
    }
)(UserProfileCarRentalDelete)