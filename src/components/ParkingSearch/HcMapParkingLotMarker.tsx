import React, { FunctionComponent } from "react";
import { Marker } from 'react-map-gl';
import { ParkingLot } from "../../redux/parkingSearch/types";
import MarkerImg from "../../res/img/parking_lot_marker.svg";

export interface HcMapParkingLotMarkerProps {
    parking_lot: ParkingLot,
    onClick?: () => void,
    onMouseLeave?: () => void
}

const HcMapParkingLotMarker: FunctionComponent<HcMapParkingLotMarkerProps> = ({
    parking_lot,
    onClick,
    onMouseLeave
}) => {
    return (
        <Marker
            latitude={parking_lot.lat}
            longitude={parking_lot.lng}
            offsetTop={-20}
            offsetLeft={-20}
        >
            <div className='hc-tooltip' onClick={onClick} onMouseLeave={onMouseLeave}>
                <img src={MarkerImg} draggable={false} alt={parking_lot.label} />
                <span className='hc-tooltiptext'>{parking_lot.label}</span>
            </div>

        </Marker>
    );
};

export default HcMapParkingLotMarker;