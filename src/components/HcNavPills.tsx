import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import HcSecondaryButton from "./HcSecondaryButton";

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
                            <Form.Group controlId="checkParkingLocation">
                                <Form.Label>Lieu de stationnement</Form.Label>
                                <Form.Control type="text" placeholder="Veuillez entrer le nom de l’aéroport" />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} md="4" controlId="checkParkingStartDate">
                                    <Form.Label>Début de la location</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="checkParkingStartHour">
                                    <Form.Label className="no-label">Heure</Form.Label>
                                    <Form.Control type="time" />
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="checkParkingEndDate">
                                    <Form.Label>Fin de la location</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="checkParkingEndHour">
                                    <Form.Label className="no-label">Heure</Form.Label>
                                    <Form.Control type="time" />
                                </Form.Group>
                            </Form.Row>
                            <div style={{ textAlign: "right", marginTop: "15px" }}>
                                <HcSecondaryButton >Rechercher</HcSecondaryButton>
                            </div>
                        </Form>
                    </Tab.Pane>
                    <Tab.Pane eventKey="rent_car">
                        <Form>
                            <Form.Group controlId="checkCarLocation">
                                <Form.Label>Lieu de départ</Form.Label>
                                <Form.Control type="text" placeholder="Veuillez entrer le nom de l’aéroport" />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} md="4" controlId="checkCarStartDate">
                                    <Form.Label>Début de départ</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="checkCarStartHour">
                                    <Form.Label className="no-label">Heure</Form.Label>
                                    <Form.Control type="time" />
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="checkCarEndDate">
                                    <Form.Label>Date de retour</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="checkCarEndHour">
                                    <Form.Label className="no-label">Heure</Form.Label>
                                    <Form.Control type="time" />
                                </Form.Group>
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
