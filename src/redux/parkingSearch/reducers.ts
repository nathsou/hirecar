import { defaultParkingSearchState, ParkingSearchActionTypes, ParkingSearchState, PARKINGS_RECEIVED, REQUEST_PARKINGS, UPDATE_MAP_VIEWPORT } from "./types";

export function parkingSearchReducer(
    state = defaultParkingSearchState,
    action: ParkingSearchActionTypes
): ParkingSearchState {

    switch (action.type) {
        case UPDATE_MAP_VIEWPORT:
            return {
                ...state,
                viewport: action.viewport
            };

        case REQUEST_PARKINGS:
            return {
                ...state,
                fetching: true
            };

        case PARKINGS_RECEIVED:


            return {
                ...state,
                fetching: false,
                parkings: action.parkings.sort((a, b) => b.airport_id - a.airport_id)
            };
        default:
            return state;
    }
}