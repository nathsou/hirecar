import React, { FunctionComponent } from "react";
import { Marker } from 'react-map-gl';
import { Parking } from "../../redux/parkingSearch/types";
import MarkerImg from "../../res/img/marker.png";

export interface HcMapMarkerProps {
    parking: Parking
}

const HcMapMarker: FunctionComponent<HcMapMarkerProps> = ({ parking }) => {
    return (
        <Marker
            latitude={parking.lat}
            longitude={parking.lng}
            offsetTop={-23}
            offsetLeft={-15}
        >
            <div className='hc-tooltip'>
                <img src={MarkerImg} draggable={false} alt={parking.label} />
                <span className='hc-tooltiptext'>{parking.label}</span>
            </div>

        </Marker>
    );
};

export default HcMapMarker;