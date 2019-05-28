import React, { Component } from "react";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { UserProfileCarsState, DeleteUserProfileCarAction } from "../../../redux/userProfile/userProfileTabCar/types";
import HcListItem, { HcListItemProps } from "../../HcListItem";
import CarPicto from "../../../res/img/car-picto.svg";
import HcSecondaryButton from "../../Button/HcSecondaryButton";
import HcCircleButton from "../../Button/HcCircleButton";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { updateUserProfileCar, onUserProfileCarDelete } from "../../../redux/userProfile/userProfileTabCar/actions";
import { toggleShowModal } from "../../../redux/navbar/actions";
import { ToggleModalAction } from "../../../redux/navbar/types";
library.add(faTimes);


export interface HcUserProfileCarsListProps extends Pick<UserProfileCarsState, 'cars'> {
    toggleModal: () => ToggleModalAction,
    onUserProfileCarChange: (id: number) => void,
    onUserProfileCarDelete: (id: number) => DeleteUserProfileCarAction
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
                                onClick={() => {
                                    this.props.onUserProfileCarDelete(car.id);
                                    this.props.toggleModal();
                                }}
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
        navbar: state.navbar,
        cars: state.user_profile_tab_car.cars_data.cars
    }), {
        toggleModal: toggleShowModal,
        onUserProfileCarChange: (id: number) => updateUserProfileCar(id),
        onUserProfileCarDelete: (id: number) => onUserProfileCarDelete(id)
    }
)(HcUserProfileCarsList);

