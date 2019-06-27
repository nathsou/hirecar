import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { toggleUserProfileCarForm, submitUserProfileCarForm, fetchUserProfileCarFeaturesForm, postUserProfileCarForm, fetchUserProfileCars, postUpdateUserProfileCarForm } from "../../../redux/userProfile/userProfileCarTab/actions";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { UserProfileTabCarState } from "../../../redux/userProfile/userProfileCarTab/types";
import HcCircleButton from "../../Button/HcCircleButton";
import HcSecondaryButton from "../../Button/HcSecondaryButton";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import UserProfileTabCarInputs from "./UserProfileTabCarInputs";
import { UserDataState } from "../../../redux/user/types";
import HcCarsList from "./UserProfileCarsList";
import { Car } from "../../../redux/carSearch/types";
import { parseCar } from "../../../Utils";
library.add(faPlus, faMinus);

interface UserProfileTabCarProps {
    user: UserDataState,
    user_profile_tab_car: UserProfileTabCarState,
    toggleCarForm: typeof toggleUserProfileCarForm,
    fetchUserProfileCarFeatures: () => void,
    onUserProfileCarSumbit: typeof submitUserProfileCarForm,
    onPostUserProfileCarForm: (data: Car) => void,
    fetchUserProfileCars: (id: number) => void,
    onPostUpdateUserProfileCarForm: (data: Car) => void
}

class UserProfileTabCar extends Component<UserProfileTabCarProps> {

    constructor(props: UserProfileTabCarProps) {
        super(props);
        this.props.fetchUserProfileCarFeatures();
        this.props.fetchUserProfileCars(this.props.user.id);
    }

    public handleCarSubmit = (e: any) => {
        e.preventDefault();
        this.props.onUserProfileCarSumbit();
    }

    public componentDidUpdate(prev_props: Readonly<UserProfileTabCarProps>) {

        const { valid_form, form_data, editing, submit_form } = this.props.user_profile_tab_car;
        if (!editing && valid_form && prev_props.user_profile_tab_car.valid_form !== valid_form) {
            this.props.onPostUserProfileCarForm(parseCar(form_data));
        }
        if (submit_form && editing && valid_form && prev_props.user_profile_tab_car.submit_form !== submit_form) {
            this.props.onPostUpdateUserProfileCarForm(parseCar(form_data));
        }
    }

    public render() {
        const { editing, show_form, saving, cars_data } = this.props.user_profile_tab_car;
        const { fetching: fetching_cars } = this.props.user_profile_tab_car.cars_data;
        const cars_count = Object.keys(cars_data.cars).length;
        const fetching = fetching_cars && !saving;

        return (
            <Form onSubmit={this.handleCarSubmit}>
                <h2 className="user-profile-title">Mes voitures enregistrées
                    <HcCircleButton
                        onClick={this.props.toggleCarForm}
                        icon={show_form ? "minus" : "plus"}
                    />
                </h2>
                {saving ? (<p className="error-message">Votre véhicule a été enregistré.</p>) : null}

                {fetching ? (<p>Chargement de vos véhicules...</p>) : null}
                {show_form ? (
                    <div>
                        <UserProfileTabCarInputs />
                        <div style={{ textAlign: "right" }}>
                            <HcSecondaryButton type="submit">{editing ? "Modifier" : "Ajouter"}</HcSecondaryButton>
                        </div>
                    </div>
                ) : null}
                {!saving && !show_form ? <HcCarsList /> : null}
                {!fetching_cars && !show_form && !saving && cars_count === 0 ? (
                    <p>Vous n'avez pas encore déclaré de véhicules ?
                        <span className="link" onClick={this.props.toggleCarForm}> Enregistrez vos véhicules.</span>
                    </p>
                ) : null}
            </Form>
        );
    }
}

export default connect(
    (state: HcState) => ({
        user: state.user.data,
        user_profile_tab_car: state.user_profile_tabs.user_profile_tab_car
    }),
    {
        toggleCarForm: () => toggleUserProfileCarForm(),
        fetchUserProfileCarFeatures: () => fetchUserProfileCarFeaturesForm(),
        onUserProfileCarSumbit: () => submitUserProfileCarForm(),
        onPostUserProfileCarForm: (data: Car) => postUserProfileCarForm(data),
        fetchUserProfileCars: (id: number) => fetchUserProfileCars(id),
        onPostUpdateUserProfileCarForm: (data: Car) => postUpdateUserProfileCarForm(data)
    }
)(UserProfileTabCar)