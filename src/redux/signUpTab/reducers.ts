import { defaultSignUpTabState, SignUpActionTypes, SignUpTabState, SUBMIT_SIGNUP_FORM, UPDATE_SIGNUP_CONFIRMPASSWORD_INPUT, UPDATE_SIGNUP_EMAIL_INPUT, UPDATE_SIGNUP_FIRSTNAME_INPUT, UPDATE_SIGNUP_LASTNAME_INPUT, UPDATE_SIGNUP_PASSWORD_INPUT, UPDATE_SIGNUP_PHONE_INPUT } from "./types";


export function signUpTabReducer(
    state = defaultSignUpTabState,
    action: SignUpActionTypes
): SignUpTabState {

    let isValid = true;

    switch (action.type) {
        case UPDATE_SIGNUP_FIRSTNAME_INPUT:
            isValid = action.value.length >= 2;
            return {
                ...state,
                firstname: action.value,
                formErrors: { ...state.formErrors, firstnameError: isValid ? '' : 'Le prénom doit contenir au moins 2 caractères' }
            };
        case UPDATE_SIGNUP_LASTNAME_INPUT:
            isValid = action.value.length >= 2;
            return {
                ...state,
                lastname: action.value,
                formErrors: { ...state.formErrors, lastnameError: isValid ? '' : 'Le nom doit contenir au moins 2 caractères' }
            };
        case UPDATE_SIGNUP_EMAIL_INPUT:
            isValid = /[A-Za-z0-9._-]*@[A-Za-z0-9]*.[A-Za-z]{2,4}/.test(action.value);
            return {
                ...state,
                email: action.value,
                formErrors: { ...state.formErrors, emailError: isValid ? '' : 'Veuillez entrer une adresse email valide' }
            };
        case UPDATE_SIGNUP_PHONE_INPUT:
            isValid = /(\d\d){4}\d\d/.test(action.value);
            return {
                ...state,
                phone: action.value,
                formErrors: { ...state.formErrors, phoneError: isValid ? '' : 'Veuillez entrer un numéro valide' }
            };
        case UPDATE_SIGNUP_PASSWORD_INPUT:
            isValid = action.value.length >= 3;
            return {
                ...state,
                password: action.value,
                formErrors: { ...state.formErrors, passwordError: isValid ? '' : 'Le mot de passe doit contenir au moins 3 caractères' }
            };

        case UPDATE_SIGNUP_CONFIRMPASSWORD_INPUT:
            isValid = action.value === state.password ? true : false
            return {
                ...state,
                confirmPassword: action.value,
                formErrors: { ...state.formErrors, confirmPasswordError: isValid ? '' : 'Le mot de passe n\'est pas identique au précédent' }
            };
        case SUBMIT_SIGNUP_FORM:
            const { firstname, lastname, email, phone, password, confirmPassword } = state;
            isValid = (Object
                .keys(state.formErrors)
                .every(key => state.formErrors[key] === '')) &&
                ([
                    firstname,
                    lastname,
                    email,
                    phone,
                    password,
                    confirmPassword
                ].every(field => field !== ''));
            return {
                ...state,
                validForm: isValid ? true : false
            };
        default:
            return state;
    }

}