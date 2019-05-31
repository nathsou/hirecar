import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import HcUserProfileTab from "./HcUserProfileTab";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { ChangeUserProfileTabAction } from "../../redux/userProfileTabs/types";
import { changeUserProfileTab } from "../../redux/userProfileTabs/actions";
import HcUserProfileTabSpotRental from "./UserProfileSpotRentalTab/UserProfileTabSpotRental";
import UserProfileCarRentalTab from "./UserProfileCarRentalTab/UserProfileCarRentalTab";

interface HcUserProfileTabsProps {
    active_tab_key: string,
    onSelect: (activeKey: string) => ChangeUserProfileTabAction
}

class HcUserProfileTabs extends Component<HcUserProfileTabsProps> {

    public render() {
        return (
            <div className="container-tabs profile">
                <Tab.Container id="user-profile-tabs" activeKey={this.props.active_tab_key} onSelect={this.props.onSelect} >
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link eventKey="user_profile">Profil</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="user_profile_rent_parking">Réservations de parkings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="user_profile_rent_car">Réservations de voitures</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="user_profile">
                            <HcUserProfileTab />
                        </Tab.Pane>
                        <Tab.Pane eventKey="user_profile_rent_parking">
                            <HcUserProfileTabSpotRental />
                        </Tab.Pane>
                        <Tab.Pane eventKey="user_profile_rent_car">
                            <UserProfileCarRentalTab />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({ active_tab_key: state.user_profile_tabs.active_tab_key }),
    {
        onSelect: changeUserProfileTab
    }
)(HcUserProfileTabs)