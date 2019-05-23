import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import HcInputFormGroup from "./HcInputFormGroup";
import HcSelectFormGroup from "./HcSelectFormGroup";

export default class UserProfileCarTab extends Component {
    public render() {
        const gearbox = ["Automatique", "Manuelle"];
        const fuel = ["Diesel", "Essence", "Électrique", "GPL", "Hybride"];
        const seats = ["2", "4", "5"];
        const doors = ["3", "5"];
        return (
            <div>
                <Form.Row>
                    <HcInputFormGroup
                        size="6" controlId="userProfileCarModel" className=""
                        label="Modèle" type="text"
                        name="model" placeholder="Nom du modèle de la voiture"
                        value=""
                        onChange={() => { }} />
                    <HcSelectFormGroup
                        size="3"
                        controlId="userProfileCarSeats"
                        className=""
                        label="Sièges"
                        name="nb_seats"
                        values={seats}
                    />
                    <HcSelectFormGroup
                        size="3"
                        controlId="userProfileCarDoors"
                        className=""
                        label="Portes"
                        name="nb_doors"
                        values={doors}
                    />
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
                    <HcInputFormGroup
                        size="4" controlId="userProfileCarPrice" className=""
                        label="Prix en €/jour " type="text"
                        name="price_per_day" placeholder="Prix de la location"
                        value=""
                        onChange={() => { }} />
                </Form.Row>
            </div>
        );
    }
}