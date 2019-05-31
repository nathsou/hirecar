import React, { Component } from "react";
import { HcState } from "../../../redux/configureStore";
import { connect } from "react-redux";
import { postDeleteUserProfileCar, onUserProfileCarDeleteCancel } from "../../../redux/userProfile/userProfileCarTab/actions";
import { Car } from "../../../redux/carSearch/types";
import HcDelete from "../../HcDeleteModalContainer";

export interface UserProfileCarDeleteProps {
    selected_car_id: number,
    cars: Car[],
    handleClick: () => void,
    onUserProfileCarDelete: (selected_car_id: number) => void;
    onUserProfileCarDeleteCancel: () => void
}


class UserProfileCarDelete extends Component<UserProfileCarDeleteProps> {

    public onCancel = () => {
        this.props.handleClick();
        this.props.onUserProfileCarDeleteCancel();
    }

    public onConfirm = () => {
        this.props.onUserProfileCarDelete(this.props.selected_car_id);
    }

    public render() {
        const selected_car = this.props.cars.filter(car => car.id === this.props.selected_car_id)[0];
        const question = `Voulez-vous vraiment supprimer votre ${selected_car.model} ?`;
        return (
            <HcDelete
                title="Suppression d'un véhicule" question={question}
                onConfirm={this.onConfirm} onCancel={this.onCancel}
            />
        );
    }
}

export default connect(
    (state: HcState) => ({
        selected_car_id: state.user_profile_tabs.user_profile_tab_car.cars_data.selected_car_id,
        cars: state.user_profile_tabs.user_profile_tab_car.cars_data.cars
    }),
    {
        onUserProfileCarDelete: (id: number) => postDeleteUserProfileCar(id),
        onUserProfileCarDeleteCancel: () => onUserProfileCarDeleteCancel()
    }
)(UserProfileCarDelete)