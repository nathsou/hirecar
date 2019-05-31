import { SetParkingSearchAction, SetRentParkingSearchEndDayAction, SetRentParkingSearchEndTimeAction, SetRentParkingSearchStartDayAction, SetRentParkingSearchStartTimeAction, SET_RENT_PARKING_SPOT_SEARCH_END_DAY, SET_RENT_PARKING_SPOT_SEARCH_END_TIME, SET_RENT_PARKING_SPOT_SEARCH_INPUT, SET_RENT_PARKING_SPOT_SEARCH_START_DAY, SET_RENT_PARKING_SPOT_SEARCH_START_TIME, CheckRentParkingSpotFormAction, CHECK_RENT_PARKING_SPOT_FORM } from "./types";

export function setAirportSearchInput(value: string): SetParkingSearchAction {
    return {
        type: SET_RENT_PARKING_SPOT_SEARCH_INPUT,
        value
    };
}

export function setRentParkingSearchStartDay(day: string): SetRentParkingSearchStartDayAction {
    return {
        type: SET_RENT_PARKING_SPOT_SEARCH_START_DAY,
        day
    };
}

export function setRentParkingSearchEndDay(day: string): SetRentParkingSearchEndDayAction {
    return {
        type: SET_RENT_PARKING_SPOT_SEARCH_END_DAY,
        day
    };
}

export function setRentParkingSearchStartTime(time: string): SetRentParkingSearchStartTimeAction {
    return {
        type: SET_RENT_PARKING_SPOT_SEARCH_START_TIME,
        time
    };
}

export function setRentParkingSearchEndTime(time: string): SetRentParkingSearchEndTimeAction {
    return {
        type: SET_RENT_PARKING_SPOT_SEARCH_END_TIME,
        time
    };
}

export function checkRentParkingSpotForm(): CheckRentParkingSpotFormAction {
    return {
        type: CHECK_RENT_PARKING_SPOT_FORM
    };
}