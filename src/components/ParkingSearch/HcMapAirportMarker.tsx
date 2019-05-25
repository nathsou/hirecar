import React, { FunctionComponent } from "react";
import { Marker } from 'react-map-gl';
import { Airport } from "../../redux/rentParkingTab/types";
import MarkerImg from "../../res/img/airport_marker.svg";

export interface HcMapParkingLotMarkerProps {
    airport: Airport,
    onClick?: () => void
}

const HcMapAirportLotMarker: FunctionComponent<HcMapParkingLotMarkerProps> = ({ airport, onClick }) => {
    return (
        <Marker
            latitude={airport.lat}
            longitude={airport.lng}
            offsetTop={-20}
            offsetLeft={-20}
        >
            <div className='hc-tooltip' onClick={onClick}>
                <img src={MarkerImg} draggable={false} alt={airport.name} />
                <span className='hc-tooltiptext'>{airport.name}</span>
            </div>

        </Marker>
    );
};

export default HcMapAirportLotMarker;