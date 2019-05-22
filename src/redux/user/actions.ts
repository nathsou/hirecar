import { SetUserLoggedAction, SET_USER_LOGGED, UserDataState, ResetUserLoggedAction, RESET_USER_LOGGED } from "./types";

export function setUserLogged(user: UserDataState): SetUserLoggedAction {
    return {
        type: SET_USER_LOGGED,
        user
    }
}

export function resetUserLogged(): ResetUserLoggedAction {
    return {
        type: RESET_USER_LOGGED
    }
}