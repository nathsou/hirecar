import React, { Component } from "react";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { withRouter, RouteComponentProps } from "react-router";
import { fetchUserProfileCarRentals, onUserProfileCarRentalDelete, toggleUserProfileCarRentalModal } from "../../../redux/userProfile/userProfileCarRentalTab/actions";
import { UserDataState } from "../../../redux/user/types";
import { UserProfileCarRentalTabState, ToggleUserProfileCarRentalModalAction } from "../../../redux/userProfile/userProfileCarRentalTab/types";
import { HcListItemProps } from "../../HcListItem";
import { diffDays, convertDate } from "../../../Utils";
import HcList from "../../HcList";
import CarPicto from "../../../res/img/car-picto.svg";
import UserProfileDeleteCarRentalModal from "./UserProfileDeleteCarRentalModal";

interface UserProfileCarRentalTabProps extends RouteComponentProps {
    user: UserDataState,
    user_profile_car_rental_tab: UserProfileCarRentalTabState
    fetchUserProfileCarRentals: (id: number) => void,
    toggleUserProfileCarRentalModal: (show: boolean) => ToggleUserProfileCarRentalModalAction,
    onUserProfileCarRentalDelete: (selected_spot_rental_id: number) => void
}

class UserProfileCarRentalTab extends Component<UserProfileCarRentalTabProps> {

    constructor(props: UserProfileCarRentalTabProps) {
        super(props);
        this.props.fetchUserProfileCarRentals(this.props.user.id);
    }

    public onDelete = (id: number) => {
        this.props.onUserProfileCarRentalDelete(id);
        this.props.toggleUserProfileCarRentalModal(true);
    }

    public render() {

        const { fetching, car_rentals, show_delete_car_rental_modal } = this.props.user_profile_car_rental_tab;
        const spots_count = Object.keys(car_rentals).length;

        const spots: HcListItemProps[] = car_rentals.map(car => {
            const c = car, diff_days = diffDays(c.start_date, c.end_date), total_price = diff_days * c.parking_spot.car.price_per_day;
            return {
                header: `Du ${convertDate(c.start_date)} au ${convertDate(c.end_date)} • ${diff_days} jours`,
                title: c.parking_spot.car.model,
                features: `${c.parking_spot.car.gearbox.type} • ${c.parking_spot.car.fuel.type} • ${c.parking_spot.car.seats} places • ${c.parking_spot.car.doors} portes`,
                footer: `${total_price} € • ${c.parking_spot.car.price_per_day} € / jour`,
                id: c.id
            };
        });

        return (
            <div>
                {fetching ? (<p> Chargement des réservations de véhicules en cours...</p >) : (
                    <HcList
                        items={spots} className="hc-user-profile-list-item" picto={CarPicto} update={false}
                        onDelete={(id: number) => this.onDelete(id)}
                    />
                )}
                {!fetching && spots_count === 0 ? (
                    <p>Vous n'avez pas encore réservé de véhicules pour votre prochain départ ?
                        <span className="link" onClick={() => this.props.history.push('/voiture')}> Réservez dès maintenant.</span>
                    </p>
                ) : null}
                {show_delete_car_rental_modal ? <UserProfileDeleteCarRentalModal /> : null}
            </div>
        );
    }
}

export default
    withRouter(
        connect(
            (state: HcState) => ({
                user: state.user.data,
                user_profile_car_rental_tab: state.user_profile_tabs.user_profile_car_rental_tab
            }), {
                fetchUserProfileCarRentals: (id: number) => fetchUserProfileCarRentals(id),
                toggleUserProfileCarRentalModal: toggleUserProfileCarRentalModal,
                onUserProfileCarRentalDelete: (id: number) => onUserProfileCarRentalDelete(id)
            }
        )(UserProfileCarRentalTab)
    )