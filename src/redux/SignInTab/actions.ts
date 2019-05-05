import { UpdateSignInEmailAction, UPDATE_SIGNIN_EMAIL_INPUT, UpdateSignInPasswordAction, UPDATE_SIGNIN_PASSWORD_INPUT, SubmitSignInAction, SUBMIT_SIGNIN_FORM } from "./types";

export function updateSignInEmailInput(value: string): UpdateSignInEmailAction {
    return {
        type: UPDATE_SIGNIN_EMAIL_INPUT,
        value
    };
}

export function updateSignInPasswordInput(value: string): UpdateSignInPasswordAction {
    return {
        type: UPDATE_SIGNIN_PASSWORD_INPUT,
        value
    }
}

export function submitSignInForm(): SubmitSignInAction {
    return {
        type: SUBMIT_SIGNIN_FORM
    }
}
