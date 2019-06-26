import { ParkingLot } from "../../parkingSearch/types";

export interface UserProfileAdminTabState {
    parking_lots: ParkingLot[];
    fetching_parking_lots: boolean
}

export const defaultUserProfileAdminTabState: UserProfileAdminTabState = {
    parking_lots: [],
    fetching_parking_lots: false
};


export const ADMIN_REQUEST_PARKINGS = 'ADMIN_REQUEST_PARKINGS';
export const ADMIN_PARKINGS_RECEIVED = 'ADMIN_PARKINGS_RECEIVED';

export interface AdminRequestParkingsAction {
    type: typeof ADMIN_REQUEST_PARKINGS
}
export interface AdminParkingsReceivedAction {
    type: typeof ADMIN_PARKINGS_RECEIVED,
    parking_lots: ParkingLot[]
}

export type UserProfileAdminActionTypes =
    AdminRequestParkingsAction |
    AdminParkingsReceivedAction;