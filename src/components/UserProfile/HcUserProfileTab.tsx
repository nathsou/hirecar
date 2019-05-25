import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import HcSecondaryButton from "../Button/HcSecondaryButton";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { postUserProfileInfoForm, submitUserProfileInfoForm } from "../../redux/userProfile/userProfileInfoTab/actions";
import { UserProfileInfoTabState, UserProfileInfoFormDataState } from "../../redux/userProfile/userProfileInfoTab/types";
import UserProfileCar from "./Form/UserProfileCarTab";
import HcCircleButton from "../Button/HcCircleButton";
import UserProfileInfoTab from "./Form/UserProfileInfoTab";
import { toggleUserProfileCarForm, getUserProfileCarFeaturesForm, submitUserProfileCarForm, postUserProfileCarForm } from "../../redux/userProfile/userProfileCarTab/actions";
import { UserProfileCarTabState, UserProfileCarFormDataState } from "../../redux/userProfile/userProfileCarTab/types";

interface HcUserProfileTabProps {
    user_profile_info_tab: UserProfileInfoTabState,
    user_profile_car_tab: UserProfileCarTabState,
    onUserProfileInfoSubmit: typeof submitUserProfileInfoForm,
    onPostUserProfileInfoForm: (data: UserProfileInfoFormDataState) => void,
    toggleCarForm: typeof toggleUserProfileCarForm,
    getUserProfileCarFeatures: () => void,
    onUserProfileCarSumbit: typeof submitUserProfileCarForm,
    onPostUserProfileCarForm: (data: UserProfileCarFormDataState) => void
}

class HcUserProfileTab extends Component<HcUserProfileTabProps> {

    constructor(props: HcUserProfileTabProps) {
        super(props)
        this.props.getUserProfileCarFeatures();
    }

    public handleInfoSubmit = (e: any) => {
        const { editing, valid_form, form_data } = this.props.user_profile_info_tab;

        e.preventDefault();
        this.props.onUserProfileInfoSubmit();
        if (editing && valid_form) {
            this.props.onPostUserProfileInfoForm(form_data);
        }
    }

    public handleCarSubmit = (e: any) => {
        e.preventDefault();
        this.props.onUserProfileCarSumbit();
    }

    public componentDidUpdate(prev_props: Readonly<HcUserProfileTabProps>) {
        const { valid_form, form_data } = this.props.user_profile_car_tab;
        if (valid_form && prev_props.user_profile_car_tab.valid_form !== valid_form) {
            this.props.onPostUserProfileCarForm(form_data);
        }
    }

    public render() {
        const { editing, saving } = this.props.user_profile_info_tab;
        const { show_form } = this.props.user_profile_car_tab;

        return (
            <div>
                <Form onSubmit={this.handleInfoSubmit}>
                    <h2 className="user-profile-text">Information générale</h2>
                    <UserProfileInfoTab />
                    {saving ? (<p className="error-message">Vos données ont été sauvegardées.</p>) : null}
                    {editing ? (
                        <div style={{ marginTop: "15px", textAlign: "right" }}>
                            <HcSecondaryButton type="submit">Enregistrer</HcSecondaryButton>
                        </div>
                    ) : null}
                </Form>
                <Form onSubmit={this.handleCarSubmit}>
                    <h2 className="user-profile-text">
                        Mes voitures enregistrées
                    <HcCircleButton onClick={this.props.toggleCarForm} value={show_form ? "-" : "+"} />
                    </h2>
                    {show_form ?
                        <div>
                            <UserProfileCar />
                            <div style={{ textAlign: "right" }}>
                                <HcSecondaryButton type="submit">Ajouter</HcSecondaryButton>
                            </div>
                        </div>
                        : (
                            <p>Vous n'avez pas encore déclaré de véhicules ?
                        <span className="link" onClick={this.props.toggleCarForm}> Enregistrez vos véhicules.</span>
                            </p>
                        )}
                </Form>
            </div>

        )
    }
}

export default connect(
    (state: HcState) => ({
        user_profile_info_tab: state.user_profile_info_tab,
        user_profile_car_tab: state.user_profile_car_tab
    }),
    {
        onUserProfileInfoSubmit: () => submitUserProfileInfoForm(),
        onPostUserProfileInfoForm: (data: UserProfileInfoFormDataState) => postUserProfileInfoForm(data),
        toggleCarForm: () => toggleUserProfileCarForm(),
        getUserProfileCarFeatures: () => getUserProfileCarFeaturesForm(),
        onUserProfileCarSumbit: () => submitUserProfileCarForm(),
        onPostUserProfileCarForm: (data: UserProfileCarFormDataState) => postUserProfileCarForm(data)
    }
)(HcUserProfileTab)