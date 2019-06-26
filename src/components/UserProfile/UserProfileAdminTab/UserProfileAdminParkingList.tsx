import React, { Component } from "react";
import { connect } from "react-redux";
import { HcState } from "../../../redux/configureStore";
import { DeleteUserProfileCarAction, ToggleUserProfileCarModalAction } from "../../../redux/userProfile/userProfileCarTab/types";
import { HcListItemProps } from "../../HcListItem";
import PlanePicto from "../../../res/img/plane-picto.svg";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { updateUserProfileCar, onUserProfileCarDelete, toggleUserProfileCarModal } from "../../../redux/userProfile/userProfileCarTab/actions";
import HcList from "../../HcList";
import { UserProfileAdminTabState } from "../../../redux/userProfile/userProfileAdminTab/types";
library.add(faTimes);


export interface UserProfileAdminParkingListProps extends Pick<UserProfileAdminTabState, 'parking_lots'> {
    // show_delete_car_modal: boolean,
    // toggleUserProfileCarModal: (show: boolean) => ToggleUserProfileCarModalAction,
    // onUserProfileAdminParkingChange: (id: number) => void,
    // onUserProfileCarDelete: (id: number) => DeleteUserProfileCarAction
}

class UserProfileAdminParkingList extends Component<UserProfileAdminParkingListProps> {

    public onDelete = (id: number) => {
        // this.props.onUserProfileCarDelete(id);
        // this.props.toggleUserProfileCarModal(true);
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
                {/* {this.props.show_delete_car_modal ? <UserProfileDeleteCarModal /> : null} */}
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({
        parking_lots: state.user_profile_tabs.user_profile_admin_tab.parking_lots
    }), {
        // toggleUserProfileCarModal: toggleUserProfileCarModal,
        onUserProfileAdminParkingChange: (id: number) => updateUserProfileCar(id),
        onUserProfileCarDelete: (id: number) => onUserProfileCarDelete(id)
    }
)(UserProfileAdminParkingList);

