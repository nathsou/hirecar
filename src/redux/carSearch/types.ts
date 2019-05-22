
export interface Car {
    id: number,
    model: string,
    nb_places: number,
    nb_doors: number,
    owner_id: number,
    gearbox_id: number,
    fuel_id: number,
    price_per_day: number
}

export interface CarSearchState {
    cars: Car[],
    fetching: boolean
}

export const defaultCarSearchState: CarSearchState = {
    cars: [],
    fetching: false
};

export const REQUEST_CARS = 'REQUEST_CARS';
export const CARS_RECEIVED = 'CARS_RECEIVED';

export interface RequestCarsAction {
    type: typeof REQUEST_CARS
}

export interface CarsReceivedAction {
    type: typeof CARS_RECEIVED,
    cars: Car[]
}

export type CarSearchActionTypes = RequestCarsAction | CarsReceivedAction;