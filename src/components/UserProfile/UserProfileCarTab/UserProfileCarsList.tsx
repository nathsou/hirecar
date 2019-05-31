import React, { Component } from "react";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { UserProfileCarsState, DeleteUserProfileCarAction } from "../../../redux/userProfile/userProfileCarTab/types";
import { HcListItemProps } from "../../HcListItem";
import CarPicto from "../../../res/img/car-picto.svg";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { updateUserProfileCar, onUserProfileCarDelete } from "../../../redux/userProfile/userProfileCarTab/actions";
import { toggleShowModal } from "../../../redux/navbar/actions";
import { ToggleSignModalAction } from "../../../redux/navbar/types";
import HcList from "../../HcList";
library.add(faTimes);


export interface UserProfileCarsListProps extends Pick<UserProfileCarsState, 'cars'> {
    toggleModal: (show: boolean) => ToggleSignModalAction,
    onUserProfileCarChange: (id: number) => void,
    onUserProfileCarDelete: (id: number) => DeleteUserProfileCarAction
}

class UserProfileCarsList extends Component<UserProfileCarsListProps> {

    public onDelete = (id: number) => {
        this.props.onUserProfileCarDelete(id);
        this.props.toggleModal(false);
    }

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
            <HcList
                items={cars} className="hc-user-profile-list-item" picto={CarPicto} update={true}
                onUpdate={(id: number) => this.props.onUserProfileCarChange(id)}
                onDelete={(id: number) => this.onDelete(id)}
            />
        );
    }
}

export default connect(
    (state: HcState) => ({
        navbar: state.navbar,
        cars: state.user_profile_tabs.user_profile_tab_car.cars_data.cars
    }), {
        toggleModal: toggleShowModal,
        onUserProfileCarChange: (id: number) => updateUserProfileCar(id),
        onUserProfileCarDelete: (id: number) => onUserProfileCarDelete(id)
    }
)(UserProfileCarsList);

