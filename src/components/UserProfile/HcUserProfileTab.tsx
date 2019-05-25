import React, { Component } from "react";
import UserProfileInfoTab from "./Form/UserProfileInfoTab";
import UserProfileCarTab from "./Form/UserProfileCarTab";

export default class HcUserProfileTab extends Component {

    public render() {
        return (
            <div>
                <UserProfileInfoTab />
                <UserProfileCarTab />
            </div>
        )
    }
}