import { ParkingSpot } from "../../carSearch/types";

export interface UserProfileTabSpotRentalState {
    parking_spot_rentals: ParkingSpot[],
    fetching: boolean
}

export const defaultUserProfileTabSpotRentalState: UserProfileTabSpotRentalState = {
    parking_spot_rentals: [],
    fetching: false
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

export type UserProfileSpotRentalsActionTypes = UserProfileSpotRentalsSentAction | UserProfileSpotRentalsReceivedAction;