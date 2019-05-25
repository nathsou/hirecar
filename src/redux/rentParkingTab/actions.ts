import { SetParkingSearchAction, SET_RENT_PARKING_SPOT_SEARCH_END_DAY, SET_RENT_PARKING_SPOT_SEARCH_INPUT, SET_RENT_PARKING_SPOT_SEARCH_START_DAY, SetRentParkingSearchStartDayAction, SetRentParkingSearchEndDayAction, SET_RENT_PARKING_SPOT_SEARCH_START_TIME, SetRentParkingSearchStartTimeAction, SetRentParkingSearchEndTimeAction, SET_RENT_PARKING_SPOT_SEARCH_END_TIME } from "./types";

export function setAirportSearchInput(value: string): SetParkingSearchAction {
    return {
        type: SET_RENT_PARKING_SPOT_SEARCH_INPUT,
        value
    };
}

export function setRentParkingSearchStartDay(day: string | null): SetRentParkingSearchStartDayAction {
    return {
        type: SET_RENT_PARKING_SPOT_SEARCH_START_DAY,
        day
    };
}

export function setRentParkingSearchEndDay(day: string | null): SetRentParkingSearchEndDayAction {
    return {
        type: SET_RENT_PARKING_SPOT_SEARCH_END_DAY,
        day
    };
}

export function setRentParkingSearchStartTime(time: string | null): SetRentParkingSearchStartTimeAction {
    return {
        type: SET_RENT_PARKING_SPOT_SEARCH_START_TIME,
        time
    };
}

export function setRentParkingSearchEndTime(time: string | null): SetRentParkingSearchEndTimeAction {
    return {
        type: SET_RENT_PARKING_SPOT_SEARCH_END_TIME,
        time
    };
}