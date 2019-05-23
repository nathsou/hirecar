import { UpdateUserProfileFirstnameAction, UPDATE_USER_PROFILE_FIRSTNAME_INPUT, SET_USER_PROFILE, SetUserProfileAction, UserProfileFormDataState, UpdateUserProfileLastnameAction, UPDATE_USER_PROFILE_LASTNAME_INPUT, UpdateUserProfilePhoneAction, UPDATE_USER_PROFILE_PHONE_INPUT, UpdateUserProfileEmailAction, UPDATE_USER_PROFILE_EMAIL_INPUT, UserProfileActionTypes, UserProfileReceivedAction, USER_PROFILE_FORM_RECEIVED, UserProfileSentAction, USER_PROFILE_FORM_SENT, SubmitUserProfileAction, SUMBIT_USER_PROFILE, UPDATE_USER_PROFILE_NEW_PASSWORD_INPUT, UpdateUserProfileNewPasswordAction, UpdateUserProfileConfirmNewPasswordAction, UPDATE_USER_PROFILE_CONFIRM_NEW_PASSWORD_INPUT, UserProfileSavedAction, USER_PROFILE_SAVED } from "./types";
import { Dispatch } from "react";
import Axios, { AxiosError, AxiosResponse } from "axios";
import bcrypt from "bcryptjs";
import { UserDataState } from "../user/types";
import { setUserLogged } from "../user/actions";

export function setUserProfile(user: UserProfileFormDataState): SetUserProfileAction {
    return {
        type: SET_USER_PROFILE,
        user
    }
}

export function updateUserProfileFirstnameInput(value: string): UpdateUserProfileFirstnameAction {
    return {
        type: UPDATE_USER_PROFILE_FIRSTNAME_INPUT,
        value
    };
}

export function updateUserProfileLastnameInput(value: string): UpdateUserProfileLastnameAction {
    return {
        type: UPDATE_USER_PROFILE_LASTNAME_INPUT,
        value
    };
}

export function updateUserProfilePhoneInput(value: string): UpdateUserProfilePhoneAction {
    return {
        type: UPDATE_USER_PROFILE_PHONE_INPUT,
        value
    };
}
export function updateUserProfileEmailInput(value: string): UpdateUserProfileEmailAction {
    return {
        type: UPDATE_USER_PROFILE_EMAIL_INPUT,
        value
    };
}

export function updateUserProfileNewPasswordInput(value: string): UpdateUserProfileNewPasswordAction {
    return {
        type: UPDATE_USER_PROFILE_NEW_PASSWORD_INPUT,
        value
    };
}

export function updateUserProfileConfirmNewPasswordInput(value: string): UpdateUserProfileConfirmNewPasswordAction {
    return {
        type: UPDATE_USER_PROFILE_CONFIRM_NEW_PASSWORD_INPUT,
        value
    };
}

export function submitUserProfileForm(): SubmitUserProfileAction {
    return {
        type: SUMBIT_USER_PROFILE
    }
}

export function userProfileFormSent(): UserProfileSentAction {
    return {
        type: USER_PROFILE_FORM_SENT
    };
}

export function userProfileFormReceived(): UserProfileReceivedAction {
    return {
        type: USER_PROFILE_FORM_RECEIVED
    };
}

export function userProfileSaved(): UserProfileSavedAction {
    return {
        type: USER_PROFILE_SAVED
    }
}

export function postUserProfileForm(data: UserProfileFormDataState) {
    const salt = (process.env.REACT_APP_BCRYPT_SALT as string).replace(/_/g, '$');

    return (dispatch: Dispatch<UserProfileActionTypes>) => {
        dispatch(userProfileFormSent());

        if (data.new_password) {
            bcrypt.hash(data.new_password, salt as string)
                .then(hashed_pwd => {

                    const filtered_keys = Object.keys(data)
                        .filter(key => key !== "confirm_new_password");
                    const sent_data: { [index: string]: string; } = {};

                    filtered_keys.forEach(key => {
                        sent_data[key] = key === 'new_password' ? hashed_pwd : data[key];
                    });

                    Axios.put(`${process.env.REACT_APP_HIRECAR_API_URI}/users/${data.id}`, sent_data)
                        .then(() => {

                            const filtered_keys = Object.keys(data)
                                .filter(key => key === "firstname" || key === "lastname");

                            const sent_data = {} as UserDataState;
                            filtered_keys.forEach(key => {
                                sent_data[key as keyof UserDataState] = data[key];
                            });

                            dispatch(setUserLogged(sent_data));
                            dispatch(userProfileFormReceived());
                            setTimeout(() => {
                                dispatch(userProfileSaved());
                            }, 3000);
                        }).catch((error: AxiosError) => {
                            const response = error.response;
                            console.log(response);
                        });
                });

        } else {
            Axios.put(`${process.env.REACT_APP_HIRECAR_API_URI}/users/${data.id}`, data)
                .then(() => {
                    const filtered_keys = Object.keys(data)
                        .filter(key => key === "firstname" || key === "lastname");

                    const sent_data = {} as UserDataState;
                    filtered_keys.forEach(key => {
                        sent_data[key as keyof UserDataState] = data[key];
                    });

                    dispatch(setUserLogged(sent_data));
                    dispatch(userProfileFormReceived());

                }).catch((error: AxiosError) => {
                    const response = error.response;
                    console.log(response);
                });
        }
    };
}