import React, { Component } from 'react';

import HcNavbar from './components/HcNavbar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { BrowserRouter, Route } from 'react-router-dom';
import HcParkingSearch from './components/HcParkingSearch';


export default class HireCar extends Component {
  public render() {
    return (
      <Provider store={configureStore()}>
        <BrowserRouter>
          <HcNavbar />
          <MainContent />
          <Route exact path='/' component={MainContent} />
          <Route exact path='/parking' component={HcParkingSearch} />
          <Footer />
        </BrowserRouter>
      </Provider>
    );
  }
}
