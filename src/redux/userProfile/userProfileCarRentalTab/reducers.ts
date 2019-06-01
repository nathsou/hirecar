import { defaultUserProfileCarRentalTabState, UserProfileCarRentalsActionTypes, UserProfileCarRentalTabState, USER_PROFILE_CAR_RENTALS_SENT, USER_PROFILE_CAR_RENTALS_RECEIVED, DELETE_USER_PROFILE_CAR_RENTAL, DELETE_USER_PROFILE_CAR_RENTAL_SENT, CANCEL_DELETE_USER_PROFILE_CAR_RENTAL, DELETE_USER_PROFILE_CAR_RENTAL_RECEIVED, TOGGLE_USER_PROFILE_CAR_RENTAL_MODAL } from "./types";

export function userProfileCarRentalsTabReducer(
    state = defaultUserProfileCarRentalTabState,
    action: UserProfileCarRentalsActionTypes
): UserProfileCarRentalTabState {
    switch (action.type) {
        case USER_PROFILE_CAR_RENTALS_SENT:
            return {
                ...state,
                fetching: true
            }
        case USER_PROFILE_CAR_RENTALS_RECEIVED:
            return {
                ...state,
                car_rentals: action.car_rentals,
                fetching: false
            }
        case DELETE_USER_PROFILE_CAR_RENTAL:
            return {
                ...state,
                selected_car_rental_id: action.id
            }
        case DELETE_USER_PROFILE_CAR_RENTAL_SENT:
            return {
                ...state,
                deleting: true
            }
        case DELETE_USER_PROFILE_CAR_RENTAL_RECEIVED:
            const deleted_car_rentals_data = state.car_rentals.filter(car => (car.id !== action.id))
            return {
                ...state,
                deleting: false,
                show_delete_car_rental_modal: false,
                car_rentals: deleted_car_rentals_data
            }
        case TOGGLE_USER_PROFILE_CAR_RENTAL_MODAL:
            return {
                ...state,
                show_delete_car_rental_modal: action.show
            }
        case CANCEL_DELETE_USER_PROFILE_CAR_RENTAL:
            return {
                ...state,
                show_delete_car_rental_modal: false
            }
        default:
            return state;
    }
}