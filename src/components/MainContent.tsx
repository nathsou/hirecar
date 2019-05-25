import React, { Component } from "react";
import HcJumbotron from './HcJumbotron';
import Records from './Records';
import Footer from '../components/Footer';

export default class MainContent extends Component {
    render() {
        return (
            <main>
                <HcJumbotron />
                <Records />
                <Footer />
            </main>
        );
    }
}