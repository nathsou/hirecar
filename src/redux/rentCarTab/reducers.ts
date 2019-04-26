import { defaultRentCarTabState, UpdateCarSearchAction, RentCarTabState, UPDATE_CAR_SEARCH_INPUT } from "./types";

export function rentCarTabReducer(
    state = defaultRentCarTabState,
    action: UpdateCarSearchAction
): RentCarTabState {

    switch (action.type) {
        case UPDATE_CAR_SEARCH_INPUT:
            return {
                ...state,
                car_search_input_value: action.value
            };

        default:
            return state;
    }
    
}