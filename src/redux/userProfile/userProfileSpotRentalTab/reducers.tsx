import { UserProfileSpotRentalsActionTypes, defaultUserProfileTabSpotRentalState, UserProfileTabSpotRentalState, USER_PROFILE_SPOT_RENTALS_SENT, USER_PROFILE_SPOT_RENTALS_RECEIVED, DELETE_USER_PROFILE_SPOT_RENTAL, DELETE_USER_PROFILE_SPOT_RENTAL_SENT, DELETE_USER_PROFILE_SPOT_RENTAL_RECEIVED, CANCEL_DELETE_USER_PROFILE_SPOT_RENTAL } from "./types";

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
        case DELETE_USER_PROFILE_SPOT_RENTAL:
            return {
                ...state,
                show_delete_spot_rental_modal: true,
                selected_spot_rental_id: action.id
            }
        case DELETE_USER_PROFILE_SPOT_RENTAL_SENT:
            return {
                ...state,
                deleting: true
            }
        case CANCEL_DELETE_USER_PROFILE_SPOT_RENTAL:
            return {
                ...state,
                deleting: false,
                show_delete_spot_rental_modal: false
            }
        case DELETE_USER_PROFILE_SPOT_RENTAL_RECEIVED:
            const deleted_spot_rentals_data = state.parking_spot_rentals.filter(spot => (spot.id !== action.id))
            return {
                ...state,
                deleting: false,
                show_delete_spot_rental_modal: false,
                parking_spot_rentals: deleted_spot_rentals_data
            }
        default:
            return state;
    }
}