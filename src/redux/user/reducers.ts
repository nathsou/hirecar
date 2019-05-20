import { defaultUserState, UserActionTypes, UserState, SET_USER_LOGGED } from "./types";

export function userReducer(
    state = defaultUserState,
    action: UserActionTypes
): UserState {
    switch (action.type) {
        case SET_USER_LOGGED:
            const { firstname, lastname } = action.user;
            return {
                ...state,
                logged_in: true,
                data: { firstname: firstname, lastname: lastname }
            };
        default:
            return state;
    }
}