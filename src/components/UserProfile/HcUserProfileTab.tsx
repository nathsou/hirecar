import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import HcSecondaryButton from "../Button/HcSecondaryButton";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { postUserProfileForm, submitUserProfileForm } from "../../redux/userProfile/userProfileInfoTab/actions";
import { UserProfileInfoTabState, UserProfileInfoFormDataState } from "../../redux/userProfile/userProfileInfoTab/types";
import UserProfileCar from "./Form/UserProfileCarTab";
import HcCircleButton from "../Button/HcCircleButton";
import UserProfileInfoTab from "./Form/UserProfileInfoTab";
import { toggleUserProfileCarForm, getUserProfileCarFeaturesForm } from "../../redux/userProfile/userProfileCarTab/actions";
import { UserProfileCarTabState } from "../../redux/userProfile/userProfileCarTab/types";

interface HcUserProfileTabProps {
    user_profile_info_tab: UserProfileInfoTabState,
    user_profile_car_tab: UserProfileCarTabState,
    onUserProfileSubmit: typeof submitUserProfileForm,
    onPostUserProfileForm: (data: UserProfileInfoFormDataState) => void,
    toggleCarForm: typeof toggleUserProfileCarForm,
    getUserProfileCarFeatures: () => void
}

class HcUserProfileTab extends Component<HcUserProfileTabProps> {

    public handleSubmit = (e: any) => {
        const { editing, valid_form, form_data } = this.props.user_profile_info_tab;

        e.preventDefault();
        this.props.onUserProfileSubmit();
        if (editing && valid_form) {
            this.props.onPostUserProfileForm(form_data);
        }
    }

    public loadCarForm = () => {
        this.props.toggleCarForm();
        this.props.getUserProfileCarFeatures();
    }

    public render() {
        const { editing, saving } = this.props.user_profile_info_tab;
        const { show_form } = this.props.user_profile_car_tab;

        return (
            <Form onSubmit={this.handleSubmit}>
                <div>
                    <h2 className="user-profile-text">Information générale</h2>
                    <UserProfileInfoTab />
                    {saving ? (<p className="error-message">Vos données ont été sauvegardées.</p>) : null}
                    {editing ? (
                        <div style={{ marginTop: "15px", textAlign: "right" }}>
                            <HcSecondaryButton type="submit">Enregistrer</HcSecondaryButton>
                        </div>
                    ) : null}
                </div>
                <div>
                    <h2 className="user-profile-text">
                        Mes voitures enregistrées <HcCircleButton onClick={this.loadCarForm} value="+" />
                    </h2>
                    {show_form ?
                        <div>
                            <UserProfileCar />
                            <div style={{ textAlign: "right" }}>
                                <HcSecondaryButton handleClick={() => { }}>Ajouter</HcSecondaryButton>
                            </div>
                        </div>
                        : (
                            <p>Vous n'avez pas encore déclaré de véhicules ?
                            <span className="link" onClick={this.loadCarForm}> Enregistrez vos véhicules.</span>
                            </p>
                        )}
                </div>
            </Form>
        )
    }
}

export default connect(
    (state: HcState) => ({
        user_profile_info_tab: state.user_profile_info_tab,
        user_profile_car_tab: state.user_profile_car_tab
    }),
    {
        onUserProfileSubmit: () => submitUserProfileForm(),
        onPostUserProfileForm: (data: UserProfileInfoFormDataState) => postUserProfileForm(data),
        toggleCarForm: () => toggleUserProfileCarForm(),
        getUserProfileCarFeatures: () => getUserProfileCarFeaturesForm()
    }
)(HcUserProfileTab)