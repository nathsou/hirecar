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

export function parkingsReceived(parkings: string): ParkingsReceivedAction {
    return {
        type: PARKINGS_RECEIVED,
        parkings: JSON.parse(parkings).airports as Parking[]
    };
}

//TODO: Handle request errors
export function fetchParkings() {
    return (dispatch: Dispatch<ParkingSearchActionTypes>) => {

        dispatch(requestParkings());

        axios.get(
            `http://localhost:8000/parking_lots?center_lat=47&center_lng=2&radius=300`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                ///@ts-ignore
                crossdomain: true
            }
        )
            .then((res: AxiosResponse<string>) => {
                console.log(res);
                dispatch(parkingsReceived(res.data))
            });
        // .catch((reason) => {

        // });
    };
}