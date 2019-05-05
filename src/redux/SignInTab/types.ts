export interface SignInTabState {
    email: string,
    password: string,
    form_errors: {
        email_error: string,
        password_error: string,
        [key: string]: string
    },
    validForm: boolean
}

export const defaultSignInTabState: SignInTabState = {
    email: '',
    password: '',
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


export type SignInActionTypes = UpdateSignInEmailAction | UpdateSignInPasswordAction | SubmitSignInAction;