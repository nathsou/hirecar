import React, { Component } from "react";
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import RentParkingTab from "./Form/RentParkingTab";
import RentCarTab from "./Form/RentCarTab";

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
                            <RentParkingTab />
                        </Tab.Pane>
                        <Tab.Pane eventKey="rent_car">
                            <RentCarTab />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        );
    }
}
