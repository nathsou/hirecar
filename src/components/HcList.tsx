import React, { Component } from "react";
import HcListItem from "../HcListItem";

export default class HcList extends Component {

    public render() {
        return (
            <div className='hc-list'>
                <HcListItem />
                <HcListItem />
                <HcListItem />
                <HcListItem />
            </div>
        );
    }
}