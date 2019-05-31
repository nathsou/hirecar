import React, { Component } from "react";
import HcInputFormGroup from "../../Form/HcInputFormGroup";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { updateUserProfileFirstnameInput, updateUserProfileLastnameInput, updateUserProfilePhoneInput, updateUserProfileEmailInput, updateUserProfileNewPasswordInput, updateUserProfilePasswordInput } from "../../../redux/userProfile/userProfileInfoTab/actions";
import { UserProfileTabInfoState } from "../../../redux/userProfile/userProfileInfoTab/types";
import Form from "react-bootstrap/Form";

interface UserProfileTabInfoInputsProps {
    user_profile_tab_info: UserProfileTabInfoState,
    onFirstnameChange: typeof updateUserProfileFirstnameInput,
    onLastnameChange: typeof updateUserProfileLastnameInput,
    onPhoneChange: typeof updateUserProfilePhoneInput,
    onEmailChange: typeof updateUserProfileEmailInput,
    onPasswordChange: typeof updateUserProfilePasswordInput,
    onNewPasswordChange: typeof updateUserProfileNewPasswordInput,
}

class UserProfileTabInfoInputs extends Component<UserProfileTabInfoInputsProps> {

    public render() {

        const { firstname, lastname, email, phone, password, new_password } = this.props.user_profile_tab_info.form_data;
        const { firstname_error: firstnameError, lastname_error: lastnameError, email_error: emailError, phone_error: phoneError, password_error: passwordError, new_password_error: newPasswordError } = this.props.user_profile_tab_info.form_errors;

        return (
            <div>
                <Form.Row>
                    <HcInputFormGroup
                        md={4} controlId="userProfileFirstname" validationMessage={firstnameError}
                        label="Prénom" type="text"
                        placeholder="Veuillez entrer votre prénom"
                        value={firstname}
                        onChange={this.props.onFirstnameChange} />
                    <HcInputFormGroup
                        md={4} controlId="userProfileLastname" validationMessage={lastnameError}
                        label="Nom" type="text"
                        placeholder="Veuillez entrer votre nom"
                        value={lastname}
                        onChange={this.props.onLastnameChange} />
                    <HcInputFormGroup
                        md={4} controlId="userProfilePhone" validationMessage={phoneError}
                        label="Téléphone" type="tel"
                        placeholder="Veuillez entrer votre numéro"
                        value={phone}
                        onChange={this.props.onPhoneChange} />
                </Form.Row>
                <Form.Row>
                    <HcInputFormGroup
                        md={4} controlId="userProfileEmail" validationMessage={emailError}
                        label="Email" type="text"
                        placeholder="Veuillez entrer votre email"
                        value={email}
                        onChange={this.props.onEmailChange} />
                    <HcInputFormGroup
                        md={4} controlId="userProfilePassword" validationMessage={passwordError}
                        label="Mot de passe actuel" type="password"
                        placeholder="Entrez votre mot de passe actuel"
                        value={password}
                        onChange={this.props.onPasswordChange} />
                    <HcInputFormGroup
                        md={4} controlId="userProfileNewPassword" validationMessage={newPasswordError}
                        label="Nouveau mot de passe" type="password"
                        placeholder="Entrez votre nouveau mot de passe"
                        value={new_password}
                        onChange={this.props.onNewPasswordChange} />
                </Form.Row>
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({ user_profile_tab_info: state.user_profile_tabs.user_profile_tab_info }),
    {
        onFirstnameChange: (e: any) => updateUserProfileFirstnameInput(e.target.value),
        onLastnameChange: (e: any) => updateUserProfileLastnameInput(e.target.value),
        onPhoneChange: (e: any) => updateUserProfilePhoneInput(e.target.value),
        onEmailChange: (e: any) => updateUserProfileEmailInput(e.target.value),
        onPasswordChange: (e: any) => updateUserProfilePasswordInput(e.target.value),
        onNewPasswordChange: (e: any) => updateUserProfileNewPasswordInput(e.target.value)
    }
)(UserProfileTabInfoInputs)