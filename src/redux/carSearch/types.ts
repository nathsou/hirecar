import { ParkingLot } from "../parkingSearch/types";

export interface Car {
    id: number;
    model: string;
    seats: number;
    doors: number;
    owner_id: number;
    price_per_day: number;
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
    parking_spots: ParkingSpot[],
    fetching_cars: boolean,
    fetching_spots: boolean,
    rent_modal_parking_spot_id: number | null,
}

export const defaultCarSearchState: CarSearchState = {
    car_rentals: [],
    parking_spots: [],
    fetching_cars: false,
    fetching_spots: false,
    rent_modal_parking_spot_id: null
};

export const REQUEST_CAR_RENTALS = 'REQUEST_CAR_RENTALS';
export const CAR_RENTALS_RECEIVED = 'CAR_RENTALS_RECEIVED';
export const REQUEST_PARKING_SPOT_RENTALS = 'REQUEST_PARKING_SPOT_RENTALS';
export const PARKING_SPOT_RENTALS_RECEIVED = 'PARKING_SPOT_RENTALS_RECEIVED';
export const SET_RENT_MODAL_PARKING_SPOT = 'SET_RENT_MODAL_PARKING_SPOT';
export const INSERT_CAR_RENTAL = 'INSERT_CAR_RENTAL';
export const INSERT_CAR_RENTAL_REQUEST_SENT = 'INSERT_CAR_RENTAL_REQUEST_SENT';
export const INSERT_CAR_RENTAL_REQUEST_SUCCEEDED = 'INSERT_CAR_RENTAL_REQUEST_SUCCEEDED';
export const INSERT_CAR_RENTAL_REQUEST_FAILED = 'INSERT_CAR_RENTAL_REQUEST_FAILED';

export interface RequestCarRentalsAction {
    type: typeof REQUEST_CAR_RENTALS
}

export interface RequestParkingSpotRentalsAction {
    type: typeof REQUEST_PARKING_SPOT_RENTALS
}

export interface CarRentalsReceivedAction {
    type: typeof CAR_RENTALS_RECEIVED,
    car_rentals: CarRental[]
}

export interface ParkingSpotRentalsReceivedAction {
    type: typeof PARKING_SPOT_RENTALS_RECEIVED,
    spots: ParkingSpot[]
}

export interface SetRentModalParkingSpotAction {
    type: typeof SET_RENT_MODAL_PARKING_SPOT,
    parking_spot: number | null
}

export interface RentCarRequestSentAction {
    type: typeof INSERT_CAR_RENTAL_REQUEST_SENT
}

export interface RentCarRequestSucceededAction {
    type: typeof INSERT_CAR_RENTAL_REQUEST_SUCCEEDED,
    parking_spot_rental_id: number
}

export interface RentCarRequestFailedAction {
    type: typeof INSERT_CAR_RENTAL_REQUEST_FAILED
}


export type CarRentalSearchActionTypes =
    RequestCarRentalsAction |
    ParkingSpotRentalsReceivedAction |
    CarRentalsReceivedAction |
    RequestParkingSpotRentalsAction |
    SetRentModalParkingSpotAction |
    RentCarRequestSentAction |
    RentCarRequestSucceededAction |
    RentCarRequestFailedAction;