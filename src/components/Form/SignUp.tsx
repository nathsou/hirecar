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
            firstnameError: "",
            lastnameError: "",
            emailError: "",
            phoneError: "",
            passwordError: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleChange(event: any) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    validateForm() {
        const { firstname, lastname, email, phone, password } = this.state;
        this.setState({
            firstnameError: firstname.length >= 3 ? null : 'Le prénom doit contenir au moins 3 caractères',
            lastnameError: lastname.length >= 2 ? null : 'Le nom doit contenir au moins 2 caractères',
            emailError: email.match(/[A-Za-z0-9._-]*@[A-Za-z0-9]*.[A-Za-z]{2,4}/) ? null : 'Veuillez entrer une adresse email valide',
            phoneError: phone.match(/(\d\d){4}\d\d/) ? null : 'Veuillez entrer un numéro valide',
            passwordError: password.length >= 3 ? null : 'Le mot de passe doit contenir au moins 3 caractères',
        });
    }

    handleSubmit(event: any) {
        const { firstnameError, lastnameError, emailError, phoneError, passwordError } = this.state;
        event.preventDefault();
        this.validateForm();
        // check then submit
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                    <HcFormGroup
                        size="6" controlId="fistname" className={this.state.firstnameError}
                        label="Prénom" type="text"
                        name="firstname" placeholder="Votre prénom"
                        value={this.state.firstname}
                        onChange={this.handleChange} />
                    <HcFormGroup
                        size="6" controlId="lastname" className={this.state.lastnameError}
                        label="Nom" type="text"
                        name="lastname" placeholder="Votre nom"
                        value={this.state.lastname}
                        onChange={this.handleChange} />
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="signUpEmail" className={this.state.emailError}
                        label="Email" type="text"
                        name="email" placeholder="Veuillez entrer votre email"
                        value={this.state.email} onChange={this.handleChange} />
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="telephone" className={this.state.phoneError}
                        label="Téléphone" type="tel"
                        name="phone" placeholder="Veuillez entrer votre numéro"
                        value={this.state.phone} onChange={this.handleChange} />
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="signUpPassword" className={this.state.passwordError}
                        label="Mot de passe" type="password"
                        name="password" placeholder="Veuillez entrer votre mot de passe"
                        value={this.state.password} onChange={this.handleChange} />
                </Form.Row>
                <div style={{ marginTop: "15px" }}>
                    <HcSecondaryButton type="submit">S'inscrire</HcSecondaryButton>
                </div>

                <p>Vous avez déjà un compte ? <a href="#">Identifiez-vous.</a></p>
            </Form>
        );
    }
}