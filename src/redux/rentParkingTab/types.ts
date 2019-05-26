
export interface Airport {
    id: number,
    name: string,
    lat: number,
    lng: number
}

export interface RentParkingTabState {
    parking_search_input_value: string,
    start_day: string,
    start_time: string,
    end_day: string,
    end_time: string
}

export const defaultRentParkingTabState: RentParkingTabState = {
    parking_search_input_value: '',
    start_day: '',
    start_time: '',
    end_time: '',
    end_day: ''
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
    day: string
}

export interface SetRentParkingSearchEndDayAction {
    type: typeof SET_RENT_PARKING_SPOT_SEARCH_END_DAY,
    day: string
}

export interface SetRentParkingSearchStartTimeAction {
    type: typeof SET_RENT_PARKING_SPOT_SEARCH_START_TIME,
    time: string
}

export interface SetRentParkingSearchEndTimeAction {
    type: typeof SET_RENT_PARKING_SPOT_SEARCH_END_TIME,
    time: string
}

export type RentParkingTabActionTypes =
    SetParkingSearchAction |
    SetRentParkingSearchStartDayAction |
    SetRentParkingSearchEndDayAction |
    SetRentParkingSearchStartTimeAction |
    SetRentParkingSearchEndTimeAction;