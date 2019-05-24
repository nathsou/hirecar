import { defaultUserProfileCarTabState, UserProfileCarActionTypes, UserProfileCarTabState, TOGGLE_USER_PROFILE_CAR_FORM, UPDATE_USER_PROFILE_CAR_MODEL_INPUT, UPDATE_USER_PROFILE_CAR_PRICE_INPUT, SET_USER_PROFILE_CAR_FEATURES } from "./types";

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
                form_data: { ...state.form_data, price: action.value },
                form_errors: { ...state.form_errors, price_error: isValid ? '' : 'Veuillez entrer un prix valide' }
            };
        case SET_USER_PROFILE_CAR_FEATURES:
            const { fuel, gearbox } = action.data;
            return {
                ...state,
                car_features: { fuel, gearbox }
            }
        default:
            return state;
    }

}