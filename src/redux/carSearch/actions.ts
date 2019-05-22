import { RequestCarsAction, REQUEST_CARS, CarsReceivedAction, Car, CARS_RECEIVED, CarSearchActionTypes } from "./types";
import { propsToURIParams } from "../../Utils";
import { Dispatch } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

export function requestCars(): RequestCarsAction {
    return {
        type: REQUEST_CARS
    };
}

export function carsReceived(cars: Car[]): CarsReceivedAction {
    return {
        type: CARS_RECEIVED,
        cars
    };
}

export interface CarSearchParams {
    airport_name?: string
}

//TODO: Handle request errors
export function fetchCars(params: CarSearchParams) {
    return (dispatch: Dispatch<CarSearchActionTypes>) => {

        dispatch(requestCars());
        axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/cars${propsToURIParams(params)}`)
            .then((res: AxiosResponse) => {
                const cars = (res.data).cars as { [P in keyof Car]: string }[];

                const parsed_cars: Car[] = cars.map(c => {
                    const car: Car = {
                        id: parseInt(c.id),
                        model: c.model,
                        nb_places: parseInt(c.nb_places),
                        nb_doors: parseInt(c.nb_doors),
                        owner_id: parseInt(c.owner_id),
                        gearbox_id: parseInt(c.gearbox_id),
                        fuel_id: parseInt(c.fuel_id),
                        price_per_day: parseInt(c.price_per_day)
                    };

                    return car;
                });

                dispatch(carsReceived(parsed_cars));
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    };
}