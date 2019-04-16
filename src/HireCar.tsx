import React, { Component } from 'react';
import HcPrimaryButton from './components/HcPrimaryButton';
import HcSecondaryButton from './components/HcSecondaryButton';
import HcNavbar from './components/HcNavbar';
import HcJumbotron from './components/HcJumbotron';

export default class HireCar extends Component {
  render() {
    return (

      <div>
        {/* <HcPrimaryButton>LOCATION DE PARKING</HcPrimaryButton>
        <HcPrimaryButton outlined='true'>LOCATION DE VOITURE</HcPrimaryButton>*/}
        <HcNavbar />
        <HcJumbotron />
      </div>
    );
  }
}
