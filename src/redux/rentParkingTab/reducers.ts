import { AIRPORTS_RECEIVED, defaultRentParkingTabState, RentParkingTabActionTypes, RentParkingTabState, UPDATE_PARKING_SEARCH_INPUT } from "./types";

export function rentParkingTabReducer(
    state = defaultRentParkingTabState,
    action: RentParkingTabActionTypes
): RentParkingTabState {

    switch (action.type) {
        case UPDATE_PARKING_SEARCH_INPUT:
            return {
                ...state,
                parking_search_input_value: action.value
            };

        case AIRPORTS_RECEIVED:
            return {
                ...state,
                autocomplete_airports: action.airports
            };

        default:
            return state;
    }
}