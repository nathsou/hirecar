import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import HcSecondaryButton from "./HcSecondaryButton";

interface MyProps {
    show: boolean,
    handleClose: () => void
}

interface MyState {
    show: boolean
}

export default class HcModal extends Component<MyProps, MyState> {

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.handleClose()} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="container-tabs">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="sign_in">
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
                                    <Form>
                                        <Form.Row>
                                            <Form.Group as={Col} md="12" controlId="checkEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="text" placeholder="Veuillez entrer votre email" />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="12" controlId="checkPassword">
                                                <Form.Label>Mot de passe</Form.Label>
                                                <Form.Control type="text" placeholder="Veuillez entrer votre mot de passe" />
                                            </Form.Group>
                                        </Form.Row>
                                        <div style={{ marginTop: "15px" }}>
                                            <HcSecondaryButton >Se connecter</HcSecondaryButton>
                                        </div>
                                    </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="sign_up">
                                    <Form>
                                        <Form.Row>
                                            <Form.Group as={Col} md="12" controlId="checkEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="text" placeholder="Veuillez entrer votre email" />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="12" controlId="checkPassword">
                                                <Form.Label>Mot de passe</Form.Label>
                                                <Form.Control type="text" placeholder="Veuillez entrer votre mot de passe" />
                                            </Form.Group>
                                        </Form.Row>
                                        <div style={{ marginTop: "15px" }}>
                                            <HcSecondaryButton >S'inscrire</HcSecondaryButton>
                                        </div>
                                    </Form>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}