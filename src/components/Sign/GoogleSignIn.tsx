import React, { Component } from "react";
import { postGoogleSignIn, setGoogleSignIn } from "../../redux/signInTab/actions";
import { connect } from "react-redux";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { HcState } from "../../redux/configureStore";
import { isGoogleLoginResponseOffline } from "../../Utils";
import { SocialMediaSignInState } from "../../redux/signInTab/types";

interface GoogleSignInProps {
    google_data: SocialMediaSignInState,
    setGoogleSignIn: (data: GoogleLoginResponse) => void,
    onPostGoogleSignIn: (data: SocialMediaSignInState) => void
}

class GoogleSignIn extends Component<GoogleSignInProps> {

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

        return (
            <GoogleLogin
                clientId={google_client_id}
                buttonText="Se connecter avec Google"
                onSuccess={this.googleSuccessfulResponse}
                onFailure={this.googleFailedResponse}
                cookiePolicy={'single_host_origin'}
            />
        );
    }
}

export default connect(
    (state: HcState) => ({
        google_data: state.sign_tabs.signin_tab.google_data
    }),
    {
        setGoogleSignIn: (data: GoogleLoginResponse) => setGoogleSignIn(data),
        onPostGoogleSignIn: (data: SocialMediaSignInState) => postGoogleSignIn(data)
    }
)(GoogleSignIn);