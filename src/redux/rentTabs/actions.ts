import { ChangeRentTabAction, CHANGE_RENT_TAB } from "./types";

export function changeRentTab(active_tab_key: string): ChangeRentTabAction {
    return {
        type: CHANGE_RENT_TAB,
        active_tab_key
    };
}