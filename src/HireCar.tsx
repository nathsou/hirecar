import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/Footer';
import HcCarSearch from './components/HcCarSearch';
import HcNavbar from './components/HcNavbar';
import HcParkingSearch from './components/HcParkingSearch';
import MainContent from './components/MainContent';
import { store } from './redux/configureStore';


export default class HireCar extends Component {
  public render() {
    return (
      <Provider store={store}>
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
