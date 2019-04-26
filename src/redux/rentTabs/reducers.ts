import { rentCarTabReducer } from "../rentCarTab/reducers";
import { rentParkingTabReducer } from "../rentParkingTab/reducers";
import { defaultRentTabsState, RentTabsActionTypes, RentTabsState } from "./types";

export function rentTabsReducer(
    state = defaultRentTabsState,
    action: RentTabsActionTypes | any
): RentTabsState {
    return {
        rent_parking_spot_tab: rentParkingTabReducer(state.rent_parking_spot_tab, action),
        rent_car_tab: rentCarTabReducer(state.rent_car_tab, action),
        active_tab_key: action.type === 'CHANGE_RENT_TAB' ? action.active_tab_key : state.active_tab_key
    }
}