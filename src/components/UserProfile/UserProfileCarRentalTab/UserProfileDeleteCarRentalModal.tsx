import React, { Component } from "react";
import HcDeleteModalContainer from "../../HcDeleteModalContainer";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { CarRental } from "../../../redux/carSearch/types";
import { postDeleteUserProfileCarRental, onUserProfileCarRentalDeleteCancel } from "../../../redux/userProfile/userProfileCarRentalTab/actions";
import HcModal from "../../HcModal";
import { diffDays } from "../../../Utils";

export interface UserProfileDeleteCarRentalModalProps {
    show_delete_car_rental_modal: boolean,
    selected_car_rental_id: number,
    car_rentals: CarRental[],
    onUserProfileCarRentalDelete: (selected_car_id: number) => void,
    onUserProfileCarRentalDeleteCancel: () => void
}

class UserProfileDeleteCarRentalModal extends Component<UserProfileDeleteCarRentalModalProps> {

    public render() {
        const { car_rentals, selected_car_rental_id } = this.props;
        const selected_car_rental = car_rentals.filter(spot => spot.id === selected_car_rental_id)[0];
        const c = selected_car_rental, diff_days = diffDays(c.start_date, c.end_date), half_price = (diff_days * c.parking_spot.car.price_per_day) / 2;
        const question = `Voulez-vous vraiment supprimer la réservation de la ${c.parking_spot.car.model} ? En cas d'annulation, vous ne serez remboursé qu'à moitié, soit ${half_price}€.`;
        return (
            <HcModal
                show={this.props.show_delete_car_rental_modal}
                handleClose={() => this.props.onUserProfileCarRentalDeleteCancel()}
            >
                <HcDeleteModalContainer
                    title="Suppression d'une réservation de véhicule" question={question}
                    onConfirm={() => this.props.onUserProfileCarRentalDelete(this.props.selected_car_rental_id)}
                    onCancel={() => this.props.onUserProfileCarRentalDeleteCancel()}
                />
            </HcModal>
        );
    }
}

export default connect(
    (state: HcState) => ({
        selected_car_rental_id: state.user_profile_tabs.user_profile_car_rental_tab.selected_car_rental_id,
        car_rentals: state.user_profile_tabs.user_profile_car_rental_tab.car_rentals,
        show_delete_car_rental_modal: state.user_profile_tabs.user_profile_car_rental_tab.show_delete_car_rental_modal
    }),
    {
        onUserProfileCarRentalDelete: (id: number) => postDeleteUserProfileCarRental(id),
        onUserProfileCarRentalDeleteCancel: () => onUserProfileCarRentalDeleteCancel()
    }
)(UserProfileDeleteCarRentalModal)