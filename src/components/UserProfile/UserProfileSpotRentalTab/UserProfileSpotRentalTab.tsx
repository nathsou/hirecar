import React, { Component } from "react";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { UserDataState } from "../../../redux/user/types";
import { fetchUserProfileParkingSpotRentals, onUserProfileSpotRentalDelete, toggleUserProfileSpotRentalModal } from "../../../redux/userProfile/userProfileSpotRentalTab/actions";
import { UserProfileTabSpotRentalState, ToggleUserProfileSpotRentalModalAction } from "../../../redux/userProfile/userProfileSpotRentalTab/types";
import { HcListItemProps } from "../../HcListItem";
import ParkingPicto from "../../../res/img/parking-picto.svg";
import { withRouter, RouteComponentProps } from "react-router";
import { convertDate, diffDays } from "../../../Utils";
import HcList from "../../HcList";
import UserProfileDeleteSpotRentalModal from "./UserProfileDeleteSpotRentalModal";

interface UserProfileSpotRentalTabProps extends RouteComponentProps {
    show_delete_spot_rental_modal: boolean,
    user: UserDataState,
    user_profile_tab_spot_rental: UserProfileTabSpotRentalState,
    fetchUserProfileSpotRentals: (id: number) => void,
    toggleUserProfileSpotRentalModal: (show: boolean) => ToggleUserProfileSpotRentalModalAction,
    onUserProfileSpotRentalDelete: (selected_spot_rental_id: number) => void
}

class UserProfileSpotRentalTab extends Component<UserProfileSpotRentalTabProps> {

    constructor(props: UserProfileSpotRentalTabProps) {
        super(props);
        this.props.fetchUserProfileSpotRentals(this.props.user.id);
    }

    public onDelete = (id: number) => {
        this.props.onUserProfileSpotRentalDelete(id);
        this.props.toggleUserProfileSpotRentalModal(true);
    }

    public render() {
        const { fetching, parking_spot_rentals } = this.props.user_profile_tab_spot_rental;
        const spots_count = Object.keys(parking_spot_rentals).length;

        const spots: HcListItemProps[] = parking_spot_rentals.map(spot => {
            const s = spot, diff_days = diffDays(s.start_date, s.end_date), total_price = diff_days * s.parking_lot.price_per_day;
            return {
                header: `Du ${convertDate(s.start_date)} au ${convertDate(s.end_date)} • ${diff_days} jours`,
                title: s.parking_lot.label,
                features: `${s.car.model} | ${s.car.gearbox.type} • ${s.car.fuel.type} • ${s.car.seats} places • ${s.car.doors} portes`,
                footer: `${total_price} € • ${s.parking_lot.price_per_day} € / jour`,
                id: s.id
            };
        });

        return (
            <div>
                {fetching ? (<p> Chargement des réservations de parkings en cours...</p >) : (
                    <HcList
                        items={spots} className="hc-user-profile-list-item" picto={ParkingPicto} update={false}
                        onDelete={(id: number) => this.onDelete(id)}
                    />
                )}
                {!fetching && spots_count === 0 ? (
                    <p>Vous n'avez pas encore réservé de parkings pour un de vos véhicules.
                        <span className="link" onClick={() => this.props.history.push('/parking')}> Réservez dès maintenant.</span>
                    </p>
                ) : null}
                {this.props.show_delete_spot_rental_modal ? <UserProfileDeleteSpotRentalModal /> : null}
            </div>
        );
    }
}

export default
    withRouter(
        connect(
            (state: HcState) => ({
                user: state.user.data,
                user_profile_tab_spot_rental: state.user_profile_tabs.user_profile_tab_spot_rental,
                show_delete_spot_rental_modal: state.user_profile_tabs.user_profile_tab_spot_rental.show_delete_spot_rental_modal
            }), {
                fetchUserProfileSpotRentals: (id: number) => fetchUserProfileParkingSpotRentals(id),
                toggleUserProfileSpotRentalModal: toggleUserProfileSpotRentalModal,
                onUserProfileSpotRentalDelete: (id: number) => onUserProfileSpotRentalDelete(id)
            }
        )(UserProfileSpotRentalTab)
    )