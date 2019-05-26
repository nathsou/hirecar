import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { parseCarRental, propsToURIParams, RawCarRental } from "../../Utils";
import { CarRental, CarRentalSearchActionTypes, CarRentalsReceivedAction, CAR_RENTALS_RECEIVED, RequestCarRentalsAction, REQUEST_CAR_RENTALS } from "./types";

export function requestCars(): RequestCarRentalsAction {
    return {
        type: REQUEST_CAR_RENTALS
    };
}

export function carRentalsReceived(car_rentals: CarRental[]): CarRentalsReceivedAction {
    return {
        type: CAR_RENTALS_RECEIVED,
        car_rentals: car_rentals
    };
}

export interface CarSearchParams {
    airport_name: string | null,
    start_date?: string | null,
    end_date?: string | null
}

//TODO: Handle request errors
export function fetchCars(params: CarSearchParams) {
    return (dispatch: Dispatch<CarRentalSearchActionTypes>) => {

        dispatch(requestCars());
        axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/car_rentals${propsToURIParams(params)}`)
            .then((res: AxiosResponse) => {
                const car_rentals = (res.data).car_rentals as RawCarRental[];
                const parsed_car_rentals = car_rentals.map(parseCarRental);

                dispatch(carRentalsReceived(parsed_car_rentals));
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    };
}