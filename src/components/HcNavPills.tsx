import React, { Component } from "react";
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class HcNavPills extends Component {
    render() {
        return (
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
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Lieu de stationnement</Form.Label>
                                <Form.Control type="text" placeholder="Veuillez entrer le nom de l’aéroport" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Début de la location</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">Rechercher</Button>
                        </Form>
                    </Tab.Pane>
                    <Tab.Pane eventKey="rent_car">
                        Hello Locations de voiture
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>

        );
    }
}
