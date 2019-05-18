import { HcMapViewportProps } from "../../components/HcParkingSearch";
import { UpdateMapViewportAction, UPDATE_MAP_VIEWPORT, RequestParkingsAction, REQUEST_PARKINGS, ParkingsReceivedAction, Parking, PARKINGS_RECEIVED, ParkingSearchActionTypes } from "./types";
import { Dispatch } from "redux";
import axios, { AxiosResponse } from 'axios';

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

//TODO: Handle request errors
export function fetchParkings() {
    return (dispatch: Dispatch<ParkingSearchActionTypes>) => {

        dispatch(requestParkings());
        axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/parking_lots?center_lat=47&center_lng=2&radius=300`)
            .then((res: AxiosResponse<string>) => {
                dispatch(parkingsReceived((res.data as any).airports as Parking[]))
            })
            .catch((reason: any) => {
                console.error(reason);
            });
    };
}