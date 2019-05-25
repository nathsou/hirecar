import { defaultParkingSearchState, ParkingSearchActionTypes, ParkingSearchState, PARKINGS_RECEIVED, REQUEST_PARKINGS, UPDATE_MAP_VIEWPORT, SET_SELECTED_PARKING_LOT, REQUEST_AIRPORTS, AIRPORTS_RECEIVED } from "./types";

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
                fetching_parking_lots: true
            };

        case REQUEST_AIRPORTS:
            return {
                ...state,
                fetching_airports: true
            };

        case PARKINGS_RECEIVED:
            return {
                ...state,
                fetching_parking_lots: false,
                parking_lots: action.parking_lots
            };

        case AIRPORTS_RECEIVED:
            return {
                ...state,
                fetching_airports: false,
                airports: action.airports
            };

        case SET_SELECTED_PARKING_LOT:
            return {
                ...state,
                selected_parking_lot: action.parking_lot
            };

        default:
            return state;
    }
}