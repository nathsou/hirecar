import { CarRental } from "../../carSearch/types";

export interface UserProfileCarRentalTabState {
    car_rentals: CarRental[],
    fetching: boolean,
    show_delete_car_rental_modal: boolean,
    deleting: boolean,
    selected_car_rental_id: number
}

export const defaultUserProfileCarRentalTabState: UserProfileCarRentalTabState = {
    car_rentals: [],
    fetching: false,
    show_delete_car_rental_modal: false,
    deleting: false,
    selected_car_rental_id: 0
}

export const USER_PROFILE_CAR_RENTALS_SENT = "USER_PROFILE_CAR_RENTALS_SENT";
export interface UserProfileCarRentalsSentAction {
    type: typeof USER_PROFILE_CAR_RENTALS_SENT
}

export const USER_PROFILE_CAR_RENTALS_RECEIVED = "USER_PROFILE_CAR_RENTALS_RECEIVED";
export interface UserProfileCarRentalsReceivedAction {
    type: typeof USER_PROFILE_CAR_RENTALS_RECEIVED,
    car_rentals: CarRental[]
}

export const DELETE_USER_PROFILE_CAR_RENTAL = "DELETE_USER_PROFILE_CAR_RENTAL";
export interface DeleteUserProfileCarRentalAction {
    type: typeof DELETE_USER_PROFILE_CAR_RENTAL,
    id: number
}

export const CANCEL_DELETE_USER_PROFILE_CAR_RENTAL = "CANCEL_DELETE_USER_PROFILE_CAR_RENTAL";
export interface CancelDeleteUserProfileCarRentalAction {
    type: typeof CANCEL_DELETE_USER_PROFILE_CAR_RENTAL
}

export const DELETE_USER_PROFILE_CAR_RENTAL_SENT = "DELETE_USER_PROFILE_CAR_RENTAL_SENT";
export interface DeleteUserProfileCarRentalSentAction {
    type: typeof DELETE_USER_PROFILE_CAR_RENTAL_SENT
}

export const DELETE_USER_PROFILE_CAR_RENTAL_RECEIVED = "DELETE_USER_PROFILE_CAR_RENTAL_RECEIVED";
export interface DeleteUserProfileCarRentalReceivedAction {
    type: typeof DELETE_USER_PROFILE_CAR_RENTAL_RECEIVED,
    id: number
}

export const TOGGLE_USER_PROFILE_CAR_RENTAL_MODAL = "TOGGLE_USER_PROFILE_CAR_RENTAL_MODAL";
export interface ToggleUserProfileCarRentalModalAction {
    type: typeof TOGGLE_USER_PROFILE_CAR_RENTAL_MODAL,
    show: boolean
}

export type UserProfileCarRentalsActionTypes =
    UserProfileCarRentalsSentAction |
    UserProfileCarRentalsReceivedAction |
    DeleteUserProfileCarRentalAction |
    CancelDeleteUserProfileCarRentalAction |
    DeleteUserProfileCarRentalSentAction |
    DeleteUserProfileCarRentalReceivedAction |
    ToggleUserProfileCarRentalModalAction;