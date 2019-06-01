import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import HcSecondaryButton from "../../Button/HcSecondaryButton";
import HcInputFormGroup from "../../Form/HcInputFormGroup";
import { SignInTabState, SignInFormDataState, GoogleSignInState } from "../../../redux/signInTab/types";
import { updateSignInEmailInput, updateSignInPasswordInput, submitSignInForm, postSignInForm, postGoogleSignIn, setGoogleSignIn } from "../../../redux/signInTab/actions";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { changeSignTab } from "../../../redux/signTabs/actions";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { isGoogleLoginResponseOffline } from "../../../Utils";

interface SignInTabProps extends SignInTabState {
    onEmailChange: typeof updateSignInEmailInput,
    onPasswordChange: typeof updateSignInPasswordInput,
    onSignInSubmit: typeof submitSignInForm,
    onTabChange: typeof changeSignTab,
    onPostSignInForm: (data: SignInFormDataState) => void,
    setGoogleSignIn: (data: GoogleLoginResponse) => void,
    onPostGoogleSignIn: (data: GoogleSignInState) => void
}

class SignInTab extends Component<SignInTabProps> {

    public handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.onSignInSubmit();
    }

    public componentDidUpdate(prev_props: Readonly<SignInTabProps>) {
        const { validForm } = this.props;
        if (validForm && !prev_props.validForm) {
            this.props.onPostSignInForm(this.props.form_data);
        }
    }

    public googleSuccessfulResponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if (!isGoogleLoginResponseOffline(response)) {
            this.props.setGoogleSignIn(response);
            this.props.onPostGoogleSignIn(this.props.google_data);
        }
    };

    public googleFailedResponse = (error: any) => {
        console.log(error);
    };

    public render() {
        const google_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
        const { email_error, password_error } = this.props.form_errors;
        const { email, password } = this.props.form_data;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="signin-form">
                    <Form.Row>
                        <HcInputFormGroup
                            md={12} controlId="signInEmail"
                            validationMessage={email_error}
                            label="Email" type="text"
                            placeholder="Veuillez entrer votre email"
                            value={email} onChange={this.props.onEmailChange} />
                    </Form.Row>
                    <Form.Row>
                        <HcInputFormGroup
                            md={12} controlId="signInPassword"
                            validationMessage={password_error}
                            label="Mot de passe" type="password"
                            placeholder="Veuillez entrer votre mot de passe"
                            value={password} onChange={this.props.onPasswordChange} />
                    </Form.Row>
                    <div style={{ marginTop: "15px" }}>
                        <HcSecondaryButton type="submit">Se connecter</HcSecondaryButton>
                    </div>
                    <p>Vous n'avez pas encore de compte ?
                    <span className="link" onClick={() => { this.props.onTabChange('sign_up') }}> Enregistrez-vous.</span>
                    </p>
                </Form>
                <GoogleLogin style={{ textAlign: "right" }}
                    clientId={google_client_id}
                    buttonText="Se connecter avec Google"
                    onSuccess={this.googleSuccessfulResponse}
                    onFailure={this.googleFailedResponse}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        );
    }
}

export default connect(
    (state: HcState) => state.sign_tabs.signin_tab,
    {
        onEmailChange: (e: any) => updateSignInEmailInput(e.target.value),
        onPasswordChange: (e: any) => updateSignInPasswordInput(e.target.value),
        onSignInSubmit: () => submitSignInForm(),
        onTabChange: (active_tab_key: string) => changeSignTab(active_tab_key),
        onPostSignInForm: (data: SignInFormDataState) => postSignInForm(data),
        setGoogleSignIn: (data: GoogleLoginResponse) => setGoogleSignIn(data),
        onPostGoogleSignIn: (data: GoogleSignInState) => postGoogleSignIn(data)
    }
)(SignInTab);