import React, { Component } from 'react';

import HcNavbar from './components/HcNavbar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';


export default class HireCar extends Component {
  public render() {
    return (
      <Provider store={configureStore()}>
        {/* <HcPrimaryButton>LOCATION DE PARKING</HcPrimaryButton>
        <HcPrimaryButton outlined='true'>LOCATION DE VOITURE</HcPrimaryButton>*/}
        <HcNavbar />
        <MainContent />
        <Footer />
      </Provider>
    );
  }
}
