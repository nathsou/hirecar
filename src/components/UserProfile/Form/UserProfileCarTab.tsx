import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import HcInputFormGroup from "../../Form/HcInputFormGroup";
import HcSelectFormGroup from "../../Form/HcSelectFormGroup";
import { updateUserProfileCarModelInput, updateUserProfileCarPriceInput } from "../../../redux/userProfile/userProfileCarTab/actions";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { UserProfileCarTabState } from "../../../redux/userProfile/userProfileCarTab/types";

interface UserProfileCarTabProps {
    user_profile_car_tab: UserProfileCarTabState
    onModelChange: typeof updateUserProfileCarModelInput,
    onPriceChange: typeof updateUserProfileCarPriceInput,
}


class UserProfileCarTab extends Component<UserProfileCarTabProps> {
    public render() {
        const { fuel, gearbox } = this.props.user_profile_car_tab.car_features;
        const seats = [2, 4, 5];
        const doors = [2, 3, 5];
        const { model, price } = this.props.user_profile_car_tab.form_data;
        const { model_error: modelError, price_error: priceError } = this.props.user_profile_car_tab.form_errors;

        return (
            <div className="car-form-container">
                <Form.Row>
                    <HcInputFormGroup
                        size="6" controlId="userProfileCarModel" className={modelError}
                        label="Modèle" type="text"
                        name="model" placeholder="Nom du modèle de la voiture"
                        value={model}
                        onChange={this.props.onModelChange} />
                    <HcInputFormGroup
                        size="4" controlId="userProfileCarPrice" className={priceError}
                        label="Prix en €/jour " type="text"
                        name="price_per_day" placeholder="Prix de la location"
                        value={price}
                        onChange={this.props.onPriceChange} />
                </Form.Row>
                <Form.Row>
                    <HcSelectFormGroup
                        size="4"
                        controlId="userProfileCarGearbox"
                        className=""
                        label="Boîte de vitesse"
                        name="gearbox"
                        values={gearbox}
                    />
                    <HcSelectFormGroup
                        size="4"
                        controlId="userProfileCarFuel"
                        className=""
                        label="Carburant"
                        name="fuel"
                        values={fuel}
                    />
                    <HcSelectFormGroup
                        size="2"
                        controlId="userProfileCarSeats"
                        className=""
                        label="Sièges"
                        name="nb_seats"
                        values={seats}
                    />
                    <HcSelectFormGroup
                        size="2"
                        controlId="userProfileCarDoors"
                        className=""
                        label="Portes"
                        name="nb_doors"
                        values={doors}
                    />
                </Form.Row>
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({
        user_profile_car_tab: state.user_profile_car_tab
    }),
    {
        onModelChange: (e: any) => updateUserProfileCarModelInput(e.target.value),
        onPriceChange: (e: any) => updateUserProfileCarPriceInput(e.target.value),
    }
)(UserProfileCarTab)