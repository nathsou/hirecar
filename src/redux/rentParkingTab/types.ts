
export interface RentParkingTabState {
    parking_search_input_value: string,
    start_date: Date | null,
    end_date: Date | null
}

export const defaultRentParkingTabState: RentParkingTabState = {
    parking_search_input_value: '',
    start_date: null,
    end_date: null
};

export const UPDATE_PARKING_SEARCH_INPUT = "UPDATE_PARKING_SEARCH_INPUT";


export interface UpdateParkingSearchAction {
    type: typeof UPDATE_PARKING_SEARCH_INPUT,
    value: string
}

export type RentParkingTabActionTypes = UpdateParkingSearchAction;