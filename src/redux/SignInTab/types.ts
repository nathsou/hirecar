export interface SignInFormDataState {
    [index: string]: string;
    email: string,
    password: string
}

export interface SignInTabState {
    form_data: SignInFormDataState,
    form_errors: {
        email_error: string,
        password_error: string,
        [key: string]: string
    },
    validForm: boolean
}

export const defaultSignInTabState: SignInTabState = {
    form_data: {
        email: '',
        password: '',
    },
    form_errors: {
        email_error: '',
        password_error: '',
    },
    validForm: false
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

export type SignInActionTypes = UpdateSignInEmailAction | UpdateSignInPasswordAction | SubmitSignInAction | SignInSentAction | SignInReceivedAction;