import React, { Component } from "react";
import UserProfileTabInfo from "./Form/UserProfileTabInfo";
import UserProfileTabCar from "./Form/UserProfileTabCar";

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