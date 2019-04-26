import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { connect } from "react-redux";
import { changeRentTab } from "../redux/rentTabs/actions";
import { ChangeRentTabAction } from "../redux/rentTabs/types";
import RentCarTab from "./Form/RentCarTab";
import RentParkingTab from "./Form/RentParkingTab";
import { HcState } from "../redux/configureStore";

interface HcRentTabsProps {
    active_tab_key: string,
    onRentParkingSpotClick: () => ChangeRentTabAction,
    onRentCarClick: () => ChangeRentTabAction
}

class HcRentTabs extends Component<HcRentTabsProps> {

    public render() {
        return (
            <div className="container-tabs">
                <Tab.Container id="left-tabs-example" activeKey={this.props.active_tab_key}>
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link onClick={this.props.onRentParkingSpotClick} eventKey="rent_parking_spot">Location de parkings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={this.props.onRentCarClick} eventKey="rent_car">Location de voitures</Nav.Link>
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

export default connect(
    (state: HcState) => ({ active_tab_key: state.rent_tabs.active_tab_key }),
    {
        onRentParkingSpotClick: () => changeRentTab('rent_parking_spot'),
        onRentCarClick: () => changeRentTab('rent_car'),
    }
)(HcRentTabs);
