import React, { Component } from "react";
import HcJumbotron from './HcJumbotron';
import Records from './Records';

export default class MainContent extends Component {
    render() {
        return (
            <main>
                <HcJumbotron />
                <Records />
            </main>
        );
    }
}