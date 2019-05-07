import { defaultSignInTabState, SignInActionTypes, SignInTabState, UPDATE_SIGNIN_EMAIL_INPUT, UPDATE_SIGNIN_PASSWORD_INPUT, SUBMIT_SIGNIN_FORM } from "./types";

export function signInTabReducer(
    state = defaultSignInTabState,
    action: SignInActionTypes
): SignInTabState {

    let isValid = true;

    switch (action.type) {
        case UPDATE_SIGNIN_EMAIL_INPUT:
            return {
                ...state,
                email: action.value
            };
        case UPDATE_SIGNIN_PASSWORD_INPUT:
            return {
                ...state,
                password: action.value
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
                validForm: isValid ? true : false,
                form_errors: {
                    ...state.form_errors,
                    email_error:
                        (state.email === '' ? 'L\'email n\'est pas indiqué' : '') ||
                        (/[A-Za-z0-9._-]*@[A-Za-z0-9]*.[A-Za-z]{2,4}/.test(state.email) ? '' : 'Veuillez entrer une adresse email valide'),
                    password_error:
                        (state.password === '' ? 'Le mot de passe n\'est pas indiqué' : '') ||
                        (state.password.length >= 3 ? '' : 'Le mot de passe contient au moins 3 caractères')
                }
            };
        default:
            return state;
    }
}