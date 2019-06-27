import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import HcUserProfileTab from "./HcUserProfileTab";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { ChangeUserProfileTabAction } from "../../redux/userProfileTabs/types";
import { changeUserProfileTab } from "../../redux/userProfileTabs/actions";
import UserProfileCarRentalTab from "./UserProfileCarRentalTab/UserProfileCarRentalTab";
import UserProfileSpotRentalTab from "./UserProfileSpotRentalTab/UserProfileSpotRentalTab";
import UserProfileAdminTab from "./UserProfileAdminTab/UserProfileAdminTab";

interface HcUserProfileTabsProps {
    active_tab_key: string,
    admin: number,
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
                            <Nav.Link eventKey="user_profile_spot_rental">Réservations de parkings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="user_profile_car_rental">Réservations de voitures</Nav.Link>
                        </Nav.Item>
                        {(this.props.admin === 1) ? (
                            <Nav.Item>
                                <Nav.Link eventKey="user_profile_admin">Admin</Nav.Link>
                            </Nav.Item>
                        ) : null}
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="user_profile">
                            <HcUserProfileTab />
                        </Tab.Pane>
                        <Tab.Pane eventKey="user_profile_spot_rental">
                            <UserProfileSpotRentalTab />
                        </Tab.Pane>
                        <Tab.Pane eventKey="user_profile_car_rental">
                            <UserProfileCarRentalTab />
                        </Tab.Pane>
                        <Tab.Pane eventKey="user_profile_admin">
                            <UserProfileAdminTab />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({
        active_tab_key: state.user_profile_tabs.active_tab_key,
        admin: state.user.data.admin
    }),
    {
        onSelect: changeUserProfileTab
    }
)(HcUserProfileTabs)