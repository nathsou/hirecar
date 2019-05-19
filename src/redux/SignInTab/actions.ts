import Axios from "axios";
import { Dispatch } from "react";
import { SignInActionTypes, SignInFormDataState, SignInReceivedAction, SignInSentAction, SIGNIN_FORM_RECEIVED, SIGNIN_FORM_SENT, SubmitSignInAction, SUBMIT_SIGNIN_FORM, UpdateSignInEmailAction, UpdateSignInPasswordAction, UPDATE_SIGNIN_EMAIL_INPUT, UPDATE_SIGNIN_PASSWORD_INPUT } from "./types";

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

export function signInFormSent(): SignInSentAction {
    return {
        type: SIGNIN_FORM_SENT
    };
}

export function signUpFormReceived(): SignInReceivedAction {
    return {
        type: SIGNIN_FORM_RECEIVED
    };
}

export function postSignInForm(data: SignInFormDataState) {
    return (dispatch: Dispatch<SignInActionTypes>) => {
        dispatch(signInFormSent());
        Axios.post(`${process.env.REACT_APP_HIRECAR_API_URI}/login`, data)
            .then(() => {
                dispatch(signUpFormReceived());
            }).catch((reason: any) => {
                console.error(reason);
            });
    }
}