import { defaultUserProfileAdminTabState, UserProfileAdminActionTypes, UserProfileAdminTabState, ADMIN_REQUEST_PARKINGS, ADMIN_PARKINGS_RECEIVED, TOGGLE_ADMIN_PARKING_MODAL, ADMIN_DELETE_PARKING, CANCEL_ADMIN_DELETE_PARKING, ADMIN_DELETE_PARKING_RECEIVED, ADMIN_DELETE_PARKING_SENT, ADMIN_DELETE_PARKING_ERROR_MSG, TOGGLE_ADMIN_PARKING_FORM, UPDATE_ADMIN_PARKING_LABEL_INPUT, UPDATE_ADMIN_PARKING_LAT_INPUT, UPDATE_ADMIN_PARKING_LNG_INPUT, UPDATE_ADMIN_PARKING_PRICE_INPUT, UPDATE_ADMIN_PARKING_CAPACITY_INPUT, UPDATE_ADMIN_PARKING_AIRPORT_SELECT, ADMIN_AIRPORTS_RECEIVED, SUMBIT_ADMIN_PARKING, ADMIN_PARKING_FORM_SENT, ADMIN_PARKING_FORM_RECEIVED, RESET_ADMIN_PARKING_FORM, ADMIN_PARKING_SAVED } from "./types";
import { Airport, ParkingLot } from "../../parkingSearch/types";

export function userProfileAdminTabReducer(
    state = defaultUserProfileAdminTabState,
    action: UserProfileAdminActionTypes
): UserProfileAdminTabState {
    let isValid = true;

    switch (action.type) {
        case ADMIN_REQUEST_PARKINGS:
            return {
                ...state,
                fetching_parking_lots: true
            }
        case ADMIN_PARKINGS_RECEIVED:
            return {
                ...state,
                parking_lots: action.parking_lots,
                fetching_parking_lots: false
            }
        case ADMIN_DELETE_PARKING:
            return {
                ...state,
                selected_parking_id: action.id
            }
        case CANCEL_ADMIN_DELETE_PARKING:
            return {
                ...state,
                show_admin_delete_parking_modal: !state.show_admin_delete_parking_modal,
                error: ""
            }
        case ADMIN_DELETE_PARKING_SENT:
            return {
                ...state,
                deleting: true
            }
        case ADMIN_DELETE_PARKING_RECEIVED:
            const deleted_parkings_data = state.parking_lots.filter(parking => (parking.id !== action.id))
            return {
                ...state,
                deleting: false,
                show_admin_delete_parking_modal: false,
                parking_lots: deleted_parkings_data
            }
        case TOGGLE_ADMIN_PARKING_MODAL:
            return {
                ...state,
                show_admin_delete_parking_modal: action.show
            }
        case ADMIN_DELETE_PARKING_ERROR_MSG:
            return {
                ...state,
                error: action.error
            }
        case TOGGLE_ADMIN_PARKING_FORM:
            return {
                ...state,
                show_form: !state.show_form
            }
        case UPDATE_ADMIN_PARKING_LABEL_INPUT:
            isValid = action.value.length >= 5;
            return {
                ...state,
                form_data: { ...state.form_data, label: action.value },
                form_errors: { ...state.form_errors, label_error: isValid ? '' : 'Le nom du label doit contenir au moins 5 caractères' }
            };
        case UPDATE_ADMIN_PARKING_LAT_INPUT:
            isValid = /^([0-9]\d*)?(\.\d{1,8})?$/.test(action.value);
            return {
                ...state,
                form_data: { ...state.form_data, lat: action.value },
                form_errors: { ...state.form_errors, lat_error: isValid ? '' : 'Veuillez entrer une latitude valide.' }
            };
        case UPDATE_ADMIN_PARKING_LNG_INPUT:
            isValid = /^([0-9]\d*)?(\.\d{1,8})?$/.test(action.value);
            return {
                ...state,
                form_data: { ...state.form_data, lng: action.value },
                form_errors: { ...state.form_errors, lng_error: isValid ? '' : 'Veuillez entrer une longitude valide.' }
            };
        case UPDATE_ADMIN_PARKING_CAPACITY_INPUT:
            isValid = /^([1-9]+)$/.test(action.value);
            return {
                ...state,
                form_data: { ...state.form_data, capacity: action.value },
                form_errors: { ...state.form_errors, capacity_error: isValid ? '' : 'Veuillez un nombre valide.' }
            };
        case UPDATE_ADMIN_PARKING_PRICE_INPUT:
            isValid = /^([1-9]\d*)?(\.\d{1,2})?$/.test(action.value);
            return {
                ...state,
                form_data: { ...state.form_data, price_per_day: action.value },
                form_errors: { ...state.form_errors, price_error: isValid ? '' : 'Veuillez entrer un prix valide jusqu\'à 2 chiffres après la virgule.' }
            };
        case ADMIN_AIRPORTS_RECEIVED:
            return {
                ...state,
                airports: action.airports
            }
        case UPDATE_ADMIN_PARKING_AIRPORT_SELECT:
            const updated_airport = state.airports.find(a => a.id === action.value) as Airport;
            return {
                ...state,
                form_data: {
                    ...state.form_data,
                    airport: {
                        id: action.value.toString(),
                        name: updated_airport.name,
                        lat: (updated_airport.lng).toString(),
                        lng: (updated_airport.lng).toString()
                    }
                },
            };
        case SUMBIT_ADMIN_PARKING:
            const { label, lat, lng, price_per_day, capacity } = state.form_data;
            isValid = (Object
                .keys(state.form_errors)
                .every(key => state.form_errors[key] === '')) &&
                ([
                    label, lat, lng, price_per_day, capacity
                ].every(field => field !== ''));
            return {
                ...state,
                valid_form: isValid ? true : false,
                form_errors: {
                    ...state.form_errors,
                    label_error:
                        (label === '' ? 'Le nom du site n\'est pas indiqué' : '') ||
                        (label.length >= 5 ? '' : 'Le nom du site doit contenir au moins 5 caractères'),
                    lat_error:
                        (lat === '' ? 'La latitude du site n\'est pas indiqué' : '') ||
                        (/^([0-9]\d*)?(\.\d{1,8})?$/.test(lat ? lat : '') ? '' : 'Veuillez entrer une latitude valide.'),
                    lng_error:
                        (lng === '' ? 'La longitude du site n\'est pas indiqué' : '') ||
                        (/^([0-9]\d*)?(\.\d{1,8})?$/.test(lng ? lng : '') ? '' : 'Veuillez entrer une longitude valide.'),
                    capacity_error:
                        (capacity === '' ? 'Le nombre de places disponibles du site n\'est pas indiqué' : '') ||
                        (/^([1-9]+)$/.test(capacity) ? '' : 'Veuillez entrer un nombre valide.'),
                    price_error:
                        (price_per_day === '' ? 'Le prix n\'est pas indiqué' : '') ||
                        (/^([1-9]\d*)?(\.\d{1,2})?$/.test(price_per_day) ? '' : 'Veuillez entrer un prix valide jusqu\'à 2 chiffres après la virgule.'),
                },
                submit_form: true
            }

        case ADMIN_PARKING_FORM_SENT:
            return {
                ...state,
                sending: true
            };
        case ADMIN_PARKING_FORM_RECEIVED:
            const parking_lot: ParkingLot = action.data;
            const updated_parking_lots = state.parking_lots;
            parking_lot.id = action.id;
            updated_parking_lots.push(parking_lot);
            return {
                ...state,
                parking_lots: updated_parking_lots,
                sending: false,
                saving: true
            };
        case ADMIN_PARKING_SAVED:
            return {
                ...state,
                saving: false
            };
        case RESET_ADMIN_PARKING_FORM:
            const { form_data, form_errors, show_form, valid_form, sending, submit_form } = defaultUserProfileAdminTabState
            return {
                ...state,
                form_data,
                form_errors,
                show_form,
                valid_form,
                sending,
                submit_form
            }
        default:
            return state;
    }
}