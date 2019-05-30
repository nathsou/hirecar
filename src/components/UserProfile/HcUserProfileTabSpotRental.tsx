import React, { Component } from "react";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { UserDataState } from "../../redux/user/types";
import { fetchUserProfileParkingSpotRentals } from "../../redux/userProfile/userProfileTabSpotRental/actions";
import { UserProfileTabSpotRentalState } from "../../redux/userProfile/userProfileTabSpotRental/types";
import HcListItem, { HcListItemProps } from "../HcListItem";
import HcSecondaryButton from "../Button/HcSecondaryButton";
import ParkingPicto from "../../res/img/parking-picto.svg";
import { withRouter, RouteComponentProps } from "react-router";
import { convertDate, diffDays } from "../../Utils";

interface HcUserProfileTabSpotRentalProps extends RouteComponentProps {
    user: UserDataState,
    user_profile_tab_spot_rental: UserProfileTabSpotRentalState,
    fetchUserProfileSpotRentals: (id: number) => void
}

class HcUserProfileTabSpotRental extends Component<HcUserProfileTabSpotRentalProps> {

    constructor(props: HcUserProfileTabSpotRentalProps) {
        super(props);
        this.props.fetchUserProfileSpotRentals(this.props.user.id);
    }

    public render() {
        const { fetching, parking_spot_rentals } = this.props.user_profile_tab_spot_rental;
        const spots_count = Object.keys(parking_spot_rentals).length;

        const spots: HcListItemProps[] = parking_spot_rentals.map(spot => {
            const s = spot;
            const total_price = diffDays(s.start_date, s.end_date) * s.car.price_per_day;
            return {
                header: `Du ${convertDate(s.start_date)} au ${convertDate(s.end_date)}`,
                title: s.parking_lot.label,
                features: `${s.car.model} | ${s.car.gearbox.type} • ${s.car.fuel.type} • ${s.car.seats} places • ${s.car.doors} portes`,
                footer: `${total_price} € • ${s.car.price_per_day} € / jour`,
                id: s.id
            };
        });

        return (
            <div>
                {fetching ? (<p> Chargement des réservations de parkings en cours...</p >) : (
                    <div className='hc-user-profile-list'>
                        {spots.map((spot, i) =>
                            (
                                <div key={`car_${i}`} className="hc-user-profile-list-item">
                                    <HcListItem {...spot} picto={ParkingPicto} />
                                    <HcSecondaryButton handleClick={() => { }}>Annuler</HcSecondaryButton>
                                </div>
                            )
                        )}
                    </div>
                )}
                {!fetching && spots_count === 0 ? (
                    <p>Vous n'avez pas encore réservé de parkings pour un de vos véhicules.
                        <span className="link" onClick={() => this.props.history.push('/parking')}> Réservez dès maintenant.</span>
                    </p>
                ) : null}
            </div>
        );
    }
}

export default
    withRouter(
        connect(
            (state: HcState) => ({
                user: state.user.data,
                user_profile_tab_spot_rental: state.user_profile_tabs.user_profile_tab_spot_rental
            }), {
                fetchUserProfileSpotRentals: (id: number) => fetchUserProfileParkingSpotRentals(id)
            }
        )(HcUserProfileTabSpotRental)
    )