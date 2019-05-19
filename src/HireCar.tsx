import React, { Component } from 'react';

import HcNavbar from './components/HcNavbar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { BrowserRouter, Route } from 'react-router-dom';
import HcParkingSearch from './components/HcParkingSearch';
import HcCarSearch from './components/HcCarSearch';

export default class HireCar extends Component {
  public render() {
    return (
      <Provider store={configureStore()}>
        <BrowserRouter>
          <HcNavbar />
          <Route exact path='/' component={MainContent} />
          <Route exact path='/parking/:airport' component={HcParkingSearch} />
          <Route exact path='/voiture' component={HcCarSearch} />
          <Footer />
        </BrowserRouter>
      </Provider>
    );
  }
}
