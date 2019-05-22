import { UserProfileActionTypes, UPDATE_USER_PROFILE_FIRSTNAME_INPUT, UserProfileTabState, defaultUserProfileTabState, SET_USER_PROFILE, UPDATE_USER_PROFILE_LASTNAME_INPUT, UPDATE_USER_PROFILE_EMAIL_INPUT, UPDATE_USER_PROFILE_PHONE_INPUT } from "./types";

export function userProfileTabReducer(
    state = defaultUserProfileTabState,
    action: UserProfileActionTypes
): UserProfileTabState {

    let isValid = true;

    switch (action.type) {
        case SET_USER_PROFILE:
            const { id, firstname, lastname, email, phone } = action.user;
            return {
                ...state,
                form_data: { ...state.form_data, id: id, firstname: firstname, lastname: lastname, email: email, phone: phone },
            };
        case UPDATE_USER_PROFILE_FIRSTNAME_INPUT:
            isValid = action.value.length >= 2;
            return {
                ...state,
                form_data: { ...state.form_data, firstname: action.value },
                form_errors: { ...state.form_errors, firstname_error: isValid ? '' : 'Le prénom doit contenir au moins 2 caractères' },
                editing: true
            };
        case UPDATE_USER_PROFILE_LASTNAME_INPUT:
            isValid = action.value.length >= 2;
            return {
                ...state,
                form_data: { ...state.form_data, lastname: action.value },
                form_errors: { ...state.form_errors, lastname_error: isValid ? '' : 'Le nom doit contenir au moins 2 caractères' },
                editing: true
            };
        case UPDATE_USER_PROFILE_EMAIL_INPUT:
            isValid = /[A-Za-z0-9._-]*@[A-Za-z0-9]*.[A-Za-z]{2,4}/.test(action.value);
            return {
                ...state,
                form_data: { ...state.form_data, email: action.value },
                form_errors: { ...state.form_errors, email_error: isValid ? '' : 'Veuillez entrer une adresse email valide' },
                editing: true
            };
        case UPDATE_USER_PROFILE_PHONE_INPUT:
            isValid = /(\d\d){4}\d\d/.test(action.value);
            return {
                ...state,
                form_data: { ...state.form_data, phone: action.value },
                form_errors: { ...state.form_errors, phone_error: isValid ? '' : 'Veuillez entrer un numéro valide' },
                editing: true
            };
        case "SUMBIT_USER_PROFILE":
            return {
                ...state,
            };
        default:
            return state;
    }

}