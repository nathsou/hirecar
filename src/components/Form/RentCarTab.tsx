import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import HcSecondaryButton from "../HcSecondaryButton";
import HcFormGroup from "./HcFormGroup";

export default class RentCarTab extends Component {
    render() {
        return (
            <Form>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="carLocation"
                        className="" label="Lieu de départ" type="text"
                        name="carLocation" placeholder="Veuillez entrer le nom de l’aéroport"
                        value=""
                        onChange={() => { }} />
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