import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import UserProfileTab from "./Form/UserProfileTab";

export default class HcUserProfileTabs extends Component {

    public render() {
        return (
            <div className="container-tabs profile">
                <Tab.Container id="user-profile-tabs" defaultActiveKey="user_profile" >
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link eventKey="user_profile">Profil</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="user_profile_car">Location de voitures</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="user_profile_parking">Réservations de voitures</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="user_profile">
                            <UserProfileTab />
                        </Tab.Pane>
                        <Tab.Pane eventKey="user_profile_car">
                        </Tab.Pane>
                        <Tab.Pane eventKey="user_profile_parking">
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        );
    }

}