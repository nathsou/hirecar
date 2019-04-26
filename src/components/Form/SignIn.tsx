import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import HcSecondaryButton from "../HcSecondaryButton";
import HcFormGroup from "./HcFormGroup";

export default class SignIn extends Component {
    render() {
        return (
            <Form>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="signInEmail"
                        className="" label="Email" type="text"
                        name="email" placeholder="Veuillez entrer votre email"
                        value="" onChange={() => { }} />
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="signInPassword"
                        className="" label="Mot de passe" type="password"
                        name="password" placeholder="Veuillez entrer votre mot de passe"
                        value="" onChange={() => { }} />
                </Form.Row>
                <div style={{ marginTop: "15px" }}>
                    <HcSecondaryButton type="submit">Se connecter</HcSecondaryButton>
                </div>
                <p>Vous n'avez pas encore de compte ? <a href="/">Enregistrez-vous.</a></p>
            </Form>
        );
    }
}