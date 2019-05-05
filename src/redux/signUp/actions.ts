import { UPDATE_FIRSTNAME_INPUT, UpdateFirstnameAction, UpdateLastnameAction, UPDATE_LASTNAME_INPUT, UPDATE_EMAIL_INPUT, UpdateEmailAction, UPDATE_PHONE_INPUT, UpdatePhoneAction, UpdatePasswordAction, UPDATE_PASSWORD_INPUT, SubmitSignUpAction, SUBMIT_SIGNUP_FORM, UpdateConfirmPasswordAction, UPDATE_CONFIRMPASSWORD_INPUT, ChangeSignUpTabAction, CHANGE_SIGNUP_TAB } from "./types";

export function updateFirstnameInput(value: string): UpdateFirstnameAction {
    return {
        type: UPDATE_FIRSTNAME_INPUT,
        value
    };
}

export function updateLastnameInput(value: string): UpdateLastnameAction {
    return {
        type: UPDATE_LASTNAME_INPUT,
        value
    };
}

export function updateEmailInput(value: string): UpdateEmailAction {
    return {
        type: UPDATE_EMAIL_INPUT,
        value
    };
}

export function updatePhoneInput(value: string): UpdatePhoneAction {
    return {
        type: UPDATE_PHONE_INPUT,
        value
    };
}

export function updatePasswordInput(value: string): UpdatePasswordAction {
    return {
        type: UPDATE_PASSWORD_INPUT,
        value
    };
}

export function updateConfirmPasswordInput(value: string): UpdateConfirmPasswordAction {
    return {
        type: UPDATE_CONFIRMPASSWORD_INPUT,
        value
    }
}

export function submitSignUpForm(): SubmitSignUpAction {
    return {
        type: SUBMIT_SIGNUP_FORM
    }
}

export function changeSignUpTab(): ChangeSignUpTabAction {
    return {
        type: CHANGE_SIGNUP_TAB
    }
}
