import { UserProfileTabInfoState, defaultUserProfileTabInfoState } from "../userProfile/userProfileInfoTab/types";
import { UserProfileTabCarState, defaultUserProfileTabCarState } from "../userProfile/userProfileCarTab/types";
import { UserProfileTabSpotRentalState, defaultUserProfileTabSpotRentalState } from "../userProfile/userProfileSpotRentalTab/types";
import { UserProfileCarRentalTabState, defaultUserProfileCarRentalTabState } from "../userProfile/userProfileCarRentalTab/types";

export interface UserProfileTabsState {
    user_profile_tab_info: UserProfileTabInfoState,
    user_profile_tab_car: UserProfileTabCarState,
    user_profile_tab_spot_rental: UserProfileTabSpotRentalState,
    user_profile_car_rental_tab: UserProfileCarRentalTabState
    active_tab_key: string
}

export const defaultUserProfileTabsState: UserProfileTabsState = {
    user_profile_tab_info: defaultUserProfileTabInfoState,
    user_profile_tab_car: defaultUserProfileTabCarState,
    user_profile_tab_spot_rental: defaultUserProfileTabSpotRentalState,
    user_profile_car_rental_tab: defaultUserProfileCarRentalTabState,
    active_tab_key: 'user_profile'
}

export const CHANGE_USER_PROFILE_TAB = "CHANGE_USER_PROFILE_TAB";
export interface ChangeUserProfileTabAction {
    type: typeof CHANGE_USER_PROFILE_TAB,
    active_tab_key: string
}

export type UserProfileTabsActionTypes = ChangeUserProfileTabAction;