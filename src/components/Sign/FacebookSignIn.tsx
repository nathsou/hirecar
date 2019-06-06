import React, { Component } from "react";
import { connect } from "react-redux";
import FacebookLogin, { ReactFacebookFailureResponse } from 'react-facebook-login';
import { HcState } from "../../redux/configureStore";
import { ReactFacebookLoginNameInfo } from "../../Utils";
import { SocialMediaSignInState } from "../../redux/signInTab/types";
import { setFacebookSignIn, postFacebookSignIn } from "../../redux/signInTab/actions";

interface FacebookSignInProps {
    facebook_data: SocialMediaSignInState,
    setFacebookSignIn: (data: ReactFacebookLoginNameInfo) => void,
    onPostFacebookSignIn: (data: SocialMediaSignInState) => void
}

class FacebookSignIn extends Component<FacebookSignInProps> {

    public facebookSuccessfulResponse = (response: ReactFacebookLoginNameInfo) => {
        this.props.setFacebookSignIn(response);
        this.props.onPostFacebookSignIn(this.props.facebook_data);
    };

    public facebookFailedResponse = (error: ReactFacebookFailureResponse) => {
        console.log(error);
    };

    public render() {
        const fb_app_id = process.env.REACT_APP_FACEBOOK_APP_ID as string;
        return (
            <FacebookLogin
                appId={fb_app_id}
                fields="first_name, last_name, email"
                callback={this.facebookSuccessfulResponse}
                onFailure={this.facebookFailedResponse}
                cssClass="my-facebook-button-class" icon="fa-facebook-square"
                textButton="Se connecter avec Facebook"
            />
        );
    }
}

export default connect(
    (state: HcState) => ({
        facebook_data: state.sign_tabs.signin_tab.facebook_data
    }),
    {
        setFacebookSignIn: (data: ReactFacebookLoginNameInfo) => setFacebookSignIn(data),
        onPostFacebookSignIn: (data: SocialMediaSignInState) => postFacebookSignIn(data)
    }
)(FacebookSignIn);