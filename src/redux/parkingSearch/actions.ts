import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from "redux";
import { HcMapViewportProps } from "../../components/ParkingSearch/HcParkingSearch";
import { parseAirport, parseParkingLot, propsToURIParams, RawAirport, RawParkingLot } from "../../Utils";
import { Airport } from "../rentParkingTab/types";
import { AIRPORTS_RECEIVED, ParkingLot, ParkingSearchActionTypes, ParkingsReceivedAction, PARKINGS_RECEIVED, RequestAirportsAction, RequestParkingsAction, REQUEST_AIRPORTS, REQUEST_PARKINGS, SetSelectedParkingLotAction, SET_SELECTED_PARKING_LOT, UpdateMapViewportAction, UPDATE_MAP_VIEWPORT, AirportsReceivedAction } from "./types";

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

export function requestAirports(): RequestAirportsAction {
    return {
        type: REQUEST_AIRPORTS
    };
}

export function parkingsReceived(parking_lots: ParkingLot[]): ParkingsReceivedAction {
    return {
        type: PARKINGS_RECEIVED,
        parking_lots
    };
}

export function airportsReceived(airports: Airport[]): AirportsReceivedAction {
    return {
        type: AIRPORTS_RECEIVED,
        airports
    };
}

export function setSelectedParkingLot(parking_lot: number | null): SetSelectedParkingLotAction {
    return {
        type: SET_SELECTED_PARKING_LOT,
        parking_lot
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

export interface AirportSearchParams {
    name: string
}

export function fetchAirports(params: AirportSearchParams) {
    return (dispatch: Dispatch<ParkingSearchActionTypes>) => {

        dispatch(requestAirports());
        axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/airports${propsToURIParams(params)}`)
            .then((res: AxiosResponse) => {
                const airports = (res.data).airports as RawAirport[];
                const parsed_airports = airports.map(parseAirport);

                dispatch(airportsReceived(parsed_airports));
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    };
}