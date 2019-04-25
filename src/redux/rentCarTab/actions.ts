import { UPDATE_CAR_SEARCH_INPUT, UpdateCarSearchAction } from "./types";

export function updateCarSearchInput(value: string): UpdateCarSearchAction {
    return {
        type: UPDATE_CAR_SEARCH_INPUT,
        value
    };
}