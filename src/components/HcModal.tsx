import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import HcSecondaryButton from "./HcSecondaryButton";
import HcFormGroup from "./HcFormGroup";

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
                                    <Form>
                                        <Form.Row>
                                            <HcFormGroup size="12" controlId="checkEmail" className="" label="Email" type="text" placeholder="Veuillez entrer votre email" />
                                        </Form.Row>
                                        <Form.Row>
                                            <HcFormGroup size="12" controlId="checkPassword" className="" label="Mot de passe" type="password" placeholder="Veuillez entrer votre mot de passe" />
                                        </Form.Row>
                                        <div style={{ marginTop: "15px" }}>
                                            <HcSecondaryButton>Se connecter</HcSecondaryButton>
                                        </div>
                                        <p>Vous n'avez pas encore de compte ? <a href="#">Enregistrez-vous.</a></p>
                                    </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="sign_up">
                                    <Form>
                                        <Form.Row>
                                            <HcFormGroup size="6" controlId="checkFistname" className="" label="Prénom" type="text" placeholder="Votre prénom" />
                                            <HcFormGroup size="6" controlId="checkLastname" className="" label="Nom" type="text" placeholder="Votre nom" />
                                        </Form.Row>
                                        <Form.Row>
                                            <HcFormGroup size="12" controlId="checkEmail" className="" label="Email" type="text" placeholder="Veuillez entrer votre email" />
                                        </Form.Row>
                                        <Form.Row>
                                            <HcFormGroup size="12" controlId="checkTelephone" className="" label="Téléphone" type="tel" placeholder="Veuillez entrer votre numéro" />
                                        </Form.Row>
                                        <Form.Row>
                                        <HcFormGroup size="12" controlId="checkPassword" className="" label="Mot de passe" type="password" placeholder="Veuillez entrer votre mot de passe" />
                                        </Form.Row>
                                        <div style={{ marginTop: "15px" }}>
                                            <HcSecondaryButton>S'inscrire</HcSecondaryButton>
                                        </div>
                                        <p>Vous avez déjà un compte ? <a href="#">Identifiez-vous.</a></p>
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