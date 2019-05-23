import { CarSearchState, defaultCarSearchState, CarSearchActionTypes, REQUEST_CARS, CARS_RECEIVED } from "./types";

export function carSearchReducer(
    state = defaultCarSearchState,
    action: CarSearchActionTypes
): CarSearchState {

    switch (action.type) {
        case REQUEST_CARS:
            return {
                ...state,
                fetching: true
            };

        case CARS_RECEIVED:


            return {
                ...state,
                fetching: false,
                cars: action.cars
            };

        default:
            return state;
    }
}