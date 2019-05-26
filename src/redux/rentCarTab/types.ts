
export interface RentCarTabState {
    car_search_input_value: string,
    start_day: string,
    start_time: string,
    end_day: string,
    end_time: string
}

export const defaultRentCarTabState: RentCarTabState = {
    car_search_input_value: '',
    start_day: '',
    start_time: '',
    end_time: '',
    end_day: ''
};

export const SET_RENT_CAR_SEARCH_INPUT = "SET_RENT_CAR_SEARCH_INPUT";
export const SET_RENT_CAR_SEARCH_START_DAY = "SET_RENT_CAR_SEARCH_START_DAY";
export const SET_RENT_CAR_SEARCH_END_DAY = "SET_RENT_CAR_SEARCH_END_DAY";
export const SET_RENT_CAR_SEARCH_START_TIME = "SET_RENT_CAR_SEARCH_START_TIME";
export const SET_RENT_CAR_SEARCH_END_TIME = "SET_RENT_CAR_SEARCH_END_TIME";

export interface SetCarSearchAction {
    type: typeof SET_RENT_CAR_SEARCH_INPUT,
    value: string
}

export interface SetRentCarSearchStartDayAction {
    type: typeof SET_RENT_CAR_SEARCH_START_DAY,
    day: string
}

export interface SetRentCarSearchEndDayAction {
    type: typeof SET_RENT_CAR_SEARCH_END_DAY,
    day: string
}

export interface SetRentCarSearchStartTimeAction {
    type: typeof SET_RENT_CAR_SEARCH_START_TIME,
    time: string
}

export interface SetRentCarSearchEndTimeAction {
    type: typeof SET_RENT_CAR_SEARCH_END_TIME,
    time: string
}

export type RentCarTabActionTypes =
    SetCarSearchAction |
    SetRentCarSearchStartDayAction |
    SetRentCarSearchEndDayAction |
    SetRentCarSearchStartTimeAction |
    SetRentCarSearchEndTimeAction;