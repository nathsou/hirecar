import { UserProfileSpotRentalsActionTypes, defaultUserProfileTabSpotRentalState, UserProfileTabSpotRentalState, USER_PROFILE_SPOT_RENTALS_SENT, USER_PROFILE_SPOT_RENTALS_RECEIVED } from "./types";

export function userProfileTabSpotRentalsReducer(
    state = defaultUserProfileTabSpotRentalState,
    action: UserProfileSpotRentalsActionTypes
): UserProfileTabSpotRentalState {
    switch (action.type) {
        case USER_PROFILE_SPOT_RENTALS_SENT:
            return {
                ...state,
                fetching: true
            }
        case USER_PROFILE_SPOT_RENTALS_RECEIVED:
            return {
                ...state,
                parking_spot_rentals: action.spot_rentals,
                fetching: false
            }
        default:
            return state;
    }
}