import React, { Component } from "react";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { UserProfileCarsState, DeleteUserProfileCarAction, ToggleUserProfileCarModalAction } from "../../../redux/userProfile/userProfileCarTab/types";
import { HcListItemProps } from "../../HcListItem";
import CarPicto from "../../../res/img/car-picto.svg";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { updateUserProfileCar, onUserProfileCarDelete, toggleUserProfileCarModal } from "../../../redux/userProfile/userProfileCarTab/actions";
import HcList from "../../HcList";
import UserProfileDeleteCarModal from "./UserProfileDeleteCarModal";
library.add(faTimes);


export interface UserProfileCarsListProps extends Pick<UserProfileCarsState, 'cars'> {
    show_delete_car_modal: boolean,
    toggleUserProfileCarModal: (show: boolean) => ToggleUserProfileCarModalAction,
    onUserProfileCarChange: (id: number) => void,
    onUserProfileCarDelete: (id: number) => DeleteUserProfileCarAction
}

class UserProfileCarsList extends Component<UserProfileCarsListProps> {

    public onDelete = (id: number) => {
        this.props.onUserProfileCarDelete(id);
        this.props.toggleUserProfileCarModal(true);
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
            <div>
                <HcList
                    items={cars} className="hc-user-profile-list-item" picto={CarPicto} update={true}
                    onUpdate={(id: number) => this.props.onUserProfileCarChange(id)}
                    onDelete={(id: number) => this.onDelete(id)}
                />
                {this.props.show_delete_car_modal ? <UserProfileDeleteCarModal /> : null}
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({
        navbar: state.navbar,
        cars: state.user_profile_tabs.user_profile_tab_car.cars_data.cars,
        show_delete_car_modal: state.user_profile_tabs.user_profile_tab_car.show_delete_car_modal
    }), {
        toggleUserProfileCarModal: toggleUserProfileCarModal,
        onUserProfileCarChange: (id: number) => updateUserProfileCar(id),
        onUserProfileCarDelete: (id: number) => onUserProfileCarDelete(id)
    }
)(UserProfileCarsList);

