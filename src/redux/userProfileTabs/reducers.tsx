import { UserProfileTabsActionTypes, UserProfileTabsState, defaultUserProfileTabsState } from "./types";
import { userProfileTabInfoReducer } from "../userProfile/userProfileTabInfo/reducers";
import { userProfileTabCarReducer } from "../userProfile/userProfileTabCar/reducers";
import { userProfileTabSpotRentalsReducer } from "../userProfile/userProfileTabSpotRental/reducers";

export function userProfileTabsReducer(
    state = defaultUserProfileTabsState,
    action: UserProfileTabsActionTypes | any
): UserProfileTabsState {
    return {
        user_profile_tab_info: userProfileTabInfoReducer(state.user_profile_tab_info, action),
        user_profile_tab_car: userProfileTabCarReducer(state.user_profile_tab_car, action),
        user_profile_tab_spot_rental: userProfileTabSpotRentalsReducer(state.user_profile_tab_spot_rental, action),
        active_tab_key: action.type === 'CHANGE_USER_PROFILE_TAB' ? action.active_tab_key : state.active_tab_key
    }
}