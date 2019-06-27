export interface UserDataState {
    id: number,
    firstname: string,
    lastname: string,
    admin: number
}

export interface UserState {
    logged_in: boolean,
    data: UserDataState
}

export const defaultUserState: UserState = {
    logged_in: false,
    data: {
        id: 0,
        firstname: '',
        lastname: '',
        admin: 0
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