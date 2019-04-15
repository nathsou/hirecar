import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class HcNavbar extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg"> 
                <Navbar.Brand href="#home">HireCar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#home">Location de parkings</Nav.Link>
                        <Nav.Link href="#link">Location de voitures</Nav.Link>
                        <Nav.Link href="#link">Connexion</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default HcNavbar;