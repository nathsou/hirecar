import React from 'react';
import ReactDOM from 'react-dom';
import HireCar from './HireCar';
import * as serviceWorker from './serviceWorker';
import 'bootstrap-css-only/css/bootstrap.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './res/styles/hirecar.css';
import Axios, { AxiosResponse } from 'axios';


ReactDOM.render(<HireCar />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const req = {
    "email": "mlle.zhang.nathalie@gmail.com",
    "firstname": "Zhang",
    "lastname": "Nathalie",
    "password": "$2a$10$5p/XjRv1Kw9OIqzg4t186eV1UxpYxFTyXR4KZmABZaxV/.QlAscNe",
    "phone": "0651165064"
};

Axios.post(`${process.env.REACT_APP_HIRECAR_API_URI}/users`, req)
    .then(function (res: AxiosResponse<string>) {
        console.log(res);
    }).catch((reason: any) => {
        console.error(reason);
    });