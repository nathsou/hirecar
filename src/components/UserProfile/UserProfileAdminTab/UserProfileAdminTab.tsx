import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import HcCircleButton from "../../Button/HcCircleButton";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { fetchAdminParkingLots } from "../../../redux/userProfile/userProfileAdminTab/actions";
import { UserProfileAdminTabState } from "../../../redux/userProfile/userProfileAdminTab/types";
import UserProfileAdminParkingList from "./UserProfileAdminParkingList";
interface UserProfileAdminTabProps {
    user_profile_admin_tab: UserProfileAdminTabState
    fetchAdminParkingLots: () => void,
}

class UserProfileAdminTab extends Component<UserProfileAdminTabProps> {

    constructor(props: UserProfileAdminTabProps) {
        super(props);
        this.props.fetchAdminParkingLots();
    }

    public handleParkingLotSubmit = (e: any) => {
        e.preventDefault();
    }

    public render() {

        const { parking_lots, fetching_parking_lots } = this.props.user_profile_admin_tab;

        return (
            <Form onSubmit={this.handleParkingLotSubmit}>
                <h2 className="user-profile-title">Sites de parkings aéroports
                    <HcCircleButton
                        onClick={() => { }}
                        //icon={show_form ? "minus" : "plus"}
                        icon={"plus"}
                    />
                </h2>
                <div>
                    {fetching_parking_lots ? (<p> Chargement des sites de parking...</p >) : (
                        <UserProfileAdminParkingList />
                    )}
                    {/* {!fetching_parking_lots && spots_count === 0 ? (
                        <p>Vous n'avez pas encore réservé de véhicules pour votre prochain départ ?
                        <span className="link" onClick={() => this.props.history.push('/voiture')}> Réservez dès maintenant.</span>
                        </p>
                    ) : null}
                    {show_delete_car_rental_modal ? <UserProfileDeleteCarRentalModal /> : null} */}
                </div>
            </Form>
        );
    }
}

export default connect(
    (state: HcState) => ({
        user_profile_admin_tab: state.user_profile_tabs.user_profile_admin_tab
    }),
    {
        fetchAdminParkingLots: () => fetchAdminParkingLots()
    }
)(UserProfileAdminTab)