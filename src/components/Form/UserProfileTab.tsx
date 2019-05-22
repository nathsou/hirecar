import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import HcFormGroup from "./HcFormGroup";
import HcSecondaryButton from "../HcSecondaryButton";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { updateUserProfileFirstnameInput, updateUserProfileLastnameInput, updateUserProfilePhoneInput, updateUserProfileEmailInput, postUserProfileForm, submitUserProfileForm } from "../../redux/userProfileTab/actions";
import { UserProfileTabState, UserProfileFormDataState } from "../../redux/userProfileTab/types";

interface UserProfileTabProps {
    user_profile_tab: UserProfileTabState,
    onFirstnameChange: typeof updateUserProfileFirstnameInput,
    onLastnameChange: typeof updateUserProfileLastnameInput,
    onPhoneChange: typeof updateUserProfilePhoneInput,
    onEmailChange: typeof updateUserProfileEmailInput,
    //onUserProfileSubmit: typeof submitUserProfileForm
    //onPostUserProfileForm: (data: UserProfileFormDataState) => void
}

class UserProfileTab extends Component<UserProfileTabProps> {

    public handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Envoyer les données !");
        //this.props.onUserProfileSubmit();
    }

    public render() {

        const { firstname, lastname, email, phone } = this.props.user_profile_tab.form_data;
        const { firstname_error: firstnameError, lastname_error: lastnameError, email_error: emailError, phone_error: phoneError } = this.props.user_profile_tab.form_errors;

        return (
            <Form onSubmit={this.handleSubmit}>
                <h2 className="user-profile-text">Information générale</h2>
                <Form.Row>
                    <HcFormGroup
                        size="4" controlId="userProfileFirstname" className={firstnameError}
                        label="Prénom" type="text"
                        name="firstname" placeholder="Veuillez entrer votre prénom"
                        value={firstname}
                        onChange={this.props.onFirstnameChange} />
                    <HcFormGroup
                        size="4" controlId="userProfileLastname" className={lastnameError}
                        label="Nom" type="text"
                        name="lastname" placeholder="Veuillez entrer votre nom"
                        value={lastname}
                        onChange={this.props.onLastnameChange} />
                    <HcFormGroup
                        size="4" controlId="userProfilePhone" className={phoneError}
                        label="Téléphone" type="tel"
                        name="phone" placeholder="Veuillez entrer votre numéro"
                        value={phone}
                        onChange={this.props.onPhoneChange} />
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="4" controlId="userProfileEmail" className={emailError}
                        label="Email" type="text"
                        name="email" placeholder="Veuillez entrer votre email"
                        value={email}
                        onChange={this.props.onEmailChange} />
                    <HcFormGroup
                        size="4" controlId="userProfilePassword" className=""
                        label="Nouveau mot de passe" type="password"
                        name="password" placeholder="Votre nouveau mot de passe"
                        value=""
                        onChange={() => { }} />
                </Form.Row>
                <h2 className="user-profile-text">Mes voitures enregistrées</h2>
                <p>Vous n'avez pas encore déclaré de véhicules ?
                    <span className="link" onClick={() => { }}> Enregistrez vos véhicules.</span>
                </p>
                {this.props.user_profile_tab.editing ? (
                    <div style={{ marginTop: "15px", textAlign: "right" }}>
                        <HcSecondaryButton type="submit">Enregistrer</HcSecondaryButton>
                    </div>
                ) : null}
            </Form>
        )
    }
}

export default connect(
    (state: HcState) => ({ user_profile_tab: state.user_profile_tab }),
    {
        onFirstnameChange: (e: any) => updateUserProfileFirstnameInput(e.target.value),
        onLastnameChange: (e: any) => updateUserProfileLastnameInput(e.target.value),
        onPhoneChange: (e: any) => updateUserProfilePhoneInput(e.target.value),
        onEmailChange: (e: any) => updateUserProfileEmailInput(e.target.value),
        //onUserProfilSubmit: () => submitUserProfileForm
        ///onPostUserProfileForm: (data: UserProfileFormDataState) => postUserProfileForm(data)
    }
)(UserProfileTab)