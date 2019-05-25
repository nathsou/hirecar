
export interface RentCarTabState {
    car_search_input_value: string,
    start_day: string | null,
    start_time: string | null,
    end_day: string | null,
    end_time: string | null
}

export const defaultRentCarTabState: RentCarTabState = {
    car_search_input_value: '',
    start_day: null,
    start_time: null,
    end_time: null,
    end_day: null
};

export const SET_RENT_CAR_SEARCH_INPUT = "USET_RENT_CAR_SEARCH_INPUT";
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
    day: string | null
}

export interface SetRentCarSearchEndDayAction {
    type: typeof SET_RENT_CAR_SEARCH_END_DAY,
    day: string | null
}

export interface SetRentCarSearchStartTimeAction {
    type: typeof SET_RENT_CAR_SEARCH_START_TIME,
    time: string | null
}

export interface SetRentCarSearchEndTimeAction {
    type: typeof SET_RENT_CAR_SEARCH_END_TIME,
    time: string | null
}

export type RentCarTabActionTypes =
    SetCarSearchAction |
    SetRentCarSearchStartDayAction |
    SetRentCarSearchEndDayAction |
    SetRentCarSearchStartTimeAction |
    SetRentCarSearchEndTimeAction;