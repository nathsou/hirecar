import { defaultRentCarTabState, RentCarTabActionTypes, RentCarTabState, SET_RENT_CAR_SEARCH_END_DAY, SET_RENT_CAR_SEARCH_END_TIME, SET_RENT_CAR_SEARCH_INPUT, SET_RENT_CAR_SEARCH_START_DAY, SET_RENT_CAR_SEARCH_START_TIME } from "./types";


export function rentCarTabReducer(
    state = defaultRentCarTabState,
    action: RentCarTabActionTypes
): RentCarTabState {

    switch (action.type) {
        case SET_RENT_CAR_SEARCH_INPUT:
            return {
                ...state,
                car_search_input_value: action.value
            };

        case SET_RENT_CAR_SEARCH_START_DAY:
            return {
                ...state,
                start_day: action.day
            };

        case SET_RENT_CAR_SEARCH_END_DAY:
            return {
                ...state,
                end_day: action.day
            };

        case SET_RENT_CAR_SEARCH_START_TIME:
            return {
                ...state,
                start_time: action.time
            };

        case SET_RENT_CAR_SEARCH_END_TIME:
            return {
                ...state,
                end_time: action.time
            };

        default:
            return state;
    }

}