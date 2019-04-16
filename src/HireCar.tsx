import React, { Component } from 'react';
import HcJumbotron from './components/HcJumbotron';
import HcNavbar from './components/HcNavbar';
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
          <Route exact path='/' component={HcJumbotron} />
          <Route exact path='/parking' component={HcParkingSearch} />
        </BrowserRouter>
      </Provider>
    );
  }
}
