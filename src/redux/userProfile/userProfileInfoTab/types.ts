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

export interface UserProfileTabInfoState {
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
    social_media_signin: boolean
}

export const defaultUserProfileTabInfoState: UserProfileTabInfoState = {
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
    saving: false,
    social_media_signin: false
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

export const SUMBIT_USER_PROFILE_INFO = "SUMBIT_USER_PROFILE_INFO";
export interface SubmitUserProfileInfoAction {
    type: typeof SUMBIT_USER_PROFILE_INFO
}

export const USER_PROFILE_INFO_FORM_SENT = "USER_PROFILE_INFO_FORM_SENT";
export interface UserProfileInfoSentAction {
    type: typeof USER_PROFILE_INFO_FORM_SENT
}

export const USER_PROFILE_INFO_FORM_RECEIVED = "USER_PROFILE_INFO_FORM_RECEIVED";
export interface UserProfileInfoReceivedAction {
    type: typeof USER_PROFILE_INFO_FORM_RECEIVED
}

export const USER_PROFILE_INFO_SAVED = "USER_PROFILE_INFO_SAVED";
export interface UserProfileInfoSavedAction {
    type: typeof USER_PROFILE_INFO_SAVED
}

export const RESET_USER_PROFILE_PASSWORD = "RESET_USER_PROFILE_PASSWORD";
export interface ResetUserProfilePasswordAction {
    type: typeof RESET_USER_PROFILE_PASSWORD
}

export const SOCIAL_MEDIA_SIGNIN = "WEBSERVICE_SIGNIN";
export interface SocialMediaSignInAction {
    type: typeof SOCIAL_MEDIA_SIGNIN
}

export type UserProfileInfoActionTypes =
    SetUserProfileAction |
    UpdateUserProfileFirstnameAction |
    UpdateUserProfileLastnameAction |
    UpdateUserProfileEmailAction |
    UpdateUserProfilePhoneAction |
    UpdateUserProfilePasswordAction |
    UpdateUserProfileNewPasswordAction |
    UpdateUserProfilePasswordErrorAction |
    SubmitUserProfileInfoAction |
    UserProfileInfoSentAction |
    UserProfileInfoReceivedAction |
    SetUserLoggedAction |
    UserProfileInfoSavedAction |
    ResetUserProfilePasswordAction |
    SocialMediaSignInAction;
