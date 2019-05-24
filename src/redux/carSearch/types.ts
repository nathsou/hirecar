import { ParkingLot } from "../parkingSearch/types";

export interface Car {
    id: number;
    model: string;
    seats: number;
    doors: number;
    owner_id: number;
    price_per_day?: number;
    gearbox: Gearbox;
    fuel: Fuel;
}

export interface CarRental {
    id: number;
    start_date: string;
    end_date: string;
    user_id: number;
    parking_spot: ParkingSpot;
}

export interface ParkingSpot {
    id: number;
    start_date: string;
    end_date: string;
    car: Car;
    parking_lot: ParkingLot;
}

export interface IdentifiedType {
    id: number,
    type: string
}

export type Gearbox = IdentifiedType;
export type Fuel = IdentifiedType;

export interface CarSearchState {
    car_rentals: CarRental[],
    fetching: boolean
}

export const defaultCarSearchState: CarSearchState = {
    car_rentals: [],
    fetching: false
};

export const REQUEST_CAR_RENTALS = 'REQUEST_CAR_RENTALS';
export const CAR_RENTALS_RECEIVED = 'CAR_RENTALSS_RECEIVED';

export interface RequestCarRentalsAction {
    type: typeof REQUEST_CAR_RENTALS
}

export interface CarRentalsReceivedAction {
    type: typeof CAR_RENTALS_RECEIVED,
    car_rentals: CarRental[]
}

export type CarRentalSearchActionTypes = RequestCarRentalsAction | CarRentalsReceivedAction;