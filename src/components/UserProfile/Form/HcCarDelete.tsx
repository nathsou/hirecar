import React, { Component } from "react";
import HcPrimaryButton from "../../Button/HcPrimaryButton";
import HcSecondaryButton from "../../Button/HcSecondaryButton";
import { HcState } from "../../../redux/configureStore";
import { connect } from "react-redux";
import { UserProfileCarsState } from "../../../redux/userProfile/userProfileTabCar/types";
import { postDeleteUserProfileCar } from "../../../redux/userProfile/userProfileTabCar/actions";

export interface HcCarDeleteProps {
    cars_data: UserProfileCarsState,
    handleClick: () => void,
    onUserProfileCarDelete: (data: UserProfileCarsState) => void

}

class HcCarDelete extends Component<HcCarDeleteProps> {
    public render() {

        return (
            <div className="container-tabs">
                <p>Voulez-vous vraiment supprimer votre véhicule ?</p>
                <HcSecondaryButton handleClick={() => this.props.onUserProfileCarDelete(this.props.cars_data)}>
                    Confirmer
                </HcSecondaryButton>
                <HcPrimaryButton handleClick={this.props.handleClick}>Annuler</HcPrimaryButton>
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({
        cars_data: state.user_profile_tab_car.cars_data
    }),
    {
        onUserProfileCarDelete: (data: UserProfileCarsState) => postDeleteUserProfileCar(data)
    }
)(HcCarDelete)