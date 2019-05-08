import { HcListItemProps } from "../../components/HcListItem";
import { defaultParkingSearchState, ParkingSearchActionTypes, ParkingSearchState, PARKINGS_RECEIVED, REQUEST_PARKINGS, UPDATE_MAP_VIEWPORT } from "./types";

export function parkingSearchReducer(
    state = defaultParkingSearchState,
    action: ParkingSearchActionTypes
): ParkingSearchState {

    switch (action.type) {
        case UPDATE_MAP_VIEWPORT:
            return {
                ...state,
                viewport: action.viewport
            };

        case REQUEST_PARKINGS:
            return {
                ...state,
                fetching: true
            };

        case PARKINGS_RECEIVED:

            const parkings: HcListItemProps[] = action.parkings.map(p => ({
                title: p.label,
                features: `${p.nb_places} places`,
                footer: `${p.price_per_day} € / jour`
            }));

            return {
                ...state,
                parkings
            };
        default:
            return state;
    }
}