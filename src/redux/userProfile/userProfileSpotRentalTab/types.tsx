import { ParkingSpot } from "../../carSearch/types";
import { ToggleModalAction } from "../../navbar/types";

export interface UserProfileTabSpotRentalState {
    parking_spot_rentals: ParkingSpot[],
    fetching: boolean,
    show_delete_spot_rental_modal: boolean,
    deleting: boolean,
    selected_spot_rental_id: number
}

export const defaultUserProfileTabSpotRentalState: UserProfileTabSpotRentalState = {
    parking_spot_rentals: [],
    fetching: false,
    show_delete_spot_rental_modal: false,
    deleting: false,
    selected_spot_rental_id: 0
}

export const USER_PROFILE_SPOT_RENTALS_SENT = "USER_PROFILE_SPOT_RENTALS_SENT";
export interface UserProfileSpotRentalsSentAction {
    type: typeof USER_PROFILE_SPOT_RENTALS_SENT
}

export const USER_PROFILE_SPOT_RENTALS_RECEIVED = "USER_PROFILE_SPOT_RENTALS_RECEIVED";
export interface UserProfileSpotRentalsReceivedAction {
    type: typeof USER_PROFILE_SPOT_RENTALS_RECEIVED,
    spot_rentals: ParkingSpot[]
}

export const DELETE_USER_PROFILE_SPOT_RENTAL = "DELETE_USER_PROFILE_SPOT_RENTAL";
export interface DeleteUserProfileSpotRentalAction {
    type: typeof DELETE_USER_PROFILE_SPOT_RENTAL,
    id: number
}

export const CANCEL_DELETE_USER_PROFILE_SPOT_RENTAL = "CANCEL_DELETE_USER_PROFILE_SPOT_RENTAL";
export interface CancelDeleteUserProfileSpotRentalAction {
    type: typeof CANCEL_DELETE_USER_PROFILE_SPOT_RENTAL
}

export const DELETE_USER_PROFILE_SPOT_RENTAL_SENT = "DELETE_USER_PROFILE_SPOT_RENTAL_SENT";
export interface DeleteUserProfileSpotRentalSentAction {
    type: typeof DELETE_USER_PROFILE_SPOT_RENTAL_SENT
}

export const DELETE_USER_PROFILE_SPOT_RENTAL_RECEIVED = "DELETE_USER_PROFILE_SPOT_RENTAL_RECEIVED";
export interface DeleteUserProfileSpotRentalReceivedAction {
    type: typeof DELETE_USER_PROFILE_SPOT_RENTAL_RECEIVED,
    id: number
}

export type UserProfileSpotRentalsActionTypes = UserProfileSpotRentalsSentAction | UserProfileSpotRentalsReceivedAction | DeleteUserProfileSpotRentalAction | DeleteUserProfileSpotRentalSentAction | DeleteUserProfileSpotRentalReceivedAction | ToggleModalAction | CancelDeleteUserProfileSpotRentalAction;