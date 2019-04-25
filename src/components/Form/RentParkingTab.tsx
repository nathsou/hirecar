import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import HcSecondaryButton from "../HcSecondaryButton";
import HcFormGroup from "./HcFormGroup";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { updateParkingSearchInput } from "../../redux/rentParkingTab/actions";

export interface RentParkingTabState {
    parking_search: string,
    location_start: Date,
    location_end: Date
}

interface RentParkingTabProps extends RentParkingTabState {
    onParkingSearchChange: typeof updateParkingSearchInput
}

class RentParkingTab extends Component<RentParkingTabProps> {
    public render() {
        return (
            <Form>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="parkingLocation"
                        className="" label="Lieu de stationnement" type="text"
                        name="parkingLocation" placeholder="Veuillez entrer le nom de l’aéroport"
                        value={this.props.parking_search}
                        onChange={this.props.onParkingSearchChange} />
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="4" controlId="parkingStartDate"
                        className="" label="Début de la location"
                        name="parkingStartDate" type="date" placeholder=""
                        value=""
                        onChange={() => { }} />
                    <HcFormGroup
                        size="2" controlId="parkingStartHour"
                        className="" label="Heure" type="time"
                        name="parkingStartHour" placeholder=""
                        value=""
                        onChange={() => { }} />
                    <HcFormGroup
                        size="4" controlId="parkingEndDate"
                        className="" label="Fin de la location" type="date"
                        name="parkingEndDate" placeholder=""
                        value=""
                        onChange={() => { }} />
                    <HcFormGroup
                        size="2" controlId="parkingEndHour"
                        className="" label="Heure" type="time"
                        name="parkingEndHour" placeholder=""
                        value=""
                        onChange={() => { }} />
                </Form.Row>
                <div style={{ textAlign: "right", marginTop: "15px" }}>
                    <HcSecondaryButton type="submit">Rechercher</HcSecondaryButton>
                </div>
            </Form>
        );
    }
}

export default connect(
    (state: HcState) => state.rent_parking_tab,
    {
        onParkingSearchChange: (e: any) => updateParkingSearchInput(e.target.value)
    }
)(RentParkingTab);