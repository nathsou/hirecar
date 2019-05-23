import React, { FunctionComponent } from "react";
import { Marker } from 'react-map-gl';
import { ParkingLot } from "../../redux/parkingSearch/types";
import MarkerImg from "../../res/img/marker.png";

export interface HcMapMarkerProps {
    parking_lot: ParkingLot
}

const HcMapMarker: FunctionComponent<HcMapMarkerProps> = ({ parking_lot }) => {
    return (
        <Marker
            latitude={parking_lot.lat}
            longitude={parking_lot.lng}
            offsetTop={-23}
            offsetLeft={-15}
        >
            <div className='hc-tooltip'>
                <img src={MarkerImg} draggable={false} alt={parking_lot.label} />
                <span className='hc-tooltiptext'>{parking_lot.label}</span>
            </div>

        </Marker>
    );
};

export default HcMapMarker;