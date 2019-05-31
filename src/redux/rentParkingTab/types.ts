
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
    end_time: string,
    validation: RentParkingTabValidationMessages,
    valid_form: boolean
}

export interface RentParkingTabValidationMessages {
    input_msg: string,
    start_day_msg: string,
    start_time_msg: string,
    end_day_msg: string,
    end_time_msg: string
}

export const defaultRentParkingTabValidationMessages: RentParkingTabValidationMessages = {
    input_msg: '',
    start_day_msg: '',
    start_time_msg: '',
    end_day_msg: '',
    end_time_msg: ''
};

export const defaultRentParkingTabState: RentParkingTabState = {
    parking_search_input_value: '',
    start_day: '',
    start_time: '',
    end_time: '',
    end_day: '',
    validation: defaultRentParkingTabValidationMessages,
    valid_form: false
};

export const SET_RENT_PARKING_SPOT_SEARCH_INPUT = "SET_RENT_PARKING_SPOT_SEARCH_INPUT";
export const SET_RENT_PARKING_SPOT_SEARCH_START_DAY = "SET_RENT_PARKING_SPOT_SEARCH_START_DAY";
export const SET_RENT_PARKING_SPOT_SEARCH_END_DAY = "SET_RENT_PARKING_SPOT_SEARCH_END_DAY";
export const SET_RENT_PARKING_SPOT_SEARCH_START_TIME = 'SET_RENT_PARKING_SPOT_SEARCH_START_TIME';
export const SET_RENT_PARKING_SPOT_SEARCH_END_TIME = 'SET_RENT_PARKING_SPOT_SEARCH_END_TIME';
export const CHECK_RENT_PARKING_SPOT_FORM = 'CHECK_RENT_PARKING_SPOT_FORM';

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

export interface CheckRentParkingSpotFormAction {
    type: typeof CHECK_RENT_PARKING_SPOT_FORM
}

export type RentParkingTabActionTypes =
    SetParkingSearchAction |
    SetRentParkingSearchStartDayAction |
    SetRentParkingSearchEndDayAction |
    SetRentParkingSearchStartTimeAction |
    SetRentParkingSearchEndTimeAction |
    CheckRentParkingSpotFormAction;