import { HcMapViewportProps } from "../../components/HcParkingSearch";

export interface ParkingSearchState {
    parkings: Parking[],
    fetching: boolean,
    viewport: HcMapViewportProps
}

export interface Parking {
    id: number,
    label: string,
    lat: number,
    lng: number,
    price_per_day: number,
    airport_id: number,
    parking_lot_id: number,
    nb_places: number
}

export const defaultParkingSearchState: ParkingSearchState = {
    parkings: [],
    viewport: {
        width: 400,
        height: 400,
        latitude: 47.3,
        longitude: 2.2,
        zoom: 4.8
    },
    fetching: false
};

export const UPDATE_MAP_VIEWPORT = 'UPDATE_MAP_VIEWPORT';
export const REQUEST_PARKINGS = 'REQUEST_PARKINGS';
export const PARKINGS_RECEIVED = 'PARKINGS_RECEIVED';

export interface UpdateMapViewportAction {
    type: typeof UPDATE_MAP_VIEWPORT,
    viewport: HcMapViewportProps
}

export interface RequestParkingsAction {
    type: typeof REQUEST_PARKINGS
}

export interface ParkingsReceivedAction {
    type: typeof PARKINGS_RECEIVED,
    parkings: Parking[]
}

export type ParkingSearchActionTypes = UpdateMapViewportAction | RequestParkingsAction | ParkingsReceivedAction;