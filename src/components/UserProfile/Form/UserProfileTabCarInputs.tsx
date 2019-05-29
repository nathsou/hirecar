import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import HcInputFormGroup from "../../Form/HcInputFormGroup";
import HcSelectFormGroup from "../../Form/HcSelectFormGroup";
import { updateUserProfileCarModelInput, updateUserProfileCarPriceInput, updateUserProfileCarGearboxSelect, updateUserProfileCarFuelSelect, updateUserProfileCarSeatsSelect, updateUserProfileCarDoorsSelect } from "../../../redux/userProfile/userProfileTabCar/actions";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { UserProfileTabCarState } from "../../../redux/userProfile/userProfileTabCar/types";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faMinus);

interface UserProfileTabCarProps {
    user_profile_tab_car: UserProfileTabCarState
    onModelChange: typeof updateUserProfileCarModelInput,
    onPriceChange: typeof updateUserProfileCarPriceInput,
    onGearboxChange: typeof updateUserProfileCarGearboxSelect,
    onFuelChange: typeof updateUserProfileCarFuelSelect,
    onSeatsChange: typeof updateUserProfileCarSeatsSelect,
    onDoorsChange: typeof updateUserProfileCarDoorsSelect
}

class UserProfileTabCarInputs extends Component<UserProfileTabCarProps> {

    public render() {

        const { fuel, gearbox } = this.props.user_profile_tab_car.car_features;
        const seats = [2, 4, 5, 7];
        const doors = [2, 3, 5];
        const {
            model, price_per_day,
            gearbox: defaultGearbox,
            fuel: defaultFuel,
            seats: defaultSeats,
            doors: defaultDoors
        } = this.props.user_profile_tab_car.form_data;
        const gearboxId = (defaultGearbox.id).toString();
        const fuelId = (defaultFuel.id).toString();
        const { model_error: modelError, price_error: priceError } = this.props.user_profile_tab_car.form_errors;

        return (
            <div className="car-form-container">
                <Form.Row>
                    <HcInputFormGroup
                        size={6} controlId="userProfileCarModel" className={modelError}
                        label="Modèle" type="text"
                        name="model" placeholder="Nom du modèle de la voiture"
                        value={model}
                        onChange={this.props.onModelChange} />
                    <HcInputFormGroup
                        size={4} controlId="userProfileCarPrice" className={priceError}
                        label="Prix en €/jour " type="text"
                        name="price_per_day" placeholder="Prix de la location"
                        value={price_per_day as string}
                        onChange={this.props.onPriceChange} />
                </Form.Row>
                <Form.Row>
                    <HcSelectFormGroup
                        size="4" controlId="userProfileCarGearbox" className=""
                        label="Boîte de vitesse" name="gearbox"
                        values={gearbox} value={gearboxId}
                        onChange={this.props.onGearboxChange}
                    />
                    <HcSelectFormGroup
                        size="4" controlId="userProfileCarFuel" className=""
                        label="Carburant" name="fuel"
                        values={fuel} value={fuelId}
                        onChange={this.props.onFuelChange}
                    />
                    <HcSelectFormGroup
                        size="2" controlId="userProfileCarSeats" className=""
                        label="Sièges" name="seat"
                        values={seats} value={defaultSeats.toString()}
                        onChange={this.props.onSeatsChange}
                    />
                    <HcSelectFormGroup
                        size="2" controlId="userProfileCarDoors" className=""
                        label="Portes" name="door"
                        values={doors} value={defaultDoors.toString()}
                        onChange={this.props.onDoorsChange}
                    />
                </Form.Row>
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({
        user_profile_tab_car: state.user_profile_tab_car
    }),
    {
        onModelChange: (e: any) => updateUserProfileCarModelInput(e.target.value),
        onPriceChange: (e: any) => updateUserProfileCarPriceInput(e.target.value),
        onGearboxChange: (e: any) => updateUserProfileCarGearboxSelect(e.target.value),
        onFuelChange: (e: any) => updateUserProfileCarFuelSelect(e.target.value),
        onSeatsChange: (e: any) => updateUserProfileCarSeatsSelect(e.target.value),
        onDoorsChange: (e: any) => updateUserProfileCarDoorsSelect(e.target.value),
    }
)(UserProfileTabCarInputs)