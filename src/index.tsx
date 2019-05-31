import 'bootstrap-css-only/css/bootstrap.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import ReactDOM from 'react-dom';
import HireCar from './HireCar';
import './res/styles/hirecar.css';
import * as serviceWorker from './serviceWorker';

export const MIN_API_CALL_DELAY = parseInt(process.env.REACT_APP_MIN_API_CALL_DELAY as string);

ReactDOM.render(<HireCar />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();