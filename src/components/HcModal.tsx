import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import SignUp from "./Form/SignUp";
import SignIn from "./Form/SignIn";

interface HcModalProps {
    show: boolean,
    handleClose: () => void
}

interface HcModalState {
    show: boolean
}

export default class HcModal extends Component<HcModalProps, HcModalState> {

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.handleClose()} dialogClassName="modal-50w" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="container-tabs">
                        <Tab.Container id="sign_tabs" defaultActiveKey="sign_in">
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
                </Modal.Body>
            </Modal>
        );
    }
}