import { defaultRentParkingTabState, RentParkingTabActionTypes, RentParkingTabState, SET_RENT_PARKING_SPOT_SEARCH_INPUT, SET_RENT_PARKING_SPOT_SEARCH_START_DAY, SET_RENT_PARKING_SPOT_SEARCH_END_DAY, SET_RENT_PARKING_SPOT_SEARCH_START_TIME, SET_RENT_PARKING_SPOT_SEARCH_END_TIME } from "./types";

export function rentParkingTabReducer(
    state = defaultRentParkingTabState,
    action: RentParkingTabActionTypes
): RentParkingTabState {

    switch (action.type) {
        case SET_RENT_PARKING_SPOT_SEARCH_INPUT:
            return {
                ...state,
                parking_search_input_value: action.value
            };

        case SET_RENT_PARKING_SPOT_SEARCH_START_DAY:
            return {
                ...state,
                start_day: action.day
            };

        case SET_RENT_PARKING_SPOT_SEARCH_END_DAY:
            return {
                ...state,
                end_day: action.day
            };

        case SET_RENT_PARKING_SPOT_SEARCH_START_TIME:
            return {
                ...state,
                start_time: action.time
            };

        case SET_RENT_PARKING_SPOT_SEARCH_END_TIME:
            return {
                ...state,
                end_time: action.time
            };

        default:
            return state;
    }
}