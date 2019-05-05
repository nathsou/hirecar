import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import HcSecondaryButton from "../HcSecondaryButton";
import HcFormGroup from "./HcFormGroup";
import { SignInTabState } from "../../redux/SignInTab/types";
import { updateSignInEmailInput, updateSignInPasswordInput, submitSignInForm } from "../../redux/SignInTab/actions";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { changeSignTab } from "../../redux/signTabs/actions";

interface SignInTabProps extends SignInTabState {
    onEmailChange: typeof updateSignInEmailInput,
    onPasswordChange: typeof updateSignInPasswordInput,
    onSignInSubmit: typeof submitSignInForm,
    onTabChange: typeof changeSignTab
}

class SignInTab extends Component<SignInTabProps> {

    public handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.onSignInSubmit();
    }

    public render() {
        const { emailError, passwordError } = this.props.formErrors;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="signInEmail" className={emailError}
                        label="Email" type="text"
                        name="email" placeholder="Veuillez entrer votre email"
                        value={this.props.email} onChange={this.props.onEmailChange} />
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="12" controlId="signInPassword" className={passwordError}
                        label="Mot de passe" type="password"
                        name="password" placeholder="Veuillez entrer votre mot de passe"
                        value={this.props.password} onChange={this.props.onPasswordChange} />
                </Form.Row>
                <div style={{ marginTop: "15px" }}>
                    <HcSecondaryButton type="submit">Se connecter</HcSecondaryButton>
                </div>
                <p>Vous n'avez pas encore de compte ?
                    <span className="link" onClick={() => { this.props.onTabChange('sign_up') }}> Enregistrez-vous.</span>
                </p>
            </Form>
        );
    }
}

export default connect(
    (state: HcState) => state.sign_tabs.signin_tab,
    {
        onEmailChange: (e: any) => updateSignInEmailInput(e.target.value),
        onPasswordChange: (e: any) => updateSignInPasswordInput(e.target.value),
        onSignInSubmit: () => submitSignInForm(),
        onTabChange: (active_tab_key: string) => changeSignTab(active_tab_key)
    }
)(SignInTab);