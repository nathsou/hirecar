import { ToggleSignModalAction } from "../navbar/types";
import { SetUserLoggedAction } from "../user/types";
import { SetUserProfileAction, SocialMediaSignInAction } from "../userProfile/userProfileInfoTab/types";
import { SetUserProfileCarOwnerAction } from "../userProfile/userProfileCarTab/types";
import { GoogleLoginResponse } from "react-google-login";
import { IdentifiedType } from "../carSearch/types";
export interface SignInFormDataState {
    [index: string]: string | IdentifiedType;
    email: string,
    password: string,
    login: IdentifiedType
}

export interface SocialMediaSignInState {
    firstname: string,
    lastname: string,
    email: string,
    login: IdentifiedType
}

export interface SignInTabState {
    form_data: SignInFormDataState,
    form_errors: {
        email_error: string,
        password_error: string,
        [key: string]: string
    },
    validForm: boolean,
    google_data: SocialMediaSignInState
    sending: boolean
}

export const defaultSignInTabState: SignInTabState = {
    form_data: {
        email: '',
        password: '',
        login: {
            id: 1,
            type: "HireCar"
        }
    },
    form_errors: {
        email_error: '',
        password_error: '',
    },
    validForm: false,
    google_data: {
        firstname: '',
        lastname: '',
        email: '',
        login: {
            id: 2,
            type: "Google"
        }
    },
    sending: false
}

export const UPDATE_SIGNIN_EMAIL_INPUT = "UPDATE_SIGNIN_EMAIL_INPUT";
export interface UpdateSignInEmailAction {
    type: typeof UPDATE_SIGNIN_EMAIL_INPUT,
    value: string
}

export const UPDATE_SIGNIN_PASSWORD_INPUT = "UPDATE_SIGNIN_PASSWORD_INPUT";
export interface UpdateSignInPasswordAction {
    type: typeof UPDATE_SIGNIN_PASSWORD_INPUT,
    value: string
}

export const UPDATE_SIGNIN_EMAIL_ERROR = "UPDATE_SIGNIN_EMAIL_ERROR";
export interface UpdateSignInEmailErrorAction {
    type: typeof UPDATE_SIGNIN_EMAIL_ERROR,
    error: string
}

export const UPDATE_SIGNIN_PASSWORD_ERROR = "UPDATE_SIGNIN_PASSWORD_ERROR";
export interface UpdateSignInPasswordErrorAction {
    type: typeof UPDATE_SIGNIN_PASSWORD_ERROR,
    error: string
}

export const SUBMIT_SIGNIN_FORM = "SUBMIT_SIGNIN_FORM";
export interface SubmitSignInAction {
    type: typeof SUBMIT_SIGNIN_FORM
}

export const SIGNIN_FORM_SENT = "SIGNIN_FORM_SENT";
export interface SignInSentAction {
    type: typeof SIGNIN_FORM_SENT
}

export const SIGNIN_FORM_RECEIVED = "SIGNIN_FORM_RECEIVED";
export interface SignInReceivedAction {
    type: typeof SIGNIN_FORM_RECEIVED,
}

export const RESET_SIGNIN_FORM = "RESET_SIGNIN_FORM";
export interface ResetSignInAction {
    type: typeof RESET_SIGNIN_FORM
}

export const SET_GOOGLE_SIGNIN = "SET_GOOGLE_SIGNIN";
export interface SetGoogleSignInAction {
    type: typeof SET_GOOGLE_SIGNIN,
    data: GoogleLoginResponse
}

export const SOCIAL_MEDIA_SIGNIN_SENT = "SOCIAL_MEDIA_SIGNIN_SENT";
export interface SocialMediaSignInSentAction {
    type: typeof SOCIAL_MEDIA_SIGNIN_SENT
}

export const SOCIAL_MEDIA_SIGNIN_RECEIVED = "SOCIAL_MEDIA_SIGNIN_RECEIVED";
export interface SocialMediaSignInReceivedAction {
    type: typeof SOCIAL_MEDIA_SIGNIN_RECEIVED
}

export type SignInActionTypes =
    UpdateSignInEmailAction |
    UpdateSignInPasswordAction |
    UpdateSignInEmailErrorAction | UpdateSignInPasswordErrorAction |
    SubmitSignInAction |
    SignInSentAction |
    SignInReceivedAction |
    ResetSignInAction | ToggleSignModalAction |
    SetUserLoggedAction |
    SetUserProfileAction |
    SetUserProfileCarOwnerAction |
    SetGoogleSignInAction | SocialMediaSignInSentAction |
    SocialMediaSignInReceivedAction |
    SocialMediaSignInAction;