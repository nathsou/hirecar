export interface SignUpTabState {
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    password: string,
    confirm_password: string,
    form_errors: {
        firstname_error: string,
        lastname_error: string,
        email_error: string,
        phone_error: string,
        password_error: string,
        confirm_password_error: string,
        [key: string]: string
    },
    valid_form: boolean
}

export const defaultSignUpTabState: SignUpTabState = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    form_errors: {
        firstname_error: '',
        lastname_error: '',
        email_error: '',
        phone_error: '',
        password_error: '',
        confirm_password_error: '',
    },
    valid_form: false
}

export const UPDATE_SIGNUP_FIRSTNAME_INPUT = "UPDATE_SIGNUP_FIRSTNAME_INPUT";
export interface UpdateSignUpFirstnameAction {
    type: typeof UPDATE_SIGNUP_FIRSTNAME_INPUT,
    value: string
}

export const UPDATE_SIGNUP_LASTNAME_INPUT = "UPDATE_SIGNUP_LASTNAME_INPUT";
export interface UpdateSignUpLastnameAction {
    type: typeof UPDATE_SIGNUP_LASTNAME_INPUT,
    value: string
}

export const UPDATE_SIGNUP_EMAIL_INPUT = "UPDATE_SIGNUP_EMAIL_INPUT";
export interface UpdateSignUpEmailAction {
    type: typeof UPDATE_SIGNUP_EMAIL_INPUT,
    value: string
}

export const UPDATE_SIGNUP_PHONE_INPUT = "UPDATE_SIGNUP_PHONE_INPUT";
export interface SignUpUpdatePhoneAction {
    type: typeof UPDATE_SIGNUP_PHONE_INPUT,
    value: string
}

export const UPDATE_SIGNUP_PASSWORD_INPUT = "UPDATE_SIGNUP_PASSWORD_INPUT";
export interface UpdateSignUpPasswordAction {
    type: typeof UPDATE_SIGNUP_PASSWORD_INPUT,
    value: string
}

export const UPDATE_SIGNUP_CONFIRMPASSWORD_INPUT = "UPDATE_SIGNUP_CONFIRMPASSWORD_INPUT";
export interface UpdateSignUpConfirmPasswordAction {
    type: typeof UPDATE_SIGNUP_CONFIRMPASSWORD_INPUT,
    value: string
}

export const SUBMIT_SIGNUP_FORM = "SUBMIT_SIGNUP_FORM";
export interface SubmitSignUpAction {
    type: typeof SUBMIT_SIGNUP_FORM
}

export type SignUpActionTypes = UpdateSignUpFirstnameAction | UpdateSignUpLastnameAction | UpdateSignUpEmailAction | SignUpUpdatePhoneAction | UpdateSignUpPasswordAction | UpdateSignUpConfirmPasswordAction | SubmitSignUpAction;