import { ChangeUserProfileTabAction, CHANGE_USER_PROFILE_TAB } from "./types";


export function changeUserProfileTab(active_tab_key: string): ChangeUserProfileTabAction {
    return {
        type: CHANGE_USER_PROFILE_TAB,
        active_tab_key
    }
}