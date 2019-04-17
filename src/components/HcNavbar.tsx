import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import HcSecondaryButton from "./HcSecondaryButton";
import Logo from "./Logo";
import HcModal from "./HcModal";
import Modal from "react-bootstrap/Modal";

interface MyProps {

}

interface MyState {
    show: boolean
}

export default class HcNavbar extends Component<MyProps, MyState> {

    constructor(props: any) {
        super(props);
        this.state = {
            show: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick() {
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ show: false });
    }

    render() {
        return (
            <header>
                <Navbar collapseOnSelect expand="lg">
                    <Navbar.Brand href="#home"><h1><Logo /></h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link href="#home">Location de parkings</Nav.Link>
                            <Nav.Link href="#link">Location de voitures</Nav.Link>
                            <Nav.Item><HcSecondaryButton handleClick={this.handleClick}>Connexion</HcSecondaryButton></Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <HcModal show={this.state.show} handleClose={this.handleClose} />
            </header>
        );
    }
}