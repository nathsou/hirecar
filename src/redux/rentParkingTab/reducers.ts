import { defaultRentParkingTabState, RentParkingTabState, UpdateParkingSearchAction, UPDATE_PARKING_SEARCH_INPUT } from "./types";

export function rentParkingTabReducer(
    state = defaultRentParkingTabState,
    action: UpdateParkingSearchAction
): RentParkingTabState {

    switch (action.type) {
        case UPDATE_PARKING_SEARCH_INPUT:
            return {
                ...state,
                parking_search_input_value: action.value
            };
    }

    return state;
}