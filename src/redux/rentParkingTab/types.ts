
export interface Airport {
    id: number,
    name: string,
    lat: number,
    lng: number
}

export interface RentParkingTabState {
    parking_search_input_value: string,
    start_day: string | null,
    start_time: string | null,
    end_day: string | null,
    end_time: string | null
}

export const defaultRentParkingTabState: RentParkingTabState = {
    parking_search_input_value: '',
    start_day: null,
    start_time: null,
    end_time: null,
    end_day: null
};

export const SET_RENT_PARKING_SPOT_SEARCH_INPUT = "SET_RENT_PARKING_SPOT_SEARCH_INPUT";
export const SET_RENT_PARKING_SPOT_SEARCH_START_DAY = "SET_RENT_PARKING_SPOT_SEARCH_START_DAY";
export const SET_RENT_PARKING_SPOT_SEARCH_END_DAY = "SET_RENT_PARKING_SPOT_SEARCH_END_DAY";
export const SET_RENT_PARKING_SPOT_SEARCH_START_TIME = 'SET_RENT_PARKING_SPOT_SEARCH_START_TIME';
export const SET_RENT_PARKING_SPOT_SEARCH_END_TIME = 'SET_RENT_PARKING_SPOT_SEARCH_END_TIME';


export interface SetParkingSearchAction {
    type: typeof SET_RENT_PARKING_SPOT_SEARCH_INPUT,
    value: string
}

export interface SetRentParkingSearchStartDayAction {
    type: typeof SET_RENT_PARKING_SPOT_SEARCH_START_DAY,
    day: string | null
}

export interface SetRentParkingSearchEndDayAction {
    type: typeof SET_RENT_PARKING_SPOT_SEARCH_END_DAY,
    day: string | null
}

export interface SetRentParkingSearchStartTimeAction {
    type: typeof SET_RENT_PARKING_SPOT_SEARCH_START_TIME,
    time: string | null
}

export interface SetRentParkingSearchEndTimeAction {
    type: typeof SET_RENT_PARKING_SPOT_SEARCH_END_TIME,
    time: string | null
}

export type RentParkingTabActionTypes =
    SetParkingSearchAction |
    SetRentParkingSearchStartDayAction |
    SetRentParkingSearchEndDayAction |
    SetRentParkingSearchStartTimeAction |
    SetRentParkingSearchEndTimeAction;