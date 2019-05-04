import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import HcSecondaryButton from "../HcSecondaryButton";
import HcFormGroup from "./HcFormGroup";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { SignUpState } from "../../redux/signUp/types";
import { updateFirstnameInput, updateLastnameInput, updateEmailInput, updatePhoneInput, updatePasswordInput, submitSignUpForm } from "../../redux/signUp/actions";

interface SignUpProps extends SignUpState {
    onFirstnameChange: typeof updateFirstnameInput,
    onLastnameChange: typeof updateLastnameInput,
    onEmailChange: typeof updateEmailInput,
    onPhoneChange: typeof updatePhoneInput,
    onPasswordChange: typeof updatePasswordInput,
    onSignUpSubmit: typeof submitSignUpForm
}

export class SignUp extends Component<SignUpProps>{

    public handleSubmit = (event: any) => {
        event.preventDefault();
        this.props.onSignUpSubmit();
    }

    public render() {
        const { firstnameError, lastnameError, emailError, phoneError, passwordError } = this.props.formErrors;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                    <HcFormGroup
                        size="6" controlId="fistname" className={firstnameError}
                        label="Prénom" type="text"
                        name="firstname" placeholder="Votre prénom"
                        value={this.props.firstname}
                        onChange={this.props.onFirstnameChange} />
                    <HcFormGroup
                        size="6" controlId="lastname" className={lastnameError}
                        label="Nom" type="text"
                        name="lastname" placeholder="Votre nom"
                        value={this.props.lastname}
                        onChange={this.props.onLastnameChange} />
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="signUpEmail" className={emailError}
                        label="Email" type="text"
                        name="email" placeholder="Veuillez entrer votre email"
                        value={this.props.email} onChange={this.props.onEmailChange} />
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="telephone" className={phoneError}
                        label="Téléphone" type="tel"
                        name="phone" placeholder="Veuillez entrer votre numéro"
                        value={this.props.phone} onChange={this.props.onPhoneChange} />
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="signUpPassword" className={passwordError}
                        label="Mot de passe" type="password"
                        name="password" placeholder="Veuillez entrer votre mot de passe"
                        value={this.props.password} onChange={this.props.onPasswordChange} />
                </Form.Row>
                <div style={{ marginTop: "15px" }}>
                    <HcSecondaryButton type="submit">S'inscrire</HcSecondaryButton>
                </div>

                <p>Vous avez déjà un compte ? <a href="/">Identifiez-vous.</a></p>
            </Form>
        );
    }
}

export default connect(
    (state: HcState) => state.sign_up,
    {
        onFirstnameChange: (e: any) => updateFirstnameInput(e.target.value),
        onLastnameChange: (e: any) => updateLastnameInput(e.target.value),
        onEmailChange: (e: any) => updateEmailInput(e.target.value),
        onPhoneChange: (e: any) => updatePhoneInput(e.target.value),
        onPasswordChange: (e: any) => updatePasswordInput(e.target.value),
        onSignUpSubmit: () => submitSignUpForm()
    }
)(SignUp);