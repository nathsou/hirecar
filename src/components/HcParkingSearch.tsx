import React, { Component } from "react";
import ReactMapGL from 'react-map-gl';
import HcList from "./HcList";

export default class HcParkingSearch extends Component {

    public state = {
        viewport: {
            width: '60%',
            height: '100vh',
            latitude: 47.3,
            longitude: 2.2,
            zoom: 4.8
        }
    };

    public render() {
        return (
            <main className='hc-rent-container'>
                <HcList />

                <ReactMapGL
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({ viewport })}
                    mapboxApiAccessToken='pk.eyJ1IjoibmF0aHNvdTMiLCJhIjoiY2p1cHVpN24wMWxrZTQ0bzhrdDN3MHd2aCJ9.X2KA-7edhC_vD3veUEssgA'
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                />
            </main>
        );
    }
}