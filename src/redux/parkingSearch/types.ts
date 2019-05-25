import { HcMapViewportProps } from "../../components/ParkingSearch/HcParkingSearch";

export interface ParkingSearchState {
    parking_lots: ParkingLot[],
    airports: Airport[],
    fetching_parking_lots: boolean,
    fetching_airports: boolean,
    viewport: HcMapViewportProps,
    selected_parking_lot: number | null
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
    airports: [],
    viewport: {
        width: '100%',
        height: '100%',
        latitude: 47.3,
        longitude: 2.2,
        zoom: 4.8
    },
    fetching_parking_lots: false,
    fetching_airports: false,
    selected_parking_lot: null
};

export const UPDATE_MAP_VIEWPORT = 'UPDATE_MAP_VIEWPORT';
export const REQUEST_PARKINGS = 'REQUEST_PARKINGS';
export const REQUEST_AIRPORTS = 'REQUEST_AIRPORTS';
export const PARKINGS_RECEIVED = 'PARKINGS_RECEIVED';
export const AIRPORTS_RECEIVED = 'AIRPORTS_RECEIVED';
export const SET_SELECTED_PARKING_LOT = 'SET_SELECTED_PARKING_LOT';

export interface UpdateMapViewportAction {
    type: typeof UPDATE_MAP_VIEWPORT,
    viewport: HcMapViewportProps
}

export interface RequestParkingsAction {
    type: typeof REQUEST_PARKINGS
}

export interface RequestAirportsAction {
    type: typeof REQUEST_AIRPORTS
}

export interface ParkingsReceivedAction {
    type: typeof PARKINGS_RECEIVED,
    parking_lots: ParkingLot[]
}

export interface AirportsReceivedAction {
    type: typeof AIRPORTS_RECEIVED,
    airports: Airport[]
}

export interface SetSelectedParkingLotAction {
    type: typeof SET_SELECTED_PARKING_LOT,
    parking_lot: number | null
}

export type ParkingSearchActionTypes =
    UpdateMapViewportAction |
    RequestParkingsAction |
    ParkingsReceivedAction |
    SetSelectedParkingLotAction |
    RequestAirportsAction |
    AirportsReceivedAction;