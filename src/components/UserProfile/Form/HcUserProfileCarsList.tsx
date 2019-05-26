import React, { Component } from "react";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { UserProfileCarsState } from "../../../redux/userProfile/userProfileTabCar/types";
import HcListItem, { HcListItemProps } from "../../HcListItem";
import CarPicto from "../../../res/img/car-picto.svg";
import HcSecondaryButton from "../../Button/HcSecondaryButton";
import HcCircleButton from "../../Button/HcCircleButton";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { updateUserProfileCar } from "../../../redux/userProfile/userProfileTabCar/actions";
library.add(faTimes);


export interface HcUserProfileCarsListProps extends Pick<UserProfileCarsState, 'cars'> {
    onUserProfileCarChange: (id: number) => void
}

class HcUserProfileCarsList extends Component<HcUserProfileCarsListProps> {

    public render() {

        const cars: HcListItemProps[] = this.props.cars.map(car => {
            const c = car;
            return {
                title: c.model,
                features: `${c.gearbox.type} • ${c.fuel.type} • ${c.seats} places • ${c.doors} portes`,
                footer: `${c.price_per_day} € / jour`,
                id: c.id
            };
        });

        return (
            <div className='hc-user-profile-list'>
                {cars.map((car, i) =>
                    (
                        <div key={`car_${i}`} className="hc-user-profile-list-item">
                            <HcListItem {...car} picto={CarPicto} />
                            <HcSecondaryButton handleClick={() => this.props.onUserProfileCarChange(car.id)}>Modifier</HcSecondaryButton>
                            <HcCircleButton
                                onClick={() => { }}
                                icon="times"
                            />
                        </div>
                    )
                )}
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({
        cars: state.user_profile_tab_car.cars_data.cars
    }), {
        onUserProfileCarChange: (id: number) => updateUserProfileCar(id)
    }
)(HcUserProfileCarsList);

