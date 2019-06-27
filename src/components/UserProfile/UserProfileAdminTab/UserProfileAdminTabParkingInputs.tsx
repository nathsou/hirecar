import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import HcInputFormGroup from "../../Form/HcInputFormGroup";
import { updateAdminParkingLabelInput, updateAdminParkingLatInput, updateAdminParkingLngInput, updateAdminParkingCapacityInput, updateAdminParkingPriceInput, updateAdminParkingAirportSelect } from "../../../redux/userProfile/userProfileAdminTab/actions";
import { UserProfileAdminTabState } from "../../../redux/userProfile/userProfileAdminTab/types";
import HcSelectFormGroup from "../../Form/HcSelectFormGroup";
import { Airport } from "../../../redux/parkingSearch/types";
library.add(faPlus, faMinus);

interface UserProfileAdminTabParkingInputsProps {
    user_profile_admin_tab: UserProfileAdminTabState,
    onLabelChange: typeof updateAdminParkingLabelInput,
    onLatChange: typeof updateAdminParkingLatInput,
    onLngChange: typeof updateAdminParkingLngInput,
    onCapacityChange: typeof updateAdminParkingCapacityInput,
    onPriceChange: typeof updateAdminParkingPriceInput,
    onAirportChange: typeof updateAdminParkingAirportSelect
}

class UserProfileAdminTabParkingInputs extends Component<UserProfileAdminTabParkingInputsProps> {

    private onAirportChange = (id: number): void => {
        const airport = this.props.user_profile_admin_tab.airports.find(a => a.id === id) as Airport;
        this.props.onAirportChange(airport.id);
    }

    public render() {
        const { label, lat, lng, capacity, price_per_day, airport } = this.props.user_profile_admin_tab.form_data;
        const airportId = airport.id;
        const { label_error: labelError, lat_error: latError, lng_error: lngError, capacity_error: capacityError, price_error: priceError } = this.props.user_profile_admin_tab.form_errors;

        return (
            <div className="car-form-container">
                <Form.Row>
                    <HcInputFormGroup
                        md={6} controlId="adminParkingLabel" validationMessage={labelError}
                        label="Label" type="text"
                        placeholder="Nom du site de parking"
                        value={label}
                        onChange={this.props.onLabelChange} />
                    <HcInputFormGroup
                        md={3} controlId="adminParkingLat" validationMessage={latError}
                        label="Latitude" type="text"
                        placeholder="Latitude du site"
                        value={lat ? lat : ''}
                        onChange={this.props.onLatChange} />
                    <HcInputFormGroup
                        md={3} controlId="adminParkingLng" validationMessage={lngError}
                        label="Longitude" type="text"
                        placeholder="Longitude du site"
                        value={lng ? lng : ''}
                        onChange={this.props.onLngChange} />
                </Form.Row>
                <Form.Row>
                    <HcSelectFormGroup
                        md={6} controlId="adminParkingAirport" className=""
                        label="Aéroport"
                        options={this.props.user_profile_admin_tab.airports.map(a => ({ id: a.id, text: a.name }))}
                        value={airportId}
                        onChange={this.onAirportChange}
                    />
                    <HcInputFormGroup
                        md={3} controlId="adminParkingCapacite" validationMessage={capacityError}
                        label="Nombre de places" type="text"
                        placeholder="Places disponibles"
                        value={capacity}
                        onChange={this.props.onCapacityChange} />
                    <HcInputFormGroup
                        md={3} controlId="adminParkingPrix" validationMessage={priceError}
                        label="Prix en €/jour" type="text"
                        placeholder="Prix de la location"
                        value={price_per_day}
                        onChange={this.props.onPriceChange} />
                </Form.Row>
            </div >
        );
    }
}

export default connect(
    (state: HcState) => ({
        user_profile_admin_tab: state.user_profile_tabs.user_profile_admin_tab
    }),
    {
        onLabelChange: (e: any) => updateAdminParkingLabelInput(e.target.value),
        onLatChange: (e: any) => updateAdminParkingLatInput(e.target.value),
        onLngChange: (e: any) => updateAdminParkingLngInput(e.target.value),
        onCapacityChange: (e: any) => updateAdminParkingCapacityInput(e.target.value),
        onPriceChange: (e: any) => updateAdminParkingPriceInput(e.target.value),
        onAirportChange: (airport_id: number) => updateAdminParkingAirportSelect(airport_id),
    }
)(UserProfileAdminTabParkingInputs);