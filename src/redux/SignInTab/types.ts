export interface SignInTabState {
    email: string,
    password: string,
    formErrors: {
        emailError: string,
        passwordError: string,
        [key: string]: string
    },
    validForm: boolean
}

export const defaultSignInTabState: SignInTabState = {
    email: '',
    password: '',
    formErrors: {
        emailError: '',
        passwordError: '',
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