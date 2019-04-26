import { RentCarTabState, defaultRentCarTabState, UpdateCarSearchAction } from "../rentCarTab/types";
import { defaultRentParkingTabState, RentParkingTabState, UpdateParkingSearchAction } from "../rentParkingTab/types";

export interface RentTabsState {
    rent_parking_spot_tab: RentParkingTabState,
    rent_car_tab: RentCarTabState,
    active_tab_key: string
}

export const defaultRentTabsState: RentTabsState = {
    rent_parking_spot_tab: defaultRentParkingTabState,
    rent_car_tab: defaultRentCarTabState,
    active_tab_key: 'rent_parking_spot'
};

export const CHANGE_RENT_TAB = "CHANGE_RENT_TAB";

export interface ChangeRentTabAction {
    type: typeof CHANGE_RENT_TAB,
    active_tab_key: string
}

export type RentTabsActionTypes = ChangeRentTabAction | UpdateParkingSearchAction | UpdateCarSearchAction;