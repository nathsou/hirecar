export interface SignUpState {
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
    formErrors: {
        firstnameError: string,
        lastnameError: string,
        emailError: string,
        phoneError: string,
        passwordError: string,
        confirmPasswordError: string,
        [key: string]: string
    },
    validForm: boolean
}

export const defaultSignUpState: SignUpState = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    formErrors: {
        firstnameError: '',
        lastnameError: '',
        emailError: '',
        phoneError: '',
        passwordError: '',
        confirmPasswordError: '',
    },
    validForm: false
}

export const UPDATE_FIRSTNAME_INPUT = "UPDATE_FIRSTNAME_INPUT";
export interface UpdateFirstnameAction {
    type: typeof UPDATE_FIRSTNAME_INPUT,
    value: string
}

export const UPDATE_LASTNAME_INPUT = "UPDATE_LASTNAME_INPUT";
export interface UpdateLastnameAction {
    type: typeof UPDATE_LASTNAME_INPUT,
    value: string
}

export const UPDATE_EMAIL_INPUT = "UPDATE_EMAIL_INPUT";
export interface UpdateEmailAction {
    type: typeof UPDATE_EMAIL_INPUT,
    value: string
}

export const UPDATE_PHONE_INPUT = "UPDATE_PHONE_INPUT";
export interface UpdatePhoneAction {
    type: typeof UPDATE_PHONE_INPUT,
    value: string
}

export const UPDATE_PASSWORD_INPUT = "UPDATE_PASSWORD_INPUT";
export interface UpdatePasswordAction {
    type: typeof UPDATE_PASSWORD_INPUT,
    value: string
}

export const UPDATE_CONFIRMPASSWORD_INPUT = "UPDATE_CONFIRMPASSWORD_INPUT";
export interface UpdateConfirmPasswordAction {
    type: typeof UPDATE_CONFIRMPASSWORD_INPUT,
    value: string
}

export const SUBMIT_SIGNUP_FORM = "SUBMIT_SIGNUP_FORM";
export interface SubmitSignUpAction {
    type: typeof SUBMIT_SIGNUP_FORM
}

export const CHANGE_SIGNUP_TAB = "CHANGE_SIGNUP_TAB";
export interface ChangeSignUpTabAction {
    type: typeof CHANGE_SIGNUP_TAB
}

export type SignUpActionTypes = UpdateFirstnameAction | UpdateLastnameAction | UpdateEmailAction | UpdatePhoneAction | UpdatePasswordAction | UpdateConfirmPasswordAction | SubmitSignUpAction | ChangeSignUpTabAction;