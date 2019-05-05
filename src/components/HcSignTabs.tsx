import React, { Component } from "react";
import { connect } from "react-redux";
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import SignUp from "./Form/SignUp";
import SignIn from "./Form/SignIn";
import { HcState } from "../redux/configureStore";
import { ChangeSignTabAction } from "../redux/signTabs/types";
import { changeSignTab } from "../redux/signTabs/actions";

interface HcSignTabsProps {
    active_tab_key: string,
    onSelect: (activeKey: string) => ChangeSignTabAction
}

class HcSignTabs extends Component<HcSignTabsProps> {
    public render() {
        return (
            <div className="container-tabs">
                <Tab.Container id="sign_tabs" defaultActiveKey={this.props.active_tab_key} onSelect={this.props.onSelect}>
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link eventKey="sign_in">Connexion</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="sign_up">Inscription</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="sign_in">
                            <SignIn />
                        </Tab.Pane>
                        <Tab.Pane eventKey="sign_up">
                            <SignUp />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({ active_tab_key: state.sign_tabs.active_tab_key }),
    {
        onSelect: changeSignTab
    }
)(HcSignTabs)