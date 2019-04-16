import React, { Component } from 'react';
import HcJumbotron from './components/HcJumbotron';
import HcNavbar from './components/HcNavbar';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

export default class HireCar extends Component {
  public render() {
    return (

      <Provider store={configureStore()}>
        {/* <HcPrimaryButton>LOCATION DE PARKING</HcPrimaryButton>
        <HcPrimaryButton outlined='true'>LOCATION DE VOITURE</HcPrimaryButton>*/}
        <HcNavbar />
        <HcJumbotron />
      </Provider>
    );
  }
}
