import { SubmitSignUpAction, SUBMIT_SIGNUP_FORM, UpdateSignUpConfirmPasswordAction, UpdateSignUpEmailAction, UpdateSignUpFirstnameAction, UpdateSignUpLastnameAction, UpdateSignUpPasswordAction, SignUpUpdatePhoneAction, UPDATE_SIGNUP_CONFIRMPASSWORD_INPUT, UPDATE_SIGNUP_EMAIL_INPUT, UPDATE_SIGNUP_FIRSTNAME_INPUT, UPDATE_SIGNUP_LASTNAME_INPUT, UPDATE_SIGNUP_PASSWORD_INPUT, UPDATE_SIGNUP_PHONE_INPUT } from "./types";

export function updateSignUpFirstnameInput(value: string): UpdateSignUpFirstnameAction {
    return {
        type: UPDATE_SIGNUP_FIRSTNAME_INPUT,
        value
    };
}

export function updateSignUpLastnameInput(value: string): UpdateSignUpLastnameAction {
    return {
        type: UPDATE_SIGNUP_LASTNAME_INPUT,
        value
    };
}

export function updateSignUpEmailInput(value: string): UpdateSignUpEmailAction {
    return {
        type: UPDATE_SIGNUP_EMAIL_INPUT,
        value
    };
}

export function updateSignUpPhoneInput(value: string): SignUpUpdatePhoneAction {
    return {
        type: UPDATE_SIGNUP_PHONE_INPUT,
        value
    };
}

export function updateSignUpPasswordInput(value: string): UpdateSignUpPasswordAction {
    return {
        type: UPDATE_SIGNUP_PASSWORD_INPUT,
        value
    };
}

export function updateSignUpConfirmPasswordInput(value: string): UpdateSignUpConfirmPasswordAction {
    return {
        type: UPDATE_SIGNUP_CONFIRMPASSWORD_INPUT,
        value
    }
}

export function submitSignUpForm(): SubmitSignUpAction {
    return {
        type: SUBMIT_SIGNUP_FORM
    }
}
