import React, { Component } from "react";
import UserProfileTabInfo from "./UserProfileInfoTab/UserProfileTabInfo";
import UserProfileTabCar from "./UserProfileCarTab/UserProfileTabCar";

export default class HcUserProfileTab extends Component {

    public render() {
        return (
            <div>
                <UserProfileTabInfo />
                <UserProfileTabCar />
            </div>
        )
    }
}