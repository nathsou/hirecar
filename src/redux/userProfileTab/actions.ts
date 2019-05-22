import { UpdateUserProfileFirstnameAction, UPDATE_USER_PROFILE_FIRSTNAME_INPUT, SET_USER_PROFILE, SetUserProfileAction, UserProfileFormDataState, UpdateUserProfileLastnameAction, UPDATE_USER_PROFILE_LASTNAME_INPUT, UpdateUserProfilePhoneAction, UPDATE_USER_PROFILE_PHONE_INPUT, UpdateUserProfileEmailAction, UPDATE_USER_PROFILE_EMAIL_INPUT, UserProfileActionTypes, UserProfileReceivedAction, USER_PROFILE_FORM_RECEIVED, UserProfileSentAction, USER_PROFILE_FORM_SENT, SubmitUserProfileAction, SUMBIT_USER_PROFILE } from "./types";
import { Dispatch } from "react";
import Axios, { AxiosResponse, AxiosError } from "axios";

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

export function postUserProfileForm(data: UserProfileFormDataState) {
    return (dispatch: Dispatch<UserProfileActionTypes>) => {
        dispatch(userProfileFormSent());

        Axios.post(`${process.env.REACT_APP_HIRECAR_API_URI}/users/`, data)
            .then((res: AxiosResponse) => {
                console.log(res)
                dispatch(userProfileFormReceived());
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response)
            });
    };
}