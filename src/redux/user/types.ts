export interface UserDataState {
    firstname: string,
    lastname: string
}

export interface UserState {
    logged_in: boolean,
    data: UserDataState
}

export const defaultUserState: UserState = {
    logged_in: false,
    data: {
        firstname: '',
        lastname: ''
    }
}

export const SET_USER_LOGGED = "SET_USER_LOGGED";
export interface SetUserLoggedAction {
    type: typeof SET_USER_LOGGED,
    user: UserDataState
}

export const RESET_USER_LOGGED = "RESET_USER_LOGGED";
export interface ResetUserLoggedAction {
    type: typeof RESET_USER_LOGGED
}

export type UserActionTypes = SetUserLoggedAction | ResetUserLoggedAction;