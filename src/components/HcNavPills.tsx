import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import HcSecondaryButton from "./HcSecondaryButton";
import HcFormGroup from "./HcFormGroup";

export default class HcNavPills extends Component {

    render() {
        return (
            <div className="container-tabs">
                <Tab.Container id="left-tabs-example" defaultActiveKey="rent_parking_spot">
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link eventKey="rent_parking_spot">Location de parkings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="rent_car">Location de voitures</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="rent_parking_spot">
                            <Form>
                                <Form.Row>
                                    <HcFormGroup size="12" controlId="checkParkingLocation" className="" label="Lieu de stationnement" type="text" placeholder="Veuillez entrer le nom de l’aéroport" />
                                </Form.Row>
                                <Form.Row>
                                    <HcFormGroup size="4" controlId="checkParkingStartDate" className="" label="Début de la location" type="date" placeholder="" />
                                    <HcFormGroup size="2" controlId="checkParkingStartHour" className="no-label" label="Heure" type="time" placeholder="" />
                                    <HcFormGroup size="4" controlId="checkParkingEndDate" className="" label="Fin de la location" type="date" placeholder="" />
                                    <HcFormGroup size="2" controlId="checkParkingEndHour" className="no-label" label="Heure" type="time" placeholder="" />
                                </Form.Row>
                                <div style={{ textAlign: "right", marginTop: "15px" }}>
                                    <HcSecondaryButton >Rechercher</HcSecondaryButton>
                                </div>
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="rent_car">
                            <Form>
                                <Form.Row>
                                    <HcFormGroup size="12" controlId="checkCarLocation" className="" label="Lieu de départ" type="text" placeholder="Veuillez entrer le nom de l’aéroport" />
                                </Form.Row>
                                <Form.Row>
                                    <HcFormGroup size="4" controlId="checkCarStartDate" className="" label="Début de départ" type="date" placeholder="" />
                                    <HcFormGroup size="2" controlId="checkCarStartHour" className="no-label" label="Heure" type="time" placeholder="" />
                                    <HcFormGroup size="4" controlId="checkCarEndDate" className="" label="Date de retour" type="date" placeholder="" />
                                    <HcFormGroup size="2" controlId="checkCarEndHour" className="no-label" label="Heure" type="time" placeholder="" />
                                </Form.Row>
                                <div style={{ textAlign: "right", marginTop: "15px" }}>
                                    <HcSecondaryButton >Rechercher</HcSecondaryButton>
                                </div>
                            </Form>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        );
    }
}
