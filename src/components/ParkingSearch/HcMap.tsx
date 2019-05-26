import React, { FunctionComponent } from "react";
import ReactMapGL from 'react-map-gl';
import { ParkingSearchState } from "../../redux/parkingSearch/types";
import HcMapAirportLotMarker from "./HcMapAirportMarker";
import HcMapParkingLotMarker from "./HcMapParkingLotMarker";
import { HcMapViewportProps } from "./HcParkingSearch";

export interface HcMapProps extends Pick<ParkingSearchState, 'parking_lots' | 'airports'> {
    viewport: HcMapViewportProps,
    onViewportChange: (viewstate: HcMapViewportProps) => void,
    onParkingLotMarkerClick: (id: number | null) => void,
    onAirportMarkerClick: (id: number) => void
}

const HcMap: FunctionComponent<HcMapProps> = ({
    viewport,
    onViewportChange,
    airports,
    parking_lots,
    onParkingLotMarkerClick,
    onAirportMarkerClick
}) => {
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
            {parking_lots.map(p =>
                <HcMapParkingLotMarker
                    onClick={() => onParkingLotMarkerClick(p.id)}
                    onMouseLeave={() => onParkingLotMarkerClick(null)}
                    key={p.id}
                    parking_lot={p}
                />
            )}

            {airports.map(a =>
                <HcMapAirportLotMarker
                    onClick={() => onAirportMarkerClick(a.id)}
                    key={a.id}
                    airport={a}
                />
            )}
        </ReactMapGL>
    );
};

export default HcMap;