import React, { Component } from "react";
import HcJumbotron from './HcJumbotron';
import Records from './Records';
import Footer from '../components/Footer';

export default class MainContent extends Component {
    render() {
        return (
            <div>
                <main>
                    <HcJumbotron />
                    <Records />
                </main>
                <Footer />
            </div>
        );
    }
}