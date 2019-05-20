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
export interface SetUserSignedAction {
    type: typeof SET_USER_LOGGED,
    user: UserDataState
}

export type UserActionTypes = SetUserSignedAction;