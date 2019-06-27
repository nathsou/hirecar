import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import HcCircleButton from "../../Button/HcCircleButton";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { fetchAdminParkingLots, toggleAdminParkingForm, fetchAdminAirports, submitAdminParkingForm, postAdminParkingForm, postUpdatedAdminParkingForm } from "../../../redux/userProfile/userProfileAdminTab/actions";
import { UserProfileAdminTabState } from "../../../redux/userProfile/userProfileAdminTab/types";
import UserProfileAdminParkingList from "./UserProfileAdminParkingList";
import UserProfileAdminTabParkingInputs from "./UserProfileAdminTabParkingInputs";
import HcSecondaryButton from "../../Button/HcSecondaryButton";
import { parseParkingLot } from "../../../Utils";
import { ParkingLot } from "../../../redux/parkingSearch/types";


interface UserProfileAdminTabProps {
    user_profile_admin_tab: UserProfileAdminTabState
    fetchAdminParkingLots: () => void,
    fetchAirports: () => void,
    toggleAdminParkingForm: typeof toggleAdminParkingForm,
    submitAdminParkingForm: typeof submitAdminParkingForm,
    postAdminParkingForm: (data: ParkingLot) => void,
    postUpdatedAdminParkingForm: (data: ParkingLot) => void
}

class UserProfileAdminTab extends Component<UserProfileAdminTabProps> {

    constructor(props: UserProfileAdminTabProps) {
        super(props);
        this.props.fetchAdminParkingLots();
        this.props.fetchAirports();
    }

    public handleParkingLotSubmit = (e: any) => {
        e.preventDefault();
        this.props.submitAdminParkingForm();
    }

    public componentDidUpdate(prev_props: Readonly<UserProfileAdminTabProps>) {

        const { valid_form, form_data, editing, submit_form } = this.props.user_profile_admin_tab;

        if (!editing && valid_form && prev_props.user_profile_admin_tab.valid_form !== valid_form) {
            this.props.postAdminParkingForm(parseParkingLot(form_data));
        }
        if (submit_form && editing && valid_form && prev_props.user_profile_admin_tab.submit_form !== submit_form) {
            this.props.postUpdatedAdminParkingForm(parseParkingLot(form_data));
        }
    }

    public render() {

        const { fetching_parking_lots, show_form, editing, saving } = this.props.user_profile_admin_tab;

        return (
            <Form onSubmit={this.handleParkingLotSubmit}>
                <h2 className="user-profile-title">Sites de parkings aéroports
                    <HcCircleButton
                        onClick={this.props.toggleAdminParkingForm}
                        icon={show_form ? "minus" : "plus"}
                    />
                </h2>
                {saving ? (<p className="error-message">Votre site parking a été enregistré.</p>) : null}

                {fetching_parking_lots && !saving ? (<p> Chargement des sites de parking...</p >) : null}
                {!saving && !show_form ? <UserProfileAdminParkingList /> : null}
                {show_form ? (
                    <div>
                        <UserProfileAdminTabParkingInputs />
                        <div style={{ textAlign: "right" }}>
                            <HcSecondaryButton type="submit">{editing ? "Modifier" : "Ajouter"}</HcSecondaryButton>
                        </div>
                    </div>
                ) : null}
            </Form>
        );
    }
}

export default connect(
    (state: HcState) => ({
        user_profile_admin_tab: state.user_profile_tabs.user_profile_admin_tab,
    }),
    {
        fetchAdminParkingLots: () => fetchAdminParkingLots(),
        fetchAirports: () => fetchAdminAirports(),
        toggleAdminParkingForm: () => toggleAdminParkingForm(),
        submitAdminParkingForm: () => submitAdminParkingForm(),
        postAdminParkingForm: (data: ParkingLot) => postAdminParkingForm(data),
        postUpdatedAdminParkingForm: (data: ParkingLot) => postUpdatedAdminParkingForm(data)
    }
)(UserProfileAdminTab)