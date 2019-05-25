import { UpdateUserProfileFirstnameAction, UPDATE_USER_PROFILE_FIRSTNAME_INPUT, SET_USER_PROFILE, SetUserProfileAction, UserProfileInfoFormDataState, UpdateUserProfileLastnameAction, UPDATE_USER_PROFILE_LASTNAME_INPUT, UpdateUserProfilePhoneAction, UPDATE_USER_PROFILE_PHONE_INPUT, UpdateUserProfileEmailAction, UPDATE_USER_PROFILE_EMAIL_INPUT, UserProfileInfoActionTypes, UserProfileInfoReceivedAction, USER_PROFILE_INFO_FORM_RECEIVED, UserProfileInfoSentAction, USER_PROFILE_INFO_FORM_SENT, SubmitUserProfileInfoAction, SUMBIT_USER_PROFILE_INFO, UPDATE_USER_PROFILE_NEW_PASSWORD_INPUT, UpdateUserProfileNewPasswordAction, UserProfileInfoSavedAction, USER_PROFILE_INFO_SAVED, UpdateUserProfilePasswordAction, UPDATE_USER_PROFILE_PASSWORD_INPUT, UPDATE_USER_PROFILE_PASSWORD_ERROR, UpdateUserProfilePasswordErrorAction, ResetUserProfilePasswordAction, RESET_USER_PROFILE_PASSWORD } from "./types";
import { Dispatch } from "react";
import Axios, { AxiosError } from "axios";
import bcrypt from "bcryptjs";
import { UserDataState } from "../../user/types";
import { setUserLogged } from "../../user/actions";

export function setUserProfileInfo(user: UserProfileInfoFormDataState): SetUserProfileAction {
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

export function updateUserProfilePasswordInput(value: string): UpdateUserProfilePasswordAction {
    return {
        type: UPDATE_USER_PROFILE_PASSWORD_INPUT,
        value
    };
}

export function updateUserProfileNewPasswordInput(value: string): UpdateUserProfileNewPasswordAction {
    return {
        type: UPDATE_USER_PROFILE_NEW_PASSWORD_INPUT,
        value
    };
}

export function updateUserProfilePasswordErrorInput(error: string): UpdateUserProfilePasswordErrorAction {
    return {
        type: UPDATE_USER_PROFILE_PASSWORD_ERROR,
        error
    };
}


export function submitUserProfileInfoForm(): SubmitUserProfileInfoAction {
    return {
        type: SUMBIT_USER_PROFILE_INFO
    }
}

export function userProfileInfoFormSent(): UserProfileInfoSentAction {
    return {
        type: USER_PROFILE_INFO_FORM_SENT
    };
}

export function userProfileInfoFormReceived(): UserProfileInfoReceivedAction {
    return {
        type: USER_PROFILE_INFO_FORM_RECEIVED
    };
}

export function userProfileInfoSaved(): UserProfileInfoSavedAction {
    return {
        type: USER_PROFILE_INFO_SAVED
    }
}

export function resetUserProfilePassword(): ResetUserProfilePasswordAction {
    return {
        type: RESET_USER_PROFILE_PASSWORD
    }
}

export function postUserProfileInfoForm(data: UserProfileInfoFormDataState) {
    const salt: string = (process.env.REACT_APP_BCRYPT_SALT as string).replace(/_/g, '$');

    return (dispatch: Dispatch<UserProfileInfoActionTypes>) => {
        dispatch(userProfileInfoFormSent());

        bcrypt.hash(data.password, salt)
            .then(hashed_pwd => {
                const sent_pwd_data: { [index: string]: string; } = {};
                Object.keys(data).forEach(key => {
                    sent_pwd_data[key] = key === 'password' ? hashed_pwd : data[key]
                });

                if (data.new_password) {
                    bcrypt.hash(data.new_password, salt)
                        .then(hashed_new_pwd => {

                            const sent_new_pwd_data: { [index: string]: string; } = {};
                            Object.keys(sent_pwd_data).forEach(key => {
                                sent_new_pwd_data[key] = key === 'new_password' ? hashed_new_pwd : sent_pwd_data[key]
                            });
                            sentUserProfileForm(dispatch, data, sent_new_pwd_data);
                        })
                } else {
                    sentUserProfileForm(dispatch, data, sent_pwd_data);
                }
            });
    }
}

export function sentUserProfileForm(
    dispatch: Dispatch<UserProfileInfoActionTypes>,
    data: UserProfileInfoFormDataState,
    sent_pwd_data: { [index: string]: string; }
) {
    Axios.put(`${process.env.REACT_APP_HIRECAR_API_URI}/users/${data.id}`, sent_pwd_data)
        .then(() => {

            const filtered_keys = Object.keys(data)
                .filter(key => key === "firstname" || key === "lastname");

            const sent_data = {} as UserDataState;
            filtered_keys.forEach(key => {
                sent_data[key as keyof UserDataState] = data[key];
            });

            dispatch(setUserLogged(sent_data));
            dispatch(userProfileInfoFormReceived());
            dispatch(resetUserProfilePassword());
            setTimeout(() => {
                dispatch(userProfileInfoSaved());
            }, 3000);

        }).catch((error: AxiosError) => {
            const response = error.response;
            if (response !== undefined && response.status === 400) {
                const { password_error } = response.data;
                if (password_error) {
                    dispatch(updateUserProfilePasswordErrorInput(password_error));
                }
            }
        });
}