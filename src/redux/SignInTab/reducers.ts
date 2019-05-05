import { defaultSignInTabState, SignInActionTypes, SignInTabState, UPDATE_SIGNIN_EMAIL_INPUT, UPDATE_SIGNIN_PASSWORD_INPUT, SUBMIT_SIGNIN_FORM } from "./types";

export function signInTabReducer(
    state = defaultSignInTabState,
    action: SignInActionTypes
): SignInTabState {

    let isValid = true;

    switch (action.type) {
        case UPDATE_SIGNIN_EMAIL_INPUT:
            isValid = /[A-Za-z0-9._-]*@[A-Za-z0-9]*.[A-Za-z]{2,4}/.test(action.value);
            return {
                ...state,
                email: action.value,
                form_errors: { ...state.form_errors, email_error: isValid ? '' : 'Veuillez entrer une adresse email valide' }
            };
        case UPDATE_SIGNIN_PASSWORD_INPUT:
            isValid = action.value.length >= 3;
            return {
                ...state,
                password: action.value,
                form_errors: { ...state.form_errors, password_error: isValid ? '' : 'Le mot de passe doit contenir au moins 3 caractères' }
            };
        case SUBMIT_SIGNIN_FORM:
            const { email, password } = state;
            isValid = (Object
                .keys(state.form_errors)
                .every(key => state.form_errors[key] === '')) &&
                ([
                    email,
                    password
                ].every(field => field !== ''));
            return {
                ...state,
                validForm: isValid ? true : false
            };
        default:
            return state;
    }
}