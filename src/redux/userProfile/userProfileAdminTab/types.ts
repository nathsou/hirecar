import { ParkingLot } from "../../parkingSearch/types";

export interface UserProfileAdminTabState {
    parking_lots: ParkingLot[];
    fetching_parking_lots: boolean,
    show_admin_delete_parking_modal: boolean,
    selected_parking_id: number,
    deleting: boolean,
    error: string
}

export const defaultUserProfileAdminTabState: UserProfileAdminTabState = {
    parking_lots: [],
    fetching_parking_lots: false,
    show_admin_delete_parking_modal: false,
    selected_parking_id: 0,
    deleting: false,
    error: ''
};


export const ADMIN_REQUEST_PARKINGS = 'ADMIN_REQUEST_PARKINGS';
export interface AdminRequestParkingsAction {
    type: typeof ADMIN_REQUEST_PARKINGS
}

export const ADMIN_PARKINGS_RECEIVED = 'ADMIN_PARKINGS_RECEIVED';
export interface AdminParkingsReceivedAction {
    type: typeof ADMIN_PARKINGS_RECEIVED,
    parking_lots: ParkingLot[]
}

export const ADMIN_DELETE_PARKING = "ADMIN_DELETE_PARKING";
export interface AdminDeleteParkingAction {
    type: typeof ADMIN_DELETE_PARKING,
    id: number
}

export const CANCEL_ADMIN_DELETE_PARKING = "CANCEL_ADMIN_DELETE_PARKING";
export interface CancelAdminDeleteParkingAction {
    type: typeof CANCEL_ADMIN_DELETE_PARKING
}

export const TOGGLE_ADMIN_PARKING_MODAL = "TOGGLE_ADMIN_PARKING_MODAL";
export interface ToggleAdminParkingModalAction {
    type: typeof TOGGLE_ADMIN_PARKING_MODAL,
    show: boolean
}

export const ADMIN_DELETE_PARKING_SENT = "ADMIN_DELETE_PARKING_SENT";
export interface AdminDeleteParkingSentAction {
    type: typeof ADMIN_DELETE_PARKING_SENT
}

export const ADMIN_DELETE_PARKING_RECEIVED = "ADMIN_DELETE_PARKING_RECEIVED";
export interface AdminDeleteParkingReceivedAction {
    type: typeof ADMIN_DELETE_PARKING_RECEIVED,
    id: number
}

export const ADMIN_DELETE_PARKING_ERROR_MSG = "ADMIN_DELETE_PARKING_ERROR_MSG";
export interface AdminDeleteParkingErrorAction {
    type: typeof ADMIN_DELETE_PARKING_ERROR_MSG,
    error: string
}

export type UserProfileAdminActionTypes =
    AdminRequestParkingsAction |
    AdminParkingsReceivedAction |
    AdminDeleteParkingAction |
    CancelAdminDeleteParkingAction |
    ToggleAdminParkingModalAction |
    AdminDeleteParkingSentAction |
    AdminDeleteParkingReceivedAction |
    AdminDeleteParkingErrorAction;