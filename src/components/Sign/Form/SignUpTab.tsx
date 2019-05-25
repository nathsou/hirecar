import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { changeSignTab } from "../../../redux/signTabs/actions";
import { submitSignUpForm, updateSignUpConfirmPasswordInput, updateSignUpEmailInput, updateSignUpFirstnameInput, updateSignUpLastnameInput, updateSignUpPasswordInput, updateSignUpPhoneInput, postSignUpForm } from "../../../redux/signUpTab/actions";
import { SignUpTabState, SignUpFormDataState } from "../../../redux/signUpTab/types";
import HcSecondaryButton from "../../Button/HcSecondaryButton";
import HcInputFormGroup from "../../Form/HcInputFormGroup";

interface SignUpTabProps extends SignUpTabState {
    onFirstnameChange: typeof updateSignUpFirstnameInput,
    onLastnameChange: typeof updateSignUpLastnameInput,
    onEmailChange: typeof updateSignUpEmailInput,
    onPhoneChange: typeof updateSignUpPhoneInput,
    onPasswordChange: typeof updateSignUpPasswordInput,
    onConfirmPasswordChange: typeof updateSignUpConfirmPasswordInput,
    onSignUpSubmit: typeof submitSignUpForm,
    onTabChange: typeof changeSignTab,
    onPostSignUpForm: (data: SignUpFormDataState) => void
}

export class SignUpTab extends Component<SignUpTabProps>{

    public handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.onSignUpSubmit();
    }

    public componentDidUpdate(prev_props: Readonly<SignUpTabProps>) {
        const { valid_form } = this.props;
        if (valid_form && prev_props.valid_form !== valid_form) {
            this.props.onPostSignUpForm(this.props.form_data);
        }
    }

    public render() {
        const { firstname_error: firstnameError, lastname_error: lastnameError, email_error: emailError, phone_error: phoneError, password_error: passwordError, confirm_password_error: confirmPasswordError } = this.props.form_errors;
        const { firstname, lastname, email, phone, password, confirm_password } = this.props.form_data;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                    <HcInputFormGroup
                        size="6" controlId="fistname" className={firstnameError}
                        label="Prénom" type="text"
                        name="firstname" placeholder="Votre prénom"
                        value={firstname}
                        onChange={this.props.onFirstnameChange} />
                    <HcInputFormGroup
                        size="6" controlId="lastname" className={lastnameError}
                        label="Nom" type="text"
                        name="lastname" placeholder="Votre nom"
                        value={lastname}
                        onChange={this.props.onLastnameChange} />
                </Form.Row>
                <Form.Row>
                    <HcInputFormGroup
                        size="12" controlId="signUpEmail" className={emailError}
                        label="Email" type="text"
                        name="email" placeholder="Veuillez entrer votre email"
                        value={email} onChange={this.props.onEmailChange} />
                </Form.Row>
                <Form.Row>
                    <HcInputFormGroup
                        size="12" controlId="telephone" className={phoneError}
                        label="Téléphone" type="tel"
                        name="phone" placeholder="Veuillez entrer votre numéro"
                        value={phone} onChange={this.props.onPhoneChange} />
                </Form.Row>
                <Form.Row>
                    <HcInputFormGroup
                        size="12" controlId="signUpPassword" className={passwordError}
                        label="Mot de passe" type="password"
                        name="password" placeholder="Veuillez entrer votre mot de passe"
                        value={password} onChange={this.props.onPasswordChange} />
                </Form.Row>
                <Form.Row>
                    <HcInputFormGroup
                        size="12" controlId="signUpConfirmPassword" className={confirmPasswordError}
                        label="Confirmation du mot de passe" type="password"
                        name="confirmPassword" placeholder="Veuillez entrer votre mot de passe"
                        value={confirm_password} onChange={this.props.onConfirmPasswordChange} />
                </Form.Row>
                <div style={{ marginTop: "15px" }}>
                    <HcSecondaryButton type="submit">S'inscrire</HcSecondaryButton>
                </div>

                <p>Vous avez déjà un compte ?
                    <span className="link" onClick={() => this.props.onTabChange('sign_in')}> Identifiez-vous.</span>
                </p>
            </Form>
        );
    }
}

export default connect(
    (state: HcState) => state.sign_tabs.signup_tab,
    {
        onFirstnameChange: (e: any) => updateSignUpFirstnameInput(e.target.value),
        onLastnameChange: (e: any) => updateSignUpLastnameInput(e.target.value),
        onEmailChange: (e: any) => updateSignUpEmailInput(e.target.value),
        onPhoneChange: (e: any) => updateSignUpPhoneInput(e.target.value),
        onPasswordChange: (e: any) => updateSignUpPasswordInput(e.target.value),
        onConfirmPasswordChange: (e: any) => updateSignUpConfirmPasswordInput(e.target.value),
        onSignUpSubmit: () => submitSignUpForm(),
        onTabChange: (active_tab_key: string) => changeSignTab(active_tab_key),
        onPostSignUpForm: (data: SignUpFormDataState) => postSignUpForm(data)
    }
)(SignUpTab);