import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import HcCarSearch from './components/CarSearch/HcCarSearch';
import HcNavbar from './components/HcNavbar';
import MainContent from './components/MainContent';
import HcParkingSearch from './components/ParkingSearch/HcParkingSearch';
import HcUserProfile from './components/UserProfile/HcUserProfile';
import { store } from './redux/configureStore';


export default class HireCar extends Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <HcNavbar />
          <Route exact path='/' component={MainContent} />
          <Route exact path='/parking/:airport?' component={HcParkingSearch} />
          <Route exact path='/voiture/:airport?' component={HcCarSearch} />
          <Route exact path='/profil' component={HcUserProfile} />
        </BrowserRouter>
      </Provider>
    );
  }
}
