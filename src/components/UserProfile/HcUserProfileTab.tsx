import React, { Component } from "react";
import UserProfileTabInfo from "./UserProfileTabInfo/UserProfileTabInfo";
import UserProfileTabCar from "./UserProfileTabCar/UserProfileTabCar";

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