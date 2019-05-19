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
                dispatch(parkingsReceived((res.data).airports as Parking[]))
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    };
}