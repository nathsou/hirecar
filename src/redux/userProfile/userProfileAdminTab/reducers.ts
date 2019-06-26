import { defaultUserProfileAdminTabState, UserProfileAdminActionTypes, UserProfileAdminTabState, ADMIN_REQUEST_PARKINGS, ADMIN_PARKINGS_RECEIVED, TOGGLE_ADMIN_PARKING_MODAL, ADMIN_DELETE_PARKING, CANCEL_ADMIN_DELETE_PARKING, ADMIN_DELETE_PARKING_RECEIVED, ADMIN_DELETE_PARKING_SENT, ADMIN_DELETE_PARKING_ERROR_MSG } from "./types";

export function userProfileAdminTabReducer(
    state = defaultUserProfileAdminTabState,
    action: UserProfileAdminActionTypes
): UserProfileAdminTabState {
    switch (action.type) {
        case ADMIN_REQUEST_PARKINGS:
            return {
                ...state,
                fetching_parking_lots: true
            }
        case ADMIN_PARKINGS_RECEIVED:
            return {
                ...state,
                parking_lots: action.parking_lots,
                fetching_parking_lots: false
            }
        case ADMIN_DELETE_PARKING:
            return {
                ...state,
                selected_parking_id: action.id
            }
        case CANCEL_ADMIN_DELETE_PARKING:
            return {
                ...state,
                show_admin_delete_parking_modal: !state.show_admin_delete_parking_modal,
                error: ""
            }
        case ADMIN_DELETE_PARKING_SENT:
            return {
                ...state,
                deleting: true
            }
        case ADMIN_DELETE_PARKING_RECEIVED:
            const deleted_parkings_data = state.parking_lots.filter(parking => (parking.id !== action.id))
            return {
                ...state,
                deleting: false,
                show_admin_delete_parking_modal: false,
                parking_lots: deleted_parkings_data
            }
        case TOGGLE_ADMIN_PARKING_MODAL:
            return {
                ...state,
                show_admin_delete_parking_modal: action.show
            }
        case ADMIN_DELETE_PARKING_ERROR_MSG:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}