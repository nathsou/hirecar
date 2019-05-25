import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/Footer';
import HcCarSearch from './components/CarSearch/HcCarSearch';
import HcNavbar from './components/HcNavbar';
import HcParkingSearch from './components/ParkingSearch/HcParkingSearch';
import MainContent from './components/MainContent';
import { store } from './redux/configureStore';
import HcUserProfile from './components/UserProfile/HcUserProfile';

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
          <Footer />
        </BrowserRouter>
      </Provider>
    );
  }
}
