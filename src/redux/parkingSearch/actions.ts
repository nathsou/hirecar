import { HcMapViewportProps } from "../../components/ParkingSearch/HcParkingSearch";
import { UpdateMapViewportAction, UPDATE_MAP_VIEWPORT, RequestParkingsAction, REQUEST_PARKINGS, ParkingsReceivedAction, PARKINGS_RECEIVED, ParkingSearchActionTypes, ParkingLot } from "./types";
import { Dispatch } from "redux";
import axios, { AxiosResponse, AxiosError } from 'axios';
import { propsToURIParams, parseParkingLot, RawParkingLot } from "../../Utils";

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

export function parkingsReceived(parkings: ParkingLot[]): ParkingsReceivedAction {
    return {
        type: PARKINGS_RECEIVED,
        parkings_lots: parkings
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
                const parkings = (res.data).parking_lots as RawParkingLot[];
                const parsed_parkings = parkings.map(parseParkingLot);

                dispatch(parkingsReceived(parsed_parkings));
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    };
}