import { defaultParkingSearchState, ParkingSearchActionTypes, ParkingSearchState, UPDATE_MAP_VIEWPORT } from "./types";

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

            default:
                return state;
    }
}