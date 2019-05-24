import { UserProfileInfoActionTypes, UPDATE_USER_PROFILE_FIRSTNAME_INPUT, UserProfileInfoTabState, defaultUserProfileInfoTabState, SET_USER_PROFILE, UPDATE_USER_PROFILE_LASTNAME_INPUT, UPDATE_USER_PROFILE_EMAIL_INPUT, UPDATE_USER_PROFILE_PHONE_INPUT, SUMBIT_USER_PROFILE, USER_PROFILE_FORM_SENT, USER_PROFILE_FORM_RECEIVED, UPDATE_USER_PROFILE_NEW_PASSWORD_INPUT, USER_PROFILE_SAVED, UPDATE_USER_PROFILE_PASSWORD_INPUT, UPDATE_USER_PROFILE_PASSWORD_ERROR, RESET_USER_PROFILE_PASSWORD } from "./types";

export function userProfileInfoTabReducer(
    state = defaultUserProfileInfoTabState,
    action: UserProfileInfoActionTypes
): UserProfileInfoTabState {

    let isValid = true;

    switch (action.type) {
        case SET_USER_PROFILE:
            const { id, firstname: loggedFirstname, lastname: loggedLastname, email: loggedEmail, phone: loggedPhone } = action.user;
            return {
                ...state,
                form_data: {
                    ...state.form_data,
                    id: id,
                    firstname: loggedFirstname,
                    lastname: loggedLastname,
                    email: loggedEmail,
                    phone: loggedPhone
                },
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
        case UPDATE_USER_PROFILE_PASSWORD_INPUT:
            isValid = action.value.length >= 3;
            return {
                ...state,
                form_data: { ...state.form_data, password: action.value },
                form_errors: { ...state.form_errors, password_error: isValid ? '' : 'Le mot de passe doit contenir au moins 3 caractères' },
                editing: true
            };
        case UPDATE_USER_PROFILE_NEW_PASSWORD_INPUT:
            isValid = action.value.length >= 3;
            return {
                ...state,
                form_data: { ...state.form_data, new_password: action.value },
                form_errors: { ...state.form_errors, new_password_error: isValid ? '' : 'Le mot de passe doit contenir au moins 3 caractères' },
                editing: true
            };
        case UPDATE_USER_PROFILE_PASSWORD_ERROR:
            return {
                ...state,
                form_errors: { ...state.form_errors, password_error: action.error }
            };
        case SUMBIT_USER_PROFILE:
            const { firstname, lastname, email, phone, password } = state.form_data;
            isValid = (Object
                .keys(state.form_errors)
                .every(key => state.form_errors[key] === '')) &&
                ([
                    firstname,
                    lastname,
                    email,
                    phone,
                    password
                ].every(field => field !== ''));
            return {
                ...state,
                valid_form: isValid ? true : false,
                form_errors: {
                    ...state.form_errors,
                    firstname_error:
                        (firstname === '' ? 'Le nom n\'est pas indiqué' : '') ||
                        (firstname.length >= 2 ? '' : 'Le prénom doit contenir au moins 2 caractères'),
                    lastname_error:
                        (lastname === '' ? 'Le prénom n\'est pas indiqué' : '') ||
                        (lastname.length >= 2 ? '' : 'Le nom doit contenir au moins 2 caractères'),
                    email_error:
                        (email === '' ? 'L\'email n\'est pas indiqué' : '') ||
                        (/[A-Za-z0-9._-]*@[A-Za-z0-9]*.[A-Za-z]{2,4}/.test(email) ? '' : 'Veuillez entrer une adresse email valide'),
                    phone_error:
                        (phone === '' ? 'Le téléphone n\'est pas indiqué' : '') ||
                        (/(\d\d){4}\d\d/.test(phone) ? '' : 'Veuillez entrer un numéro valide'),
                    password_error:
                        (password === '' ? 'Le mot de passe n\'est pas indiqué' : '') ||
                        (password.length >= 3 ? '' : 'Le mot de passe contient au moins 3 caractères')
                }
            };
        case USER_PROFILE_FORM_SENT:
            return {
                ...state,
                sending: true,
                editing: false
            };
        case USER_PROFILE_FORM_RECEIVED:
            return {
                ...state,
                sending: false,
                saving: true
            };
        case USER_PROFILE_SAVED:
            return {
                ...state,
                saving: false
            };
        case RESET_USER_PROFILE_PASSWORD:
            return {
                ...state,
                form_data: { ...state.form_data, password: '', new_password: '' }
            }
        default:
            return state;
    }

}