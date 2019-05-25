import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import HcInputFormGroup from "../../Form/HcInputFormGroup";
import HcSelectFormGroup from "../../Form/HcSelectFormGroup";
import { updateUserProfileCarModelInput, updateUserProfileCarPriceInput, updateUserProfileCarGearboxSelect, updateUserProfileCarFuelSelect, updateUserProfileCarSeatsSelect, updateUserProfileCarDoorsSelect } from "../../../redux/userProfile/userProfileCarTab/actions";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { UserProfileCarTabState } from "../../../redux/userProfile/userProfileCarTab/types";

interface UserProfileCarTabProps {
    user_profile_car_tab: UserProfileCarTabState
    onModelChange: typeof updateUserProfileCarModelInput,
    onPriceChange: typeof updateUserProfileCarPriceInput,
    onGearboxChange: typeof updateUserProfileCarGearboxSelect,
    onFuelChange: typeof updateUserProfileCarFuelSelect,
    onSeatsChange: typeof updateUserProfileCarSeatsSelect,
    onDoorsChange: typeof updateUserProfileCarDoorsSelect
}


class UserProfileCarTab extends Component<UserProfileCarTabProps> {
    public render() {
        const { fuel, gearbox } = this.props.user_profile_car_tab.car_features;
        const seats = [2, 4, 5, 7];
        const doors = [2, 3, 5];
        const {
            model, price_per_day,
            gearbox: defaultGearbox,
            fuel: defaultFuel,
            seats: defaultSeats,
            doors: defaultDoors
        } = this.props.user_profile_car_tab.form_data;
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
                        value={price_per_day}
                        onChange={this.props.onPriceChange} />
                </Form.Row>
                <Form.Row>
                    <HcSelectFormGroup
                        size="4" controlId="userProfileCarGearbox" className=""
                        label="Boîte de vitesse" name="gearbox"
                        values={gearbox}
                        value={defaultGearbox}
                        onChange={this.props.onGearboxChange}
                    />
                    <HcSelectFormGroup
                        size="4" controlId="userProfileCarFuel" className=""
                        label="Carburant" name="fuel"
                        values={fuel}
                        value={defaultFuel}
                        onChange={this.props.onFuelChange}
                    />
                    <HcSelectFormGroup
                        size="2" controlId="userProfileCarSeats" className=""
                        label="Sièges" name="seat"
                        values={seats}
                        value={defaultSeats}
                        onChange={this.props.onSeatsChange}
                    />
                    <HcSelectFormGroup
                        size="2" controlId="userProfileCarDoors" className=""
                        label="Portes" name="door"
                        values={doors}
                        value={defaultDoors}
                        onChange={this.props.onDoorsChange}
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
        onGearboxChange: (e: any) => updateUserProfileCarGearboxSelect(e.target.value),
        onFuelChange: (e: any) => updateUserProfileCarFuelSelect(e.target.value),
        onSeatsChange: (e: any) => updateUserProfileCarSeatsSelect(e.target.value),
        onDoorsChange: (e: any) => updateUserProfileCarDoorsSelect(e.target.value)
    }
)(UserProfileCarTab)