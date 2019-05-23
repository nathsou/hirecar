import { UpdateSignInEmailAction, UPDATE_SIGNIN_EMAIL_INPUT, UpdateSignInPasswordAction, UPDATE_SIGNIN_PASSWORD_INPUT, SubmitSignInAction, SUBMIT_SIGNIN_FORM, SignInSentAction, SIGNIN_FORM_SENT, SIGNIN_FORM_RECEIVED, SignInReceivedAction, SignInActionTypes, SignInFormDataState, UpdateSignInPasswordErrorAction, UPDATE_SIGNIN_PASSWORD_ERROR, UpdateSignInEmailErrorAction, UPDATE_SIGNIN_EMAIL_ERROR, ResetSignInAction, RESET_SIGNIN_FORM } from "./types";
import { Dispatch } from "react";
import Axios, { AxiosResponse, AxiosError } from "axios";
import bcrypt from "bcryptjs";
import { toggleShowModal } from "../navbar/actions";
import { setUserLogged } from "../user/actions";
import { UserDataState } from "../user/types";
import { setUserProfile } from "../userProfileTab/actions";
import { UserProfileFormDataState } from "../userProfileTab/types";

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

export function updateSignInEmailErrorInput(error: string): UpdateSignInEmailErrorAction {
    return {
        type: UPDATE_SIGNIN_EMAIL_ERROR,
        error
    }
}

export function updateSignInPasswordErrorInput(): UpdateSignInPasswordErrorAction {
    return {
        type: UPDATE_SIGNIN_PASSWORD_ERROR
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

export function resetSignUpForm(): ResetSignInAction {
    return {
        type: RESET_SIGNIN_FORM
    }
}

export function postSignInForm(data: SignInFormDataState) {
    return (dispatch: Dispatch<SignInActionTypes>) => {
        dispatch(signInFormSent());

        Axios.post(`${process.env.REACT_APP_HIRECAR_API_URI}/login`, data)
            .then((res: AxiosResponse) => {
                const hash = res.data.password;

                const filtered_keys = Object.keys(res.data)
                    .filter(key => key !== "password");

                const sent_data = {} as UserDataState;
                filtered_keys.forEach(key => {
                    sent_data[key as keyof UserDataState] = res.data[key];
                });

                const user_profile_data = {} as UserProfileFormDataState;
                filtered_keys.forEach(key => {
                    user_profile_data[key as keyof UserProfileFormDataState] = res.data[key];
                });

                // const send_data: UserDataState = {
                //     firstname: res.data['firstname'],
                //     lastname: res.data['lastname']
                // };

                bcrypt.compare(data.password, hash)
                    .then((res) => {
                        if (res) {
                            dispatch(setUserLogged(sent_data));
                            dispatch(setUserProfile(user_profile_data));
                            dispatch(toggleShowModal());
                            dispatch(resetSignUpForm());
                        } else {
                            dispatch(updateSignInPasswordErrorInput());
                        }
                    });
                dispatch(signUpFormReceived());
            }).catch((error: AxiosError) => {
                const response = error.response;
                if (response !== undefined && response.status === 400) {
                    if (response.data.email_error) {
                        dispatch(updateSignInEmailErrorInput(response.data.email_error));
                    }
                }
            });
    }
}