import React, { FunctionComponent } from "react";
import ReactMapGL from 'react-map-gl';
import { ParkingSearchState } from "../../redux/parkingSearch/types";
import HcMapMarker from "./HcMapMarker";
import { HcMapViewportProps } from "./HcParkingSearch";

export interface HcMapProps extends Pick<ParkingSearchState, 'parkings'> {
    viewport: HcMapViewportProps,
    onViewportChange: (viewstate: HcMapViewportProps) => void
}

const HcMap: FunctionComponent<HcMapProps> = ({ viewport, onViewportChange, parkings }) => {
    return (
        <ReactMapGL
            className='hc-map'
            {...viewport}
            width='100%'
            height='100%'
            onViewportChange={vp => onViewportChange(vp as HcMapViewportProps)}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
            mapStyle='mapbox://styles/mapbox/streets-v11'
        >
            {parkings.map(p => <HcMapMarker key={p.id} parking={p} />)}
        </ReactMapGL>
    );
};

export default HcMap;