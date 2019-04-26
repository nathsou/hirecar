import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import HcSecondaryButton from "./HcSecondaryButton";
import Logo from "./Logo";
import HcModal from './HcModal';
import { NavLink } from 'react-router-dom';

interface HcNavbarState {
    show: boolean
}

export default class HcNavbar extends Component<{}, HcNavbarState> {

    constructor(props: any) {
        super(props);
        this.state = {
            show: false
        };

    }

    public handleClick = () => {
        this.setState({ show: true });
    }

    public handleClose = () => {
        this.setState({ show: false });
    }

    public render() {
        return (
            <header>
                <Navbar collapseOnSelect expand="lg" fixed="top">
                    <Navbar.Brand><h1><Logo /></h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Item>
                                <NavLink activeClassName='selected' to='/parking'>Location de parkings</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink activeClassName='selected' to='/voiture'>Location de voitures</NavLink>
                            </Nav.Item>
                            <Nav.Item><HcSecondaryButton type="button" handleClick={this.handleClick}>Connexion</HcSecondaryButton></Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <HcModal show={this.state.show} handleClose={this.handleClose} />
            </header>
        );
    }
}