import { defaultSignInTabState, SignInActionTypes, SignInTabState, UPDATE_SIGNIN_EMAIL_INPUT, SUBMIT_SIGNIN_FORM, UPDATE_SIGNIN_PASSWORD_ERROR, UPDATE_SIGNIN_EMAIL_ERROR, UPDATE_SIGNIN_PASSWORD_INPUT, RESET_SIGNIN_FORM } from "./types";

export function signInTabReducer(
    state = defaultSignInTabState,
    action: SignInActionTypes
): SignInTabState {

    let isValid = true;

    switch (action.type) {
        case UPDATE_SIGNIN_EMAIL_INPUT:
            return {
                ...state,
                form_data: { ...state.form_data, email: action.value }
            };
        case UPDATE_SIGNIN_PASSWORD_INPUT:
            return {
                ...state,
                form_data: { ...state.form_data, password: action.value }
            };
        case UPDATE_SIGNIN_EMAIL_ERROR:
            return {
                ...state,
                form_errors: { ...state.form_errors, email_error: action.error }
            };
        case UPDATE_SIGNIN_PASSWORD_ERROR:
            return {
                ...state,
                form_errors: { ...state.form_errors, password_error: 'Le mot de passe saisi est incorrect' }
            };
        case SUBMIT_SIGNIN_FORM:
            const { email, password } = state.form_data;
            isValid = (Object
                .keys(state.form_errors)
                .every(key => state.form_errors[key] === '')) &&
                ([
                    email,
                    password
                ].every(field => field !== ''));
            return {
                ...state,
                validForm: isValid ? true : false,
                form_errors: {
                    ...state.form_errors,
                    email_error:
                        (email === '' ? 'L\'email n\'est pas indiqué' : '') ||
                        (/[A-Za-z0-9._-]*@[A-Za-z0-9]*.[A-Za-z]{2,4}/.test(email) ? '' : 'Veuillez entrer une adresse email valide'),
                    password_error:
                        (password === '' ? 'Le mot de passe n\'est pas indiqué' : '') ||
                        (password.length >= 3 ? '' : 'Le mot de passe contient au moins 3 caractères')
                }
            };
        case RESET_SIGNIN_FORM:
            return defaultSignInTabState
        default:
            return state;
    }
}