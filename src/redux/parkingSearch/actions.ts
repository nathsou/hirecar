import axios, { AxiosError, AxiosResponse } from 'axios';
import throttle from "lodash.throttle";
import { Dispatch } from "redux";
import { MIN_API_CALL_DELAY } from '../..';
import { HcMapViewportProps } from "../../components/ParkingSearch/HcParkingSearch";
import { parseAirport, parseParkingLot, propsToURIParams, RawAirport, RawParkingLot } from "../../Utils";
import { Airport } from "../rentParkingTab/types";
import { AirportsReceivedAction, AIRPORTS_RECEIVED, ParkingLot, ParkingSearchActionTypes, ParkingsReceivedAction, PARKINGS_RECEIVED, RentParkingSpotRequestFailedAction, RentParkingSpotRequestSentAction, RentParkingSpotRequestSucceededAction, RENT_PARKING_SPOT_REQUEST_FAILED, RENT_PARKING_SPOT_REQUEST_SENT, RENT_PARKING_SPOT_REQUEST_SUCCEEDED, RequestAirportsAction, RequestParkingsAction, REQUEST_AIRPORTS, REQUEST_PARKINGS, SetRentModalParkingLotAction, SetRentParkingSpotUserCarIdAction, SetSelectedParkingLotAction, SET_RENT_MODAL_PARKING_LOT, SET_RENT_PARKING_SPOT_USER_CAR_IDX, SET_SELECTED_PARKING_LOT, UpdateMapViewportAction, UPDATE_MAP_VIEWPORT } from "./types";

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

export function setRentModalParkingLot(parking_spot: number | null): SetRentModalParkingLotAction {
    return {
        type: SET_RENT_MODAL_PARKING_LOT,
        parking_lot: parking_spot
    };
}

export function setRentParkingSpotUserCarId(id: number): SetRentParkingSpotUserCarIdAction {
    return {
        type: SET_RENT_PARKING_SPOT_USER_CAR_IDX,
        id: id
    };
}

export function rentParkingSpotRequestSent(): RentParkingSpotRequestSentAction {
    return {
        type: RENT_PARKING_SPOT_REQUEST_SENT
    };
}

export function rentParkingSpotRequestSucceeded(id: number): RentParkingSpotRequestSucceededAction {
    return {
        type: RENT_PARKING_SPOT_REQUEST_SUCCEEDED,
        parking_spot_rental_id: id
    };
}


export function rentParkingSpotRequestFailed(): RentParkingSpotRequestFailedAction {
    return {
        type: RENT_PARKING_SPOT_REQUEST_FAILED
    };
}

export interface ParkingSpotRentalRequestData {
    parking_lot_id: number,
    car_id: number,
    start_date: string,
    end_date: string
}

export const sendRentParkingSpotRequest = throttle((data: ParkingSpotRentalRequestData) => {
    return async (dispatch: Dispatch<ParkingSearchActionTypes>) => {
        dispatch(rentParkingSpotRequestSent());

        const uri = `${process.env.REACT_APP_HIRECAR_API_URI}/parking_spot_rentals`;

        try {
            const res = await axios.post(uri, data);
            const id = res.data.id as number;
            dispatch(rentParkingSpotRequestSucceeded(id));
        } catch {
            dispatch(rentParkingSpotRequestFailed());
        }
    };

}, MIN_API_CALL_DELAY);

export interface ParkingSearchParams {
    airport_name?: string
}

//TODO: Handle request errors
export const fetchParkings = throttle((params: ParkingSearchParams) => {
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
}, MIN_API_CALL_DELAY);

export interface AirportSearchParams {
    name: string
}

export const fetchAirports = throttle((params: AirportSearchParams) => {
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
}, MIN_API_CALL_DELAY);