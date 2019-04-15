import React, { Component } from 'react';
import HcPrimaryButton from './components/HcPrimaryButton';
import HcSecondaryButton from './components/HcSecondaryButton';

export default class HireCar extends Component {
  render() {
    return (
      ///@ts-ignore
      <div>
        <HcPrimaryButton>LOCATION DE PARKING</HcPrimaryButton>
        <HcPrimaryButton outlined='true'>LOCATION DE VOITURE</HcPrimaryButton>
        <HcSecondaryButton>CONNEXION</HcSecondaryButton>
      </div>
    );
  }
}
