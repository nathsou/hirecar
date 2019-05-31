import { CHECK_RENT_PARKING_SPOT_FORM, defaultRentParkingTabState, RentParkingTabActionTypes, RentParkingTabState, RentParkingTabValidationMessages, SET_RENT_PARKING_SPOT_SEARCH_END_DAY, SET_RENT_PARKING_SPOT_SEARCH_END_TIME, SET_RENT_PARKING_SPOT_SEARCH_INPUT, SET_RENT_PARKING_SPOT_SEARCH_START_DAY, SET_RENT_PARKING_SPOT_SEARCH_START_TIME } from "./types";


function inputValidator(input: string): string {
    return input !== '' ?
        '' : "Veuillez renseigner l'aéroport de départ";
}

function startDayValidator(day: string): string {
    return day !== '' ?
        '' : "Veuillez renseigner la date de début";
}

function endDayValidator(start_day: string, start_time: string, end_day: string, end_time: string): string {

    let msg = '';

    if (
        start_day !== '' &&
        end_day !== '' &&
        new Date(`${end_day} ${end_time}`).getTime() <
        new Date(`${start_day} ${start_time}`).getTime()
    ) {
        msg = 'La date de fin doit être ultérieure à la date de départ';
    } else if (end_day === '') {
        msg = 'Veuillez renseigner la date de fin';
    }

    return msg;
}

function startTimeValidator(time: string): string {
    return time !== '' ?
        '' : "Veuillez renseigner l'heure de départ";
}

function endTimeValidator(time: string): string {
    return time !== '' ?
        '' : "Veuillez renseigner l'heure d'arrivée";
}

function validationReducer(
    state: RentParkingTabState,
    action: RentParkingTabActionTypes
): RentParkingTabValidationMessages {

    if (action.type === CHECK_RENT_PARKING_SPOT_FORM) {
        return {
            input_msg: inputValidator(state.parking_search_input_value),
            start_day_msg: startDayValidator(state.start_day),
            end_day_msg: endDayValidator(
                state.start_day,
                state.start_time,
                state.end_day,
                state.end_time
            ),
            start_time_msg: startTimeValidator(state.start_time),
            end_time_msg: endTimeValidator(state.end_time)
        };
    }

    switch (action.type) {

        case SET_RENT_PARKING_SPOT_SEARCH_INPUT:
            return {
                ...state.validation,
                input_msg: inputValidator(action.value)
            };

        case SET_RENT_PARKING_SPOT_SEARCH_START_DAY:

            return {
                ...state.validation,
                start_day_msg: startDayValidator(action.day)
            };

        case SET_RENT_PARKING_SPOT_SEARCH_END_DAY:
            return {
                ...state.validation,
                end_day_msg: endDayValidator(
                    state.start_day,
                    state.start_time,
                    action.day,
                    state.end_time
                )
            };

        case SET_RENT_PARKING_SPOT_SEARCH_START_TIME:
            return {
                ...state.validation,
                start_time_msg: startTimeValidator(action.time)
            };

        case SET_RENT_PARKING_SPOT_SEARCH_END_TIME:
            return {
                ...state.validation,
                end_time_msg: endTimeValidator(action.time)
            };

        default:
            return state.validation;
    }
}

function inputReducer(
    state = defaultRentParkingTabState.parking_search_input_value,
    action: RentParkingTabActionTypes
): string {
    if (action.type === SET_RENT_PARKING_SPOT_SEARCH_INPUT) {
        return action.value;
    }

    return state;
}

function startDayReducer(
    state = defaultRentParkingTabState.start_day,
    action: RentParkingTabActionTypes
): string {
    if (action.type === SET_RENT_PARKING_SPOT_SEARCH_START_DAY) {
        return action.day;
    }

    return state;
}

function endDayReducer(
    state = defaultRentParkingTabState.end_day,
    action: RentParkingTabActionTypes
): string {
    if (action.type === SET_RENT_PARKING_SPOT_SEARCH_END_DAY) {
        return action.day;
    }

    return state;
}

function startTimeReducer(
    state = defaultRentParkingTabState.start_time,
    action: RentParkingTabActionTypes
): string {
    if (action.type === SET_RENT_PARKING_SPOT_SEARCH_START_TIME) {
        return action.time;
    }

    return state;
}

function endTimeReducer(
    state = defaultRentParkingTabState.end_time,
    action: RentParkingTabActionTypes
): string {
    if (action.type === SET_RENT_PARKING_SPOT_SEARCH_END_TIME) {
        return action.time;
    }

    return state;
}

function checkForm(validation: RentParkingTabValidationMessages): boolean {
    return !Object.entries(validation).some(([_, msg]) => msg !== '');
}

export function rentParkingTabReducer(
    state = defaultRentParkingTabState,
    action: RentParkingTabActionTypes
): RentParkingTabState {

    const validation = validationReducer(state, action);

    return {
        parking_search_input_value: inputReducer(state.parking_search_input_value, action),
        start_day: startDayReducer(state.start_day, action),
        end_day: endDayReducer(state.end_day, action),
        start_time: startTimeReducer(state.start_time, action),
        end_time: endTimeReducer(state.end_time, action),
        valid_form: checkForm(validation),
        validation
    };
}