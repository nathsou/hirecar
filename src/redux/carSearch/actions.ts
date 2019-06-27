import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { parseCarRental, propsToURIParams, RawCarRental, resToJSON, parseParkingSpot, RawParkingSpot } from "../../Utils";
import { CarRental, CarRentalSearchActionTypes, CarRentalsReceivedAction, CAR_RENTALS_RECEIVED, RequestCarRentalsAction, REQUEST_CAR_RENTALS, REQUEST_PARKING_SPOT_RENTALS, RequestParkingSpotRentalsAction, ParkingSpot, ParkingSpotRentalsReceivedAction, PARKING_SPOT_RENTALS_RECEIVED, SetRentModalParkingSpotAction, SET_RENT_MODAL_PARKING_SPOT, RentCarRequestSentAction, INSERT_CAR_RENTAL_REQUEST_SENT, INSERT_CAR_RENTAL_REQUEST_SUCCEEDED, RentCarRequestSucceededAction, RentCarRequestFailedAction, INSERT_CAR_RENTAL_REQUEST_FAILED } from "./types";
import throttle from "lodash.throttle";
import { MIN_API_CALL_DELAY } from "../..";

export function requestCars(): RequestCarRentalsAction {
    return {
        type: REQUEST_CAR_RENTALS
    };
}

export function requestParkingSpotRentals(): RequestParkingSpotRentalsAction {
    return {
        type: REQUEST_PARKING_SPOT_RENTALS
    };
}

export function carRentalsReceived(car_rentals: CarRental[]): CarRentalsReceivedAction {
    return {
        type: CAR_RENTALS_RECEIVED,
        car_rentals: car_rentals
    };
}

export function parkingSpotRentalsReceived(spots: ParkingSpot[]): ParkingSpotRentalsReceivedAction {
    return {
        type: PARKING_SPOT_RENTALS_RECEIVED,
        spots
    };
}

export function setRentModalParkingSpot(parking_spot: number | null): SetRentModalParkingSpotAction {
    return {
        type: SET_RENT_MODAL_PARKING_SPOT,
        parking_spot
    };
}

export function rentCarRequestSent(): RentCarRequestSentAction {
    return {
        type: INSERT_CAR_RENTAL_REQUEST_SENT
    };
}

export function rentCarRequestSucceeded(id: number): RentCarRequestSucceededAction {
    return {
        type: INSERT_CAR_RENTAL_REQUEST_SUCCEEDED,
        parking_spot_rental_id: id
    };
}


export function rentCarRequestFailed(): RentCarRequestFailedAction {
    return {
        type: INSERT_CAR_RENTAL_REQUEST_FAILED
    };
}

export interface CarSearchParams {
    airport_name: string | null,
    start_date?: string | null,
    end_date?: string | null
}

//TODO: Handle request errors
export const fetchCars = throttle((params: CarSearchParams) => {
    return (dispatch: Dispatch<CarRentalSearchActionTypes>) => {

        dispatch(requestCars());
        axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/car_rentals${propsToURIParams(params)}`)
            .then((res: AxiosResponse) => {
                const car_rentals = resToJSON(res).car_rentals as RawCarRental[];
                const parsed_car_rentals = car_rentals.map(parseCarRental);

                dispatch(carRentalsReceived(parsed_car_rentals));
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    };
}, MIN_API_CALL_DELAY);

export interface ParkingSpotSearchParams {
    airport_name: string | null,
    start_date?: string | null,
    end_date?: string | null
}

export const fetchParkingSpots = throttle((params: ParkingSpotSearchParams) => {
    return (dispatch: Dispatch<CarRentalSearchActionTypes>) => {

        dispatch(requestCars());
        axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/parking_spot_rentals${propsToURIParams(params)}`)
            .then((res: AxiosResponse) => {
                const spots = resToJSON(res).parking_spot_rentals as RawParkingSpot[];
                const parsed_spots = spots.map(parseParkingSpot);

                dispatch(parkingSpotRentalsReceived(parsed_spots));
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    };
}, MIN_API_CALL_DELAY);

export interface CarRentalRequestData {
    parking_lot_id: number,
    car_id: number,
    start_date: string,
    end_date: string,
    firstname: string,
    lastname: string,
    email: string,
}

export const sendRentCarRequest = throttle((data: CarRentalRequestData) => {
    return async (dispatch: Dispatch<CarRentalSearchActionTypes>) => {
        dispatch(rentCarRequestSent());

        const uri = `${process.env.REACT_APP_HIRECAR_API_URI}/car_rentals`;

        try {
            const res = await axios.post(uri, data);
            const id = res.data.id as number;
            dispatch(rentCarRequestSucceeded(id));
        } catch {
            dispatch(rentCarRequestFailed());
        }
    };

}, MIN_API_CALL_DELAY);