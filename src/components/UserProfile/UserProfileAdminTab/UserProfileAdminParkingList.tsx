import React, { Component } from "react";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { HcListItemProps } from "../../HcListItem";
import PlanePicto from "../../../res/img/plane-picto.svg";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { updateUserProfileCar } from "../../../redux/userProfile/userProfileCarTab/actions";
import HcList from "../../HcList";
import { UserProfileAdminTabState, AdminDeleteParkingAction, ToggleAdminParkingModalAction } from "../../../redux/userProfile/userProfileAdminTab/types";
import { onAdminParkingDelete, toggleAdminParkingModal } from "../../../redux/userProfile/userProfileAdminTab/actions";
import UserProfileAdminDeleteParkingModal from "./UserProfileAdminDeleteParkingModal";
library.add(faTimes);


export interface UserProfileAdminParkingListProps extends Pick<UserProfileAdminTabState, 'parking_lots'> {
    show_admin_delete_parking_modal: boolean,
    toggleAdminParkingModal: (show: boolean) => ToggleAdminParkingModalAction,
    // onUserProfileAdminParkingChange: (id: number) => void,
    onAdminParkingDelete: (id: number) => AdminDeleteParkingAction
}

class UserProfileAdminParkingList extends Component<UserProfileAdminParkingListProps> {

    public onDelete = (id: number) => {
        this.props.onAdminParkingDelete(id);
        this.props.toggleAdminParkingModal(true);
    }

    public render() {

        const parkings_lots: HcListItemProps[] = this.props.parking_lots.map(parking => {
            const p = parking;
            return {
                title: p.label,
                features: `Près de l'aéroport ${p.airport.name} • ${p.capacity} places`,
                footer: `${p.price_per_day} € / jour`,
                id: p.id
            };
        });

        return (
            <div>
                <HcList
                    items={parkings_lots} className="hc-user-profile-list-item" picto={PlanePicto} update={true}
                    onUpdate={() => { }}
                    // onUpdate={(id: number) => this.props.onUserProfileAdminParkingChange(id)}
                    onDelete={(id: number) => this.onDelete(id)}
                />
                {this.props.show_admin_delete_parking_modal ? <UserProfileAdminDeleteParkingModal /> : null}
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({
        show_admin_delete_parking_modal: state.user_profile_tabs.user_profile_admin_tab.show_admin_delete_parking_modal,
        parking_lots: state.user_profile_tabs.user_profile_admin_tab.parking_lots
    }), {
        toggleAdminParkingModal: toggleAdminParkingModal,
        onUserProfileAdminParkingChange: (id: number) => updateUserProfileCar(id),
        onAdminParkingDelete: (id: number) => onAdminParkingDelete(id)
    }
)(UserProfileAdminParkingList);

