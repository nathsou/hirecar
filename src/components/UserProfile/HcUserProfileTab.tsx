import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import HcSecondaryButton from "../Button/HcSecondaryButton";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { postUserProfileForm, submitUserProfileForm } from "../../redux/userProfile/userProfileInfo/actions";
import { UserProfileInfoTabState, UserProfileInfoFormDataState } from "../../redux/userProfile/userProfileInfo/types";
import UserProfileCarTab from "../Form/UserProfileCarTab";
import HcCircleButton from "../Button/HcCircleButton";
import UserProfileInfoTab from "../Form/UserProfileInfoTab";

interface HcUserProfileTabProps {
    user_profile_tab: UserProfileInfoTabState,
    onUserProfileSubmit: typeof submitUserProfileForm,
    onPostUserProfileForm: (data: UserProfileInfoFormDataState) => void
}

class HcUserProfileTab extends Component<HcUserProfileTabProps> {

    public handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.onUserProfileSubmit();
        if (this.props.user_profile_tab.editing && this.props.user_profile_tab.valid_form) {
            this.props.onPostUserProfileForm(this.props.user_profile_tab.form_data);
        }
    }

    public render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <div>
                    <h2 className="user-profile-text">Information générale</h2>
                    <UserProfileInfoTab />

                    {this.props.user_profile_tab.saving ? (
                        <p className="error-message">Les données ont été sauvegardés.</p>
                    ) : null}
                </div>
                <div>
                    <h2 className="user-profile-text">
                        Mes voitures enregistrées <HcCircleButton onClick={() => { }} value="+" />
                    </h2>
                    <UserProfileCarTab />
                    <div style={{ textAlign: "right" }}><HcCircleButton onClick={() => { }} value="+" /></div>
                    <p>Vous n'avez pas encore déclaré de véhicules ?
                        <span className="link" onClick={() => { }}> Enregistrez vos véhicules.</span>
                    </p>
                </div>
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
        onUserProfileSubmit: () => submitUserProfileForm(),
        onPostUserProfileForm: (data: UserProfileInfoFormDataState) => postUserProfileForm(data)
    }
)(HcUserProfileTab)