import { UserProfileTabsActionTypes, UserProfileTabsState, defaultUserProfileTabsState } from "./types";
import { userProfileTabInfoReducer } from "../userProfile/userProfileTabInfo/reducers";
import { userProfileTabCarReducer } from "../userProfile/userProfileTabCar/reducers";

export function userProfileTabsReducer(
    state = defaultUserProfileTabsState,
    action: UserProfileTabsActionTypes | any
): UserProfileTabsState {
    return {
        user_profile_tab_info: userProfileTabInfoReducer(state.user_profile_tab_info, action),
        user_profile_tab_car: userProfileTabCarReducer(state.user_profile_tab_car, action),
        active_tab_key: action.type === 'CHANGE_USER_PROFILE_TAB' ? action.active_tab_key : state.active_tab_key
    }
}