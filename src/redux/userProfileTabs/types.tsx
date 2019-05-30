import { UserProfileTabInfoState, defaultUserProfileTabInfoState } from "../userProfile/userProfileTabInfo/types";
import { UserProfileTabCarState, defaultUserProfileTabCarState } from "../userProfile/userProfileTabCar/types";

export interface UserProfileTabsState {
    user_profile_tab_info: UserProfileTabInfoState,
    user_profile_tab_car: UserProfileTabCarState
    active_tab_key: string
}

export const defaultUserProfileTabsState: UserProfileTabsState = {
    user_profile_tab_info: defaultUserProfileTabInfoState,
    user_profile_tab_car: defaultUserProfileTabCarState,
    active_tab_key: 'user_profile'
}

export const CHANGE_USER_PROFILE_TAB = "CHANGE_USER_PROFILE_TAB";
export interface ChangeUserProfileTabAction {
    type: typeof CHANGE_USER_PROFILE_TAB,
    active_tab_key: string
}

export type UserProfileTabsActionTypes = ChangeUserProfileTabAction;