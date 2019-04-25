
export interface RentCarTabState {
    car_search_input_value: string,
    start_date: Date | null,
    end_date: Date | null
}

export const defaultRentCarTabState: RentCarTabState = {
    car_search_input_value: '',
    start_date: null,
    end_date: null
};

export const UPDATE_CAR_SEARCH_INPUT = "UPDATE_CAR_SEARCH_INPUT";

export interface UpdateCarSearchAction {
    type: typeof UPDATE_CAR_SEARCH_INPUT,
    value: string
}

export type RentCarTabActionTypes = UpdateCarSearchAction;