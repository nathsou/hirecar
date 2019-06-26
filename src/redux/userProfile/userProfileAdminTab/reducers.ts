import { defaultUserProfileAdminTabState, UserProfileAdminActionTypes, UserProfileAdminTabState, ADMIN_REQUEST_PARKINGS, ADMIN_PARKINGS_RECEIVED } from "./types";

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
                parking_lots: action.parking_lots,
                fetching_parking_lots: false
            }
        default:
            return state;
    }
}