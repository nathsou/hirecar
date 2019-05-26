import { defaultUserState, RESET_USER_LOGGED, SET_USER_LOGGED, UserActionTypes, UserState } from "./types";

export function userReducer(
    state = defaultUserState,
    action: UserActionTypes
): UserState {
    switch (action.type) {
        case SET_USER_LOGGED:
            const { id, firstname, lastname } = action.user;
            return {
                ...state,
                logged_in: true,
                data: {
                    id, firstname, lastname
                }
            };
        case RESET_USER_LOGGED:
            return defaultUserState

        default:
            return state;
    }
}