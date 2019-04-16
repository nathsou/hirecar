import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import HcSecondaryButton from "./HcSecondaryButton";
import Logo from "./Logo";

class HcNavbar extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg">
                <Navbar.Brand href="#home"><h1><Logo /></h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#home">Location de parkings</Nav.Link>
                        <Nav.Link href="#link">Location de voitures</Nav.Link>
                        <Nav.Item><HcSecondaryButton >Connexion</HcSecondaryButton></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default HcNavbar;