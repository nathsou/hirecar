import { CarRentalSearchActionTypes, CarSearchState, defaultCarSearchState, REQUEST_CAR_RENTALS, CAR_RENTALS_RECEIVED } from "./types";

export function carSearchReducer(
    state = defaultCarSearchState,
    action: CarRentalSearchActionTypes
): CarSearchState {

    switch (action.type) {
        case REQUEST_CAR_RENTALS:
            return {
                ...state,
                fetching: true
            };

        case CAR_RENTALS_RECEIVED:


            return {
                ...state,
                fetching: false,
                car_rentals: action.car_rentals
            };

        default:
            return state;
    }
}