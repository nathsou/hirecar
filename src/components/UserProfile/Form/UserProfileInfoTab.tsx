import React, { Component } from "react";
import HcInputFormGroup from "../../Form/HcInputFormGroup";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { updateUserProfileFirstnameInput, updateUserProfileLastnameInput, updateUserProfilePhoneInput, updateUserProfileEmailInput, updateUserProfileNewPasswordInput, updateUserProfilePasswordInput, submitUserProfileInfoForm, postUserProfileInfoForm } from "../../../redux/userProfile/userProfileInfoTab/actions";
import { UserProfileInfoTabState, UserProfileInfoFormDataState } from "../../../redux/userProfile/userProfileInfoTab/types";
import Form from "react-bootstrap/Form";
import HcSecondaryButton from "../../Button/HcSecondaryButton";

interface UserProfileInfoTabProps {
    user_profile_info_tab: UserProfileInfoTabState,
    onFirstnameChange: typeof updateUserProfileFirstnameInput,
    onLastnameChange: typeof updateUserProfileLastnameInput,
    onPhoneChange: typeof updateUserProfilePhoneInput,
    onEmailChange: typeof updateUserProfileEmailInput,
    onPasswordChange: typeof updateUserProfilePasswordInput,
    onNewPasswordChange: typeof updateUserProfileNewPasswordInput,
    onUserProfileInfoSubmit: typeof submitUserProfileInfoForm,
    onPostUserProfileInfoForm: (data: UserProfileInfoFormDataState) => void
}

class UserProfileInfoTab extends Component<UserProfileInfoTabProps> {

    public handleInfoSubmit = (e: any) => {
        const { editing, valid_form, form_data } = this.props.user_profile_info_tab;

        e.preventDefault();
        this.props.onUserProfileInfoSubmit();
        if (editing && valid_form) {
            this.props.onPostUserProfileInfoForm(form_data);
        }
    }

    public render() {

        const { editing, saving } = this.props.user_profile_info_tab;
        const { firstname, lastname, email, phone, password, new_password } = this.props.user_profile_info_tab.form_data;

        const { firstname_error: firstnameError, lastname_error: lastnameError, email_error: emailError, phone_error: phoneError, password_error: passwordError, new_password_error: newPasswordError } = this.props.user_profile_info_tab.form_errors;

        return (
            <Form onSubmit={this.handleInfoSubmit}>
                <h2 className="user-profile-text">Information générale</h2>
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
                        size="4" controlId="userProfilePassword" className={passwordError}
                        label="Mot de passe actuel" type="password"
                        name="password" placeholder="Entrez votre mot de passe actuel"
                        value={password}
                        onChange={this.props.onPasswordChange} />
                    <HcInputFormGroup
                        size="4" controlId="userProfileNewPassword" className={newPasswordError}
                        label="Nouveau mot de passe" type="password"
                        name="new_password" placeholder="Entrez votre nouveau mot de passe"
                        value={new_password}
                        onChange={this.props.onNewPasswordChange} />
                </Form.Row>
                {saving ? (<p className="error-message">Vos données ont été sauvegardées.</p>) : null}
                {editing ? (
                    <div style={{ marginTop: "15px", textAlign: "right" }}>
                        <HcSecondaryButton type="submit">Enregistrer</HcSecondaryButton>
                    </div>
                ) : null}
            </Form>
        );
    }
}

export default connect(
    (state: HcState) => ({ user_profile_info_tab: state.user_profile_info_tab }),
    {
        onFirstnameChange: (e: any) => updateUserProfileFirstnameInput(e.target.value),
        onLastnameChange: (e: any) => updateUserProfileLastnameInput(e.target.value),
        onPhoneChange: (e: any) => updateUserProfilePhoneInput(e.target.value),
        onEmailChange: (e: any) => updateUserProfileEmailInput(e.target.value),
        onPasswordChange: (e: any) => updateUserProfilePasswordInput(e.target.value),
        onNewPasswordChange: (e: any) => updateUserProfileNewPasswordInput(e.target.value),
        onUserProfileInfoSubmit: () => submitUserProfileInfoForm(),
        onPostUserProfileInfoForm: (data: UserProfileInfoFormDataState) => postUserProfileInfoForm(data),
    }
)(UserProfileInfoTab)