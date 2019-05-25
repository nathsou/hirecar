import { defaultUserProfileCarTabState, UserProfileCarActionTypes, UserProfileCarTabState, TOGGLE_USER_PROFILE_CAR_FORM, UPDATE_USER_PROFILE_CAR_MODEL_INPUT, UPDATE_USER_PROFILE_CAR_PRICE_INPUT, SET_USER_PROFILE_CAR_FEATURES, UPDATE_USER_PROFILE_CAR_GEARBOX_SELECT, UPDATE_USER_PROFILE_CAR_FUEL_SELECT, UPDATE_USER_PROFILE_CAR_SEATS_SELECT, UPDATE_USER_PROFILE_CAR_DOORS_SELECT, SUMBIT_USER_PROFILE_CAR, USER_PROFILE_CAR_FORM_RECEIVED, USER_PROFILE_CAR_FORM_SENT, SET_USER_PROFILE_CAR_OWNER, RESET_USER_PROFILE_CAR_FORM, USER_PROFILE_CAR_SAVED } from "./types";

export function userProfileCarTabReducer(
    state = defaultUserProfileCarTabState,
    action: UserProfileCarActionTypes
): UserProfileCarTabState {

    let isValid = true;

    switch (action.type) {
        case TOGGLE_USER_PROFILE_CAR_FORM:
            return {
                ...state,
                show_form: !state.show_form
            };
        case UPDATE_USER_PROFILE_CAR_MODEL_INPUT:
            isValid = action.value.length >= 5;
            return {
                ...state,
                form_data: { ...state.form_data, model: action.value },
                form_errors: { ...state.form_errors, model_error: isValid ? '' : 'Le nom du modèle doit contenir au moins 5 caractères' }
            };
        case UPDATE_USER_PROFILE_CAR_PRICE_INPUT:
            isValid = /^\d+([,|.]\d{1,2})?$/.test(action.value);
            return {
                ...state,
                form_data: { ...state.form_data, price_per_day: action.value },
                form_errors: { ...state.form_errors, price_error: isValid ? '' : 'Veuillez entrer un prix valide' }
            };
        case UPDATE_USER_PROFILE_CAR_GEARBOX_SELECT:
            return {
                ...state,
                form_data: { ...state.form_data, gearbox_id: action.value },
            };
        case UPDATE_USER_PROFILE_CAR_FUEL_SELECT:
            return {
                ...state,
                form_data: { ...state.form_data, fuel_id: action.value },
            };
        case UPDATE_USER_PROFILE_CAR_SEATS_SELECT:
            return {
                ...state,
                form_data: { ...state.form_data, seats: action.value },
            };
        case UPDATE_USER_PROFILE_CAR_DOORS_SELECT:
            return {
                ...state,
                form_data: { ...state.form_data, doors: action.value },
            };
        case SET_USER_PROFILE_CAR_OWNER:
            return {
                ...state,
                form_data: { ...state.form_data, owner_id: action.id }
            }
        case SET_USER_PROFILE_CAR_FEATURES:
            const { fuel, gearbox } = action.data;
            return {
                ...state,
                car_features: { fuel, gearbox }
            }
        case SUMBIT_USER_PROFILE_CAR:
            const { model, price_per_day } = state.form_data;
            isValid = (Object
                .keys(state.form_errors)
                .every(key => state.form_errors[key] === '')) &&
                ([
                    model,
                    price_per_day
                ].every(field => field !== ''));
            return {
                ...state,
                valid_form: isValid ? true : false,
                form_errors: {
                    ...state.form_errors,
                    model_error:
                        (model === '' ? 'Le nom du modéle n\'est pas indiqué' : '') ||
                        (model.length >= 5 ? '' : 'Le nom du modèle doit contenir au moins 5 caractères'),
                    price_error:
                        (price_per_day === '' ? 'Le prix n\'est pas indiqué' : '') ||
                        (/^\d+([,|.]\d{1,2})?$/.test(price_per_day) ? '' : 'Veuillez entrer un prix valide'),
                }
            };
        case USER_PROFILE_CAR_FORM_SENT:
            return {
                ...state,
                sending: true
            };
        case USER_PROFILE_CAR_FORM_RECEIVED:
            return {
                ...state,
                sending: false,
                saving: true
            };
        case USER_PROFILE_CAR_SAVED:
            return {
                ...state,
                saving: false
            };
        case RESET_USER_PROFILE_CAR_FORM:
            return defaultUserProfileCarTabState
        default:
            return state;
    }

}