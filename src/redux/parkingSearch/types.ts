import { HcMapViewportProps } from "../../components/ParkingSearch/HcParkingSearch";

export interface ParkingSearchState {
    parking_lots: ParkingLot[],
    airports: Airport[],
    fetching_parking_lots: boolean,
    fetching_airports: boolean,
    viewport: HcMapViewportProps,
    selected_parking_lot: number | null,
    rent_modal_parking_lot_id: number | null,
    selected_user_car_id: number,
    awaiting_rental_request_response: boolean,
    parking_spot_rental_id: number | null
}

export interface ParkingLot {
    id: number;
    label: string;
    lat?: number;
    lng?: number;
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
    selected_parking_lot: null,
    rent_modal_parking_lot_id: null,
    selected_user_car_id: 0,
    awaiting_rental_request_response: false,
    parking_spot_rental_id: null
};

export const UPDATE_MAP_VIEWPORT = 'UPDATE_MAP_VIEWPORT';
export const REQUEST_PARKINGS = 'REQUEST_PARKINGS';
export const REQUEST_AIRPORTS = 'REQUEST_AIRPORTS';
export const PARKINGS_RECEIVED = 'PARKINGS_RECEIVED';
export const AIRPORTS_RECEIVED = 'AIRPORTS_RECEIVED';
export const SET_SELECTED_PARKING_LOT = 'SET_SELECTED_PARKING_LOT';
export const SET_RENT_MODAL_PARKING_LOT = 'SET_RENT_MODAL_PARKING_LOT';
export const SET_RENT_PARKING_SPOT_USER_CAR_IDX = 'SET_RENT_PARKING_SPOT_USER_CAR_IDX';
export const INSERT_PARKING_SPOT_RENTAL = 'INSERT_PARKING_SPOT_RENTAL';
export const INSERT_PARKING_SPOT_RENTAL_REQUEST_SENT = 'INSERT_PARKING_SPOT_RENTAL_REQUEST_SENT';
export const INSERT_PARKING_SPOT_RENTAL_REQUEST_SUCCEEDED = 'INSERT_PARKING_SPOT_RENTAL_REQUEST_SUCCEEDED';
export const INSERT_PARKING_SPOT_RENTAL_REQUEST_FAILED = 'INSERT_PARKING_SPOT_RENTAL_REQUEST_FAILED';

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

export interface SetRentModalParkingLotAction {
    type: typeof SET_RENT_MODAL_PARKING_LOT,
    parking_lot: number | null
}

export interface SetRentParkingSpotUserCarIdAction {
    type: typeof SET_RENT_PARKING_SPOT_USER_CAR_IDX,
    id: number
}

export interface RentParkingSpotRequestSentAction {
    type: typeof INSERT_PARKING_SPOT_RENTAL_REQUEST_SENT
}

export interface RentParkingSpotRequestSucceededAction {
    type: typeof INSERT_PARKING_SPOT_RENTAL_REQUEST_SUCCEEDED,
    parking_spot_rental_id: number
}

export interface RentParkingSpotRequestFailedAction {
    type: typeof INSERT_PARKING_SPOT_RENTAL_REQUEST_FAILED
}

export type ParkingSearchActionTypes =
    UpdateMapViewportAction |
    RequestParkingsAction |
    ParkingsReceivedAction |
    SetSelectedParkingLotAction |
    RequestAirportsAction |
    AirportsReceivedAction |
    SetRentModalParkingLotAction |
    SetRentParkingSpotUserCarIdAction |
    RentParkingSpotRequestSentAction |
    RentParkingSpotRequestSucceededAction |
    RentParkingSpotRequestFailedAction;