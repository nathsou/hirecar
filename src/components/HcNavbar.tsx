import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import HcSecondaryButton from "./HcSecondaryButton";
import Logo from "./Logo";
import HcModal from './HcModal';
import { NavLink } from 'react-router-dom';
import { ToggleSignModalAction, NavbarState } from "../redux/navbar/types";
import { connect } from "react-redux";
import { HcState } from "../redux/configureStore";
import { toggleShowModal } from "../redux/navbar/actions";

interface HcNavbarProps extends NavbarState {
    show_modal: boolean,
    toggleModal: () => ToggleSignModalAction
}

class HcNavbar extends Component<HcNavbarProps> {

    public render() {

        return (
            <header>
                <Navbar collapseOnSelect expand="lg" fixed="top">
                    <Navbar.Brand>
                        <h1><Logo /></h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Item>
                                <NavLink activeClassName='selected' to='/parking'>Location de parkings</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink activeClassName='selected' to='/voiture'>Location de voitures</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <HcSecondaryButton handleClick={this.props.toggleModal}>Connexion</HcSecondaryButton>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <HcModal show={this.props.show_modal} handleClose={this.props.toggleModal} />
            </header>
        );
    }
}


export default connect(
    (state: HcState) => state.navbar,
    {
        toggleModal: toggleShowModal
    }
)(HcNavbar)