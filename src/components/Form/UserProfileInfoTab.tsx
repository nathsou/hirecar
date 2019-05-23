import React, { Component } from "react";
import HcInputFormGroup from "./HcInputFormGroup";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";

import { updateUserProfileFirstnameInput, updateUserProfileLastnameInput, updateUserProfilePhoneInput, updateUserProfileEmailInput, updateUserProfileNewPasswordInput, updateUserProfileConfirmNewPasswordInput } from "../../redux/userProfile/userProfileInfo/actions";
import { UserProfileInfoTabState } from "../../redux/userProfile/userProfileInfo/types";
import Form from "react-bootstrap/Form";

interface UserProfileInfoTabProps {
    user_profile_tab: UserProfileInfoTabState,
    onFirstnameChange: typeof updateUserProfileFirstnameInput,
    onLastnameChange: typeof updateUserProfileLastnameInput,
    onPhoneChange: typeof updateUserProfilePhoneInput,
    onEmailChange: typeof updateUserProfileEmailInput,
    onNewPasswordChange: typeof updateUserProfileNewPasswordInput,
    onConfirmNewPasswordChange: typeof updateUserProfileConfirmNewPasswordInput,
}

class UserProfileInfoTab extends Component<UserProfileInfoTabProps> {
    public render() {

        const { firstname, lastname, email, phone, new_password, confirm_new_password } = this.props.user_profile_tab.form_data;
        const { firstname_error: firstnameError, lastname_error: lastnameError, email_error: emailError, phone_error: phoneError, new_password_error: newPasswordError, confirm_new_password_error: confirmNewPasswordError } = this.props.user_profile_tab.form_errors;

        return (
            <div>
                <Form.Row>
                    <HcInputFormGroup
                        size="4" controlId="userProfileFirstname" className={firstnameError}
                        label="Prénom" type="text"
                        name="firstname" placeholder="Veuillez entrer votre prénom"
                        value={firstname}
                        onChange={this.props.onFirstnameChange} />
                    <HcInputFormGroup
                        size="4" controlId="userProfileLastname" className={lastnameError}
                        label="Nom" type="text"
                        name="lastname" placeholder="Veuillez entrer votre nom"
                        value={lastname}
                        onChange={this.props.onLastnameChange} />
                    <HcInputFormGroup
                        size="4" controlId="userProfilePhone" className={phoneError}
                        label="Téléphone" type="tel"
                        name="phone" placeholder="Veuillez entrer votre numéro"
                        value={phone}
                        onChange={this.props.onPhoneChange} />
                </Form.Row>
                <Form.Row>
                    <HcInputFormGroup
                        size="4" controlId="userProfileEmail" className={emailError}
                        label="Email" type="text"
                        name="email" placeholder="Veuillez entrer votre email"
                        value={email}
                        onChange={this.props.onEmailChange} />
                    <HcInputFormGroup
                        size="4" controlId="userProfileNewPassword" className={newPasswordError}
                        label="Nouveau mot de passe" type="password"
                        name="password" placeholder="Entrez votre nouveau mot de passe"
                        value={new_password}
                        onChange={this.props.onNewPasswordChange} />
                    <HcInputFormGroup
                        size="4" controlId="userProfileConfirmNewPassword" className={confirmNewPasswordError}
                        label="Confirmation du mot de passe" type="password"
                        name="password" placeholder="Confirmez votre nouveau mot de passe"
                        value={confirm_new_password}
                        onChange={this.props.onConfirmNewPasswordChange} />
                </Form.Row>
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({ user_profile_tab: state.user_profile_tab }),
    {
        onFirstnameChange: (e: any) => updateUserProfileFirstnameInput(e.target.value),
        onLastnameChange: (e: any) => updateUserProfileLastnameInput(e.target.value),
        onPhoneChange: (e: any) => updateUserProfilePhoneInput(e.target.value),
        onEmailChange: (e: any) => updateUserProfileEmailInput(e.target.value),
        onNewPasswordChange: (e: any) => updateUserProfileNewPasswordInput(e.target.value),
        onConfirmNewPasswordChange: (e: any) => updateUserProfileConfirmNewPasswordInput(e.target.value),
    }
)(UserProfileInfoTab)