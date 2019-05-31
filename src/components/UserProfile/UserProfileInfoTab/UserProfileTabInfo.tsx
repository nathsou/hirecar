import React, { Component } from "react";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { submitUserProfileInfoForm, postUserProfileInfoForm } from "../../../redux/userProfile/userProfileTabInfo/actions";
import { UserProfileTabInfoState, UserProfileInfoFormDataState } from "../../../redux/userProfile/userProfileTabInfo/types";
import Form from "react-bootstrap/Form";
import HcSecondaryButton from "../../Button/HcSecondaryButton";
import UserProfileTabInfoInputs from "./UserProfileTabInfoInputs";

interface UserProfileTabInfoProps {
    user_profile_tab_info: UserProfileTabInfoState
    onUserProfileInfoSubmit: typeof submitUserProfileInfoForm,
    onPostUserProfileInfoForm: (data: UserProfileInfoFormDataState) => void
}

class UserProfileTabInfo extends Component<UserProfileTabInfoProps> {

    public handleInfoSubmit = (e: any) => {
        const { editing, valid_form, form_data } = this.props.user_profile_tab_info;

        e.preventDefault();
        this.props.onUserProfileInfoSubmit();
        if (editing && valid_form) {
            this.props.onPostUserProfileInfoForm(form_data);
        }
    }

    public render() {

        const { editing, saving } = this.props.user_profile_tab_info;
        return (
            <Form onSubmit={this.handleInfoSubmit}>
                <h2 className="user-profile-title">Information générale</h2>
                <UserProfileTabInfoInputs />
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
    (state: HcState) => ({
        user_profile_tab_info: state.user_profile_tabs.user_profile_tab_info
    }),
    {
        onUserProfileInfoSubmit: () => submitUserProfileInfoForm(),
        onPostUserProfileInfoForm: (data: UserProfileInfoFormDataState) => postUserProfileInfoForm(data),
    }
)(UserProfileTabInfo)