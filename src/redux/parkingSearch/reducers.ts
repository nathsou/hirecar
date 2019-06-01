import { AIRPORTS_RECEIVED, defaultParkingSearchState, ParkingSearchActionTypes, ParkingSearchState, PARKINGS_RECEIVED, RENT_PARKING_SPOT_REQUEST_SUCCEEDED, REQUEST_AIRPORTS, REQUEST_PARKINGS, SET_RENT_MODAL_PARKING_LOT, SET_RENT_PARKING_SPOT_USER_CAR_IDX, SET_SELECTED_PARKING_LOT, UPDATE_MAP_VIEWPORT } from "./types";

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

        case SET_RENT_MODAL_PARKING_LOT:
            return {
                ...state,
                rent_modal_parking_lot_id: action.parking_lot
            };

        case SET_RENT_PARKING_SPOT_USER_CAR_IDX:
            return {
                ...state,
                selected_user_car_id: action.id
            };

        case RENT_PARKING_SPOT_REQUEST_SUCCEEDED:
            return {
                ...state,
                parking_spot_rental_id: action.parking_spot_rental_id
            };

        default:
            return state;
    }
}