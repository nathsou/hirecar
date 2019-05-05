import { ChangeSignTabAction, CHANGE_SIGN_TAB } from "./types";


export function changeSignTab(active_tab_key: string): ChangeSignTabAction {
    return {
        type: CHANGE_SIGN_TAB,
        active_tab_key
    }
}