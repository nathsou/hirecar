import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import HcSecondaryButton from "../HcSecondaryButton";
import HcFormGroup from "./HcFormGroup";

interface SignUpState {
    [key: string]: any
}

export default class SignUp extends Component<{}, SignUpState>{

    constructor(props: any) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            password: "",
            formErrors: {
                firstnameError: null,
                lastnameError: null,
                emailError: null,
                phoneError: null,
                passwordError: null,
            },
            validForm: true
        }
    }

    firstnameHandleChange = (event: any) => {
        const firstname = event.target.value;
        const isValid = firstname.length >= 2;
        this.setState({
            firstname,
            formErrors: { ...this.state.formErrors, firstnameError: isValid ? null : 'Le prénom doit contenir au moins 2 caractères' }
        });
    }
    lastnameHandleChange = (event: any) => {
        const lastname = event.target.value;
        const isValid = lastname.length >= 2;
        this.setState({
            lastname,
            formErrors: { ...this.state.formErrors, lastnameError: isValid ? null : 'Le nom doit contenir au moins 2 caractères' }
        });
    }
    emailHandleChange = (event: any) => {
        const email = event.target.value;
        const isValid = email.match(/[A-Za-z0-9._-]*@[A-Za-z0-9]*.[A-Za-z]{2,4}/);
        this.setState({
            email,
            formErrors: { ...this.state.formErrors, emailError: isValid ? null : 'Veuillez entrer une adresse email valide' }
        });
    }
    phoneHandleChange = (event: any) => {
        const phone = event.target.value;
        const isValid = phone.match(/(\d\d){4}\d\d/);
        this.setState({
            phone,
            formErrors: { ...this.state.formErrors, phoneError: isValid ? null : 'Veuillez entrer un numéro valide' },
        });
    }
    passwordHandleChange = (event: any) => {
        const password = event.target.value;
        const isValid = password.length >= 3;
        this.setState({
            password,
            formErrors: { ...this.state.formErrors, passwordError: isValid ? null : 'Le mot de passe doit contenir au moins 3 caractères' }
        });
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        const isValid = Object.keys(this.state.formErrors).every(key => this.state.formErrors[key] === null);
        isValid ? console.log("Envoyer le form") : console.log("Vérifier les champs avant envoi");
    }

    render() {
        const { firstnameError, lastnameError, emailError, phoneError, passwordError } = this.state.formErrors;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                    <HcFormGroup
                        size="6" controlId="fistname" className={firstnameError}
                        label="Prénom" type="text"
                        name="firstname" placeholder="Votre prénom"
                        value={this.state.firstname}
                        onChange={this.firstnameHandleChange} />
                    <HcFormGroup
                        size="6" controlId="lastname" className={lastnameError}
                        label="Nom" type="text"
                        name="lastname" placeholder="Votre nom"
                        value={this.state.lastname}
                        onChange={this.lastnameHandleChange} />
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="signUpEmail" className={emailError}
                        label="Email" type="text"
                        name="email" placeholder="Veuillez entrer votre email"
                        value={this.state.email} onChange={this.emailHandleChange} />
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="telephone" className={phoneError}
                        label="Téléphone" type="tel"
                        name="phone" placeholder="Veuillez entrer votre numéro"
                        value={this.state.phone} onChange={this.phoneHandleChange} />
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="signUpPassword" className={passwordError}
                        label="Mot de passe" type="password"
                        name="password" placeholder="Veuillez entrer votre mot de passe"
                        value={this.state.password} onChange={this.passwordHandleChange} />
                </Form.Row>
                <div style={{ marginTop: "15px" }}>
                    <HcSecondaryButton type="submit">S'inscrire</HcSecondaryButton>
                </div>

                <p>Vous avez déjà un compte ? <a href="#">Identifiez-vous.</a></p>
            </Form>
        );
    }
}