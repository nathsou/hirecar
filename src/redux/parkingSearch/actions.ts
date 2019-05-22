import { HcMapViewportProps } from "../../components/HcParkingSearch";
import { UpdateMapViewportAction, UPDATE_MAP_VIEWPORT, RequestParkingsAction, REQUEST_PARKINGS, ParkingsReceivedAction, Parking, PARKINGS_RECEIVED, ParkingSearchActionTypes } from "./types";
import { Dispatch } from "redux";
import axios, { AxiosResponse, AxiosError } from 'axios';
import { propsToURIParams } from "../../Utils";

export function updateViewport(viewport: HcMapViewportProps): UpdateMapViewportAction {
    return {
        type: UPDATE_MAP_VIEWPORT,
        viewport
    };
}

export function requestParkings(): RequestParkingsAction {
    return {
        type: REQUEST_PARKINGS
    };
}

export function parkingsReceived(parkings: Parking[]): ParkingsReceivedAction {
    return {
        type: PARKINGS_RECEIVED,
        parkings: parkings
    };
}

export interface ParkingSearchParams {
    airport_name?: string
}

//TODO: Handle request errors
export function fetchParkings(params: ParkingSearchParams) {
    return (dispatch: Dispatch<ParkingSearchActionTypes>) => {

        dispatch(requestParkings());
        axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/parking_lots${propsToURIParams(params)}`)
            .then((res: AxiosResponse) => {
                const parkings = (res.data).airports as { [P in keyof Parking]: string }[];

                const parsed_parkings: Parking[] = parkings.map(p => {
                    const parking: Parking = {
                        id: parseInt(p.id),
                        label: p.label,
                        lat: parseFloat(p.lat),
                        lng: parseFloat(p.lng),
                        price_per_day: parseFloat(p.price_per_day),
                        airport_id: parseInt(p.airport_id),
                        parking_lot_id: parseInt(p.parking_lot_id),
                        nb_places: parseInt(p.nb_places)
                    };

                    return parking;
                });

                dispatch(parkingsReceived(parsed_parkings));
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    };
}