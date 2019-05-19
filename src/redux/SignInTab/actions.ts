import { UpdateSignInEmailAction, UPDATE_SIGNIN_EMAIL_INPUT, UpdateSignInPasswordAction, UPDATE_SIGNIN_PASSWORD_INPUT, SubmitSignInAction, SUBMIT_SIGNIN_FORM, SignInSentAction, SIGNIN_FORM_SENT, SIGNIN_FORM_RECEIVED, SignInReceivedAction, SignInActionTypes, SignInFormDataState } from "./types";
import { Dispatch } from "react";
import Axios from "axios";
import bcrypt from "bcryptjs";

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