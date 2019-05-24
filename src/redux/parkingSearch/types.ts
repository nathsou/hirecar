import { HcMapViewportProps } from "../../components/ParkingSearch/HcParkingSearch";

export interface ParkingSearchState {
    parking_lots: ParkingLot[],
    fetching: boolean,
    viewport: HcMapViewportProps
}

export interface ParkingLot {
    id: number;
    label: string;
    lat: number;
    lng: number;
    capacity: number;
    price_per_day: number;
    airport: Airport;
}

export interface Airport {
    id: number;
    name: string;
    lat: number;
    lng: number;
}

export const defaultParkingSearchState: ParkingSearchState = {
    parking_lots: [],
    viewport: {
        width: '100%',
        height: '100%',
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
    parkings_lots: ParkingLot[]
}

export type ParkingSearchActionTypes = UpdateMapViewportAction | RequestParkingsAction | ParkingsReceivedAction;