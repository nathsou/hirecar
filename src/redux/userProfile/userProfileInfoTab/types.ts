import { SetUserLoggedAction } from "../../user/types";

export interface UserProfileInfoFormDataState {
    [index: string]: string;
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    password: string,
    new_password: string,
}

export interface UserProfileInfoTabState {
    form_data: UserProfileInfoFormDataState,
    form_errors: {
        firstname_error: string,
        lastname_error: string,
        email_error: string,
        phone_error: string,
        password_error: string,
        new_password_error: string,
        [key: string]: string
    },
    valid_form: boolean,
    sending: boolean,
    editing: boolean,
    saving: boolean,
}

export const defaultUserProfileInfoTabState: UserProfileInfoTabState = {
    form_data: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        new_password: '',
    },
    form_errors: {
        firstname_error: '',
        lastname_error: '',
        email_error: '',
        phone_error: '',
        password_error: '',
        new_password_error: '',
    },
    valid_form: false,
    sending: false,
    editing: false,
    saving: false
}

export const SET_USER_PROFILE = "SET_USER_PROFILE";
export interface SetUserProfileAction {
    type: typeof SET_USER_PROFILE,
    user: UserProfileInfoFormDataState
}

export const UPDATE_USER_PROFILE_FIRSTNAME_INPUT = "UPDATE_USER_PROFILE_FIRSTNAME_INPUT";
export interface UpdateUserProfileFirstnameAction {
    type: typeof UPDATE_USER_PROFILE_FIRSTNAME_INPUT,
    value: string
}

export const UPDATE_USER_PROFILE_LASTNAME_INPUT = "UPDATE_USER_PROFILE_LASTNAME_INPUT";
export interface UpdateUserProfileLastnameAction {
    type: typeof UPDATE_USER_PROFILE_LASTNAME_INPUT,
    value: string
}

export const UPDATE_USER_PROFILE_EMAIL_INPUT = "UPDATE_USER_PROFILE_EMAIL_INPUT";
export interface UpdateUserProfileEmailAction {
    type: typeof UPDATE_USER_PROFILE_EMAIL_INPUT,
    value: string
}

export const UPDATE_USER_PROFILE_PHONE_INPUT = "UPDATE_USER_PROFILE_PHONE_INPUT";
export interface UpdateUserProfilePhoneAction {
    type: typeof UPDATE_USER_PROFILE_PHONE_INPUT,
    value: string
}

export const UPDATE_USER_PROFILE_PASSWORD_INPUT = "UPDATE_USER_PROFILE_PASSWORD_INPUT";
export interface UpdateUserProfilePasswordAction {
    type: typeof UPDATE_USER_PROFILE_PASSWORD_INPUT,
    value: string
}

export const UPDATE_USER_PROFILE_NEW_PASSWORD_INPUT = "UPDATE_USER_PROFILE_NEW_PASSWORD_INPUT";
export interface UpdateUserProfileNewPasswordAction {
    type: typeof UPDATE_USER_PROFILE_NEW_PASSWORD_INPUT,
    value: string
}

export const UPDATE_USER_PROFILE_PASSWORD_ERROR = "UPDATE_USER_PROFILE_PASSWORD_ERROR";
export interface UpdateUserProfilePasswordErrorAction {
    type: typeof UPDATE_USER_PROFILE_PASSWORD_ERROR,
    error: string
}

export const SUMBIT_USER_PROFILE = "SUMBIT_USER_PROFILE";
export interface SubmitUserProfileAction {
    type: typeof SUMBIT_USER_PROFILE
}

export const USER_PROFILE_FORM_SENT = "USER_PROFILE_FORM_SENT";
export interface UserProfileSentAction {
    type: typeof USER_PROFILE_FORM_SENT
}

export const USER_PROFILE_FORM_RECEIVED = "USER_PROFILE_FORM_RECEIVED";
export interface UserProfileReceivedAction {
    type: typeof USER_PROFILE_FORM_RECEIVED
}

export const USER_PROFILE_SAVED = "USER_PROFILE_SAVED";
export interface UserProfileSavedAction {
    type: typeof USER_PROFILE_SAVED
}

export const RESET_USER_PROFILE_PASSWORD = "RESET_USER_PROFILE_PASSWORD";
export interface ResetUserProfilePasswordAction {
    type: typeof RESET_USER_PROFILE_PASSWORD
}

export type UserProfileInfoActionTypes = SetUserProfileAction | UpdateUserProfileFirstnameAction | UpdateUserProfileLastnameAction | UpdateUserProfileEmailAction | UpdateUserProfilePhoneAction | UpdateUserProfilePasswordAction | UpdateUserProfileNewPasswordAction | UpdateUserProfilePasswordErrorAction | SubmitUserProfileAction | UserProfileSentAction | UserProfileReceivedAction | SetUserLoggedAction | UserProfileSavedAction | ResetUserProfilePasswordAction;
