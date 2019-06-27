import { UserProfileTabsActionTypes, UserProfileTabsState, defaultUserProfileTabsState } from "./types";
import { userProfileTabInfoReducer } from "../userProfile/userProfileInfoTab/reducers";
import { userProfileTabCarReducer } from "../userProfile/userProfileCarTab/reducers";
import { userProfileTabSpotRentalsReducer } from "../userProfile/userProfileSpotRentalTab/reducers";
import { userProfileCarRentalsTabReducer } from "../userProfile/userProfileCarRentalTab/reducers";
import { userProfileAdminTabReducer } from "../userProfile/userProfileAdminTab/reducers";

export function userProfileTabsReducer(
    state = defaultUserProfileTabsState,
    action: UserProfileTabsActionTypes | any
): UserProfileTabsState {
    return {
        user_profile_tab_info: userProfileTabInfoReducer(state.user_profile_tab_info, action),
        user_profile_tab_car: userProfileTabCarReducer(state.user_profile_tab_car, action),
        user_profile_tab_spot_rental: userProfileTabSpotRentalsReducer(state.user_profile_tab_spot_rental, action),
        user_profile_car_rental_tab: userProfileCarRentalsTabReducer(state.user_profile_car_rental_tab, action),
        user_profile_admin_tab: userProfileAdminTabReducer(state.user_profile_admin_tab, action),
        active_tab_key: action.type === 'CHANGE_USER_PROFILE_TAB' ? action.active_tab_key : state.active_tab_key
    }
}