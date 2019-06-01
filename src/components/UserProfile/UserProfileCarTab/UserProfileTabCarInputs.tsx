import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import HcInputFormGroup from "../../Form/HcInputFormGroup";
import HcSelectFormGroup from "../../Form/HcSelectFormGroup";
import { updateUserProfileCarModelInput, updateUserProfileCarPriceInput, updateUserProfileCarGearboxSelect, updateUserProfileCarFuelSelect, updateUserProfileCarSeatsSelect, updateUserProfileCarDoorsSelect } from "../../../redux/userProfile/userProfileCarTab/actions";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { UserProfileTabCarState } from "../../../redux/userProfile/userProfileCarTab/types";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Fuel, Gearbox } from "../../../redux/carSearch/types";
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

    private onFuelChange = (id: number): void => {
        const fuel = this.props.user_profile_tab_car.car_features.fuel.find(f => f.id === id) as Fuel;
        this.props.onFuelChange(fuel.id);
    }

    private onGearboxChange = (id: number): void => {
        const gearbox = this.props.user_profile_tab_car.car_features.gearbox.find(g => g.id === id) as Gearbox;
        this.props.onGearboxChange(gearbox.id);
    }

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
                        md={6} controlId="userProfileCarModel" validationMessage={modelError}
                        label="Modèle" type="text"
                        placeholder="Nom du modèle de la voiture"
                        value={model}
                        onChange={this.props.onModelChange} />
                    <HcInputFormGroup
                        md={4} controlId="userProfileCarPrice" validationMessage={priceError}
                        label="Prix en €/jour " type="text"
                        placeholder="Prix de la location"
                        value={price_per_day}
                        onChange={this.props.onPriceChange} />
                </Form.Row>
                <Form.Row>
                    <HcSelectFormGroup
                        md={4} controlId="userProfileCarGearbox" className=""
                        label="Boîte de vitesse"
                        options={gearbox.map(g => ({ id: g.id, text: g.type }))}
                        value={gearboxId}
                        onChange={this.onGearboxChange}
                    />
                    <HcSelectFormGroup
                        md={4} controlId="userProfileCarFuel" className=""
                        label="Carburant"
                        options={fuel.map(f => ({ id: f.id, text: f.type }))} value={fuelId}
                        onChange={this.onFuelChange}
                    />
                    <HcSelectFormGroup
                        md={2} controlId="userProfileCarSeats" className=""
                        label="Sièges"
                        options={seats.map((s) => ({ id: s, text: s.toString() }))} value={defaultSeats}
                        onChange={this.props.onSeatsChange}
                    />
                    <HcSelectFormGroup
                        md={2} controlId="userProfileCarDoors" className=""
                        label="Portes"
                        options={doors.map((d) => ({ id: d, text: d.toString() }))} value={defaultDoors}
                        onChange={this.props.onDoorsChange}
                    />
                </Form.Row>
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({
        user_profile_tab_car: state.user_profile_tabs.user_profile_tab_car
    }),
    {
        onModelChange: (e: any) => updateUserProfileCarModelInput(e.target.value),
        onPriceChange: (e: any) => updateUserProfileCarPriceInput(e.target.value),
        onGearboxChange: (gearbox_id: number) => updateUserProfileCarGearboxSelect(gearbox_id),
        onFuelChange: (fuel_id: number) => updateUserProfileCarFuelSelect(fuel_id),
        onSeatsChange: (id: number) => updateUserProfileCarSeatsSelect(id),
        onDoorsChange: (id: number) => updateUserProfileCarDoorsSelect(id),
    }
)(UserProfileTabCarInputs);