import { SetUserSignedAction, SET_USER_LOGGED, UserDataState } from "./types";

export function setUserSigned(user: UserDataState): SetUserSignedAction {
    return {
        type: SET_USER_LOGGED,
        user
    }
}