import React, { Component } from "react";
import { HcState } from "../../../redux/configureStore";
import { connect } from "react-redux";
import { ParkingSpot } from "../../../redux/carSearch/types";
import { postDeleteUserProfileSpotRental, onUserProfileSpotRentalDeleteCancel } from "../../../redux/userProfile/userProfileSpotRentalTab/actions";
import HcDeleteModalContainer from "../../HcDeleteModalContainer";
import HcModal from "../../HcModal";
import { diffDays } from "../../../Utils";

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
        const s = selected_spot_rental, diff_days = diffDays(s.start_date, s.end_date), half_price = (diff_days * s.parking_lot.price_per_day) / 2;
        const question = `Voulez-vous vraiment supprimer votre réservation à ${s.parking_lot.label} pour votre ${s.car.model}  ? En cas d'annulation, vous ne serez remboursé qu'à moitié, soit ${half_price}€.`;
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