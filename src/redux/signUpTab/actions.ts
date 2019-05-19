import axios from "axios";
import bcrypt from "bcryptjs";
import { Dispatch } from "react";
import { SignUpActionTypes, SignUpReceivedAction, SignUpUpdatePhoneAction, SIGNUP_FORM_RECEIVED, SIGNUP_FORM_SENT, SubmitSignUpAction, SUBMIT_SIGNUP_FORM, UpdateSignUpConfirmPasswordAction, UpdateSignUpEmailAction, UpdateSignUpFirstnameAction, UpdateSignUpLastnameAction, UpdateSignUpPasswordAction, UPDATE_SIGNUP_CONFIRMPASSWORD_INPUT, UPDATE_SIGNUP_EMAIL_INPUT, UPDATE_SIGNUP_FIRSTNAME_INPUT, UPDATE_SIGNUP_LASTNAME_INPUT, UPDATE_SIGNUP_PASSWORD_INPUT, UPDATE_SIGNUP_PHONE_INPUT, SignUpFormDataState, SignUpSentAction } from "./types";
import { changeSignTab } from "../signTabs/actions";

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

export function signUpFormSent(): SignUpSentAction {
    return {
        type: SIGNUP_FORM_SENT
    };
}

export function signUpFormReceived(): SignUpReceivedAction {
    return {
        type: SIGNUP_FORM_RECEIVED
    };
}

// TODO: email already exist 
export function postSignUpForm(data: SignUpFormDataState) {
    const salt = (process.env.REACT_APP_BCRYPT_SALT as string).replace(/_/g, '$');

    return (dispatch: Dispatch<SignUpActionTypes>) => {
        dispatch(signUpFormSent());

        bcrypt.hash(data.password, salt as string)
            .then(hashed_pwd => {
                const filtered_keys = Object.keys(data)
                    .filter(key => key !== "confirm_password");
                const sent_data: { [index: string]: string; } = {};

                filtered_keys.forEach(key => {
                    sent_data[key] = key === 'password' ? hashed_pwd : data[key];
                });

                axios.post(`${process.env.REACT_APP_HIRECAR_API_URI}/users`, sent_data)
                    .then(() => {
                        dispatch(signUpFormReceived());
                        dispatch(changeSignTab('sign_in'));
                    }).catch((reason: any) => {
                        console.error(reason);
                    });

            });
    };
}