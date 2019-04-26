import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import HcSecondaryButton from "../HcSecondaryButton";
import HcFormGroup from "./HcFormGroup";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { updateCarSearchInput } from "../../redux/rentCarTab/actions";
import { RentCarTabState } from "../../redux/rentCarTab/types";

interface RentCarTabProps extends RentCarTabState {
    onCarSearchChange: typeof updateCarSearchInput
}

export class RentCarTab extends Component<RentCarTabProps> {
    public render() {
        return (
            <Form>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="carLocation"
                        className="" label="Lieu de départ" type="text"
                        name="carLocation" placeholder="Veuillez entrer le nom de l’aéroport"
                        value={this.props.car_search_input_value}
                        onChange={this.props.onCarSearchChange} />
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="4" controlId="carStartDate"
                        className="" label="Début de départ" type="date"
                        name="carStartDate" placeholder=""
                        value=""
                        onChange={() => { }} />
                    <HcFormGroup size="2" controlId="carStartHour"
                        className="" label="Heure" type="time"
                        name="carStartHour" placeholder=""
                        value=""
                        onChange={() => { }} />
                    <HcFormGroup
                        size="4" controlId="carEndDate"
                        className="" label="Date de retour" type="date"
                        name="carEndDate" placeholder=""
                        value=""
                        onChange={() => { }} />
                    <HcFormGroup
                        size="2" controlId="carEndHour"
                        className="" label="Heure" type="time"
                        name="carEndHour" placeholder=""
                        value=""
                        onChange={() => { }} />
                </Form.Row>
                <div style={{ textAlign: "right", marginTop: "15px" }}>
                    <HcSecondaryButton type="submit" >Rechercher</HcSecondaryButton>
                </div>
            </Form>
        );
    }
}

export default connect(
    (state: HcState) => state.rent_tabs.rent_car_tab,
    {
        onCarSearchChange: (e: any) => updateCarSearchInput(e.target.value)
    }
)(RentCarTab);