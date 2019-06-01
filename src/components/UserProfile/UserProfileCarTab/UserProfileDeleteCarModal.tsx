import React, { Component } from "react";
import { HcState } from "../../../redux/configureStore";
import { connect } from "react-redux";
import { postDeleteUserProfileCar, onUserProfileCarDeleteCancel } from "../../../redux/userProfile/userProfileCarTab/actions";
import { Car } from "../../../redux/carSearch/types";
import HcDeleteModalContainer from "../../HcDeleteModalContainer";
import HcModal from "../../HcModal";

export interface UserProfileDeleteCarModalProps {
    selected_car_id: number,
    cars: Car[],
    show_delete_car_modal: boolean,
    onUserProfileCarDelete: (selected_car_id: number) => void;
    onUserProfileCarDeleteCancel: () => void
}

class UserProfileDeleteCarModal extends Component<UserProfileDeleteCarModalProps> {

    public render() {
        const selected_car = this.props.cars.filter(car => car.id === this.props.selected_car_id)[0];
        const question = `Voulez-vous vraiment supprimer votre ${selected_car.model} ?`;
        return (
            <HcModal
                show={this.props.show_delete_car_modal}
                handleClose={() => this.props.onUserProfileCarDeleteCancel()}
            >
                <HcDeleteModalContainer
                    title="Suppression d'un véhicule" question={question}
                    onConfirm={() => this.props.onUserProfileCarDelete(this.props.selected_car_id)}
                    onCancel={() => this.props.onUserProfileCarDeleteCancel()}
                />
            </HcModal>
        );
    }
}

export default connect(
    (state: HcState) => ({
        selected_car_id: state.user_profile_tabs.user_profile_tab_car.cars_data.selected_car_id,
        cars: state.user_profile_tabs.user_profile_tab_car.cars_data.cars,
        show_delete_car_modal: state.user_profile_tabs.user_profile_tab_car.show_delete_car_modal
    }),
    {
        onUserProfileCarDelete: (id: number) => postDeleteUserProfileCar(id),
        onUserProfileCarDeleteCancel: () => onUserProfileCarDeleteCancel()
    }
)(UserProfileDeleteCarModal)