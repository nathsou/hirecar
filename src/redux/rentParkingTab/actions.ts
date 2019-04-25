import { UpdateParkingSearchAction, UPDATE_PARKING_SEARCH_INPUT } from "./types";

export function updateParkingSearchInput(value: string): UpdateParkingSearchAction {
    return {
        type: UPDATE_PARKING_SEARCH_INPUT,
        value
    };
}