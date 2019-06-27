import { CarRentalSearchActionTypes, CarSearchState, defaultCarSearchState, REQUEST_CAR_RENTALS, CAR_RENTALS_RECEIVED, REQUEST_PARKING_SPOT_RENTALS, PARKING_SPOT_RENTALS_RECEIVED, SET_RENT_MODAL_PARKING_SPOT } from "./types";

export function carSearchReducer(
    state = defaultCarSearchState,
    action: CarRentalSearchActionTypes
): CarSearchState {

    switch (action.type) {
        case REQUEST_CAR_RENTALS:
            return {
                ...state,
                fetching_cars: true
            };

        case CAR_RENTALS_RECEIVED:
            return {
                ...state,
                fetching_cars: false,
                car_rentals: action.car_rentals
            };

        case REQUEST_PARKING_SPOT_RENTALS:
            return {
                ...state,
                fetching_spots: true
            };

        case PARKING_SPOT_RENTALS_RECEIVED:
            return {
                ...state,
                fetching_spots: false,
                parking_spots: action.spots
            };

        case SET_RENT_MODAL_PARKING_SPOT:
            return {
                ...state,
                rent_modal_parking_spot_id: action.parking_spot
            };

        default:
            return state;
    }
}