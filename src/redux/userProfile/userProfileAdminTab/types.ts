import { ParkingLot, Airport } from "../../parkingSearch/types";
import { RawParkingLot } from "../../../Utils";

export interface UserProfileAdminTabState {
    parking_lots: ParkingLot[];
    airports: Airport[];
    fetching_parking_lots: boolean,
    show_admin_delete_parking_modal: boolean,
    selected_parking_id: number,
    deleting: boolean,
    error: string,
    show_form: boolean,
    editing: boolean,
    form_data: RawParkingLot,
    form_errors: {
        label_error: string,
        lat_error: string,
        lng_error: string,
        capacity_error: string,
        price_error: string,
        [key: string]: string
    },
    valid_form: boolean,
    submit_form: boolean,
    sending: boolean,
    saving: boolean
}

export const defaultUserProfileAdminTabState: UserProfileAdminTabState = {
    parking_lots: [],
    airports: [],
    fetching_parking_lots: false,
    show_admin_delete_parking_modal: false,
    selected_parking_id: 0,
    deleting: false,
    error: '',
    show_form: false,
    editing: false,
    form_data: {
        id: '',
        label: '',
        lat: '',
        lng: '',
        capacity: '',
        price_per_day: '',
        airport: {
            id: '1',
            name: 'Agen-La-Garenne',
            lat: '44.17',
            lng: '0.589722'
        }
    },
    form_errors: {
        label_error: '',
        lat_error: '',
        lng_error: '',
        capacity_error: '',
        price_error: ''
    },
    valid_form: false,
    submit_form: false,
    sending: false,
    saving: false
};


export const ADMIN_REQUEST_PARKINGS = 'ADMIN_REQUEST_PARKINGS';
export interface AdminRequestParkingsAction {
    type: typeof ADMIN_REQUEST_PARKINGS
}

export const ADMIN_PARKINGS_RECEIVED = 'ADMIN_PARKINGS_RECEIVED';
export interface AdminParkingsReceivedAction {
    type: typeof ADMIN_PARKINGS_RECEIVED,
    parking_lots: ParkingLot[]
}

export const ADMIN_DELETE_PARKING = "ADMIN_DELETE_PARKING";
export interface AdminDeleteParkingAction {
    type: typeof ADMIN_DELETE_PARKING,
    id: number
}

export const CANCEL_ADMIN_DELETE_PARKING = "CANCEL_ADMIN_DELETE_PARKING";
export interface CancelAdminDeleteParkingAction {
    type: typeof CANCEL_ADMIN_DELETE_PARKING
}

export const TOGGLE_ADMIN_PARKING_MODAL = "TOGGLE_ADMIN_PARKING_MODAL";
export interface ToggleAdminParkingModalAction {
    type: typeof TOGGLE_ADMIN_PARKING_MODAL,
    show: boolean
}

export const ADMIN_DELETE_PARKING_SENT = "ADMIN_DELETE_PARKING_SENT";
export interface AdminDeleteParkingSentAction {
    type: typeof ADMIN_DELETE_PARKING_SENT
}

export const ADMIN_DELETE_PARKING_RECEIVED = "ADMIN_DELETE_PARKING_RECEIVED";
export interface AdminDeleteParkingReceivedAction {
    type: typeof ADMIN_DELETE_PARKING_RECEIVED,
    id: number
}

export const ADMIN_DELETE_PARKING_ERROR_MSG = "ADMIN_DELETE_PARKING_ERROR_MSG";
export interface AdminDeleteParkingErrorAction {
    type: typeof ADMIN_DELETE_PARKING_ERROR_MSG,
    error: string
}

export const TOGGLE_ADMIN_PARKING_FORM = "TOGGLE_ADMIN_PARKING_FORM";
export interface ToggleAdminParkingFormAction {
    type: typeof TOGGLE_ADMIN_PARKING_FORM
}

export const UPDATE_ADMIN_PARKING_LABEL_INPUT = "UPDATE_ADMIN_PARKING_LABEL_INPUT";
export interface UpdateAdminParkingLabelAction {
    type: typeof UPDATE_ADMIN_PARKING_LABEL_INPUT,
    value: string
}

export const UPDATE_ADMIN_PARKING_LAT_INPUT = "UPDATE_ADMIN_PARKING_LAT_INPUT";
export interface UpdateAdminParkingLatAction {
    type: typeof UPDATE_ADMIN_PARKING_LAT_INPUT,
    value: string
}

export const UPDATE_ADMIN_PARKING_LNG_INPUT = "UPDATE_ADMIN_PARKING_LNG_INPUT";
export interface UpdateAdminParkingLngAction {
    type: typeof UPDATE_ADMIN_PARKING_LNG_INPUT,
    value: string
}

export const UPDATE_ADMIN_PARKING_CAPACITY_INPUT = "UPDATE_ADMIN_PARKING_CAPACITY_INPUT";
export interface UpdateAdminParkingCapacityAction {
    type: typeof UPDATE_ADMIN_PARKING_CAPACITY_INPUT,
    value: string
}

export const UPDATE_ADMIN_PARKING_PRICE_INPUT = "UPDATE_ADMIN_PARKING_PRICE_INPUT";
export interface UpdateAdminParkingPriceAction {
    type: typeof UPDATE_ADMIN_PARKING_PRICE_INPUT,
    value: string
}

export const UPDATE_ADMIN_PARKING_AIRPORT_SELECT = "UPDATE_ADMIN_PARKING_AIRPORT_SELECT";
export interface UpdateAdminParkingAirportAction {
    type: typeof UPDATE_ADMIN_PARKING_AIRPORT_SELECT,
    value: number
}

export const ADMIN_REQUEST_AIRPORTS = "ADMIN_REQUEST_AIRPORTS";
export interface AdminRequestAirportsAction {
    type: typeof ADMIN_REQUEST_AIRPORTS
}

export const ADMIN_AIRPORTS_RECEIVED = "ADMIN_AIRPORTS_RECEIVED";
export interface AdminAirportsReceivedAction {
    type: typeof ADMIN_AIRPORTS_RECEIVED,
    airports: Airport[]
}

export const SUMBIT_ADMIN_PARKING = "SUMBIT_ADMIN_PARKING";
export interface SubmitAdminParkingAction {
    type: typeof SUMBIT_ADMIN_PARKING
}

export const ADMIN_PARKING_FORM_SENT = "ADMIN_PARKING_FORM_SENT";
export interface AdminParkingSentAction {
    type: typeof ADMIN_PARKING_FORM_SENT
}

export const ADMIN_PARKING_FORM_RECEIVED = "ADMIN_PARKING_FORM_RECEIVED";
export interface AdminParkingReceivedAction {
    type: typeof ADMIN_PARKING_FORM_RECEIVED,
    data: ParkingLot,
    id: number
}

export const ADMIN_PARKING_SAVED = "ADMIN_PARKING_SAVED";
export interface AdminParkingSavedAction {
    type: typeof ADMIN_PARKING_SAVED
}

export const RESET_ADMIN_PARKING_FORM = "RESET_ADMIN_PARKING_FORM";
export interface ResetAdminParkingFormAction {
    type: typeof RESET_ADMIN_PARKING_FORM
}

export type UserProfileAdminActionTypes =
    AdminRequestParkingsAction |
    AdminParkingsReceivedAction |
    AdminDeleteParkingAction |
    CancelAdminDeleteParkingAction |
    ToggleAdminParkingModalAction |
    AdminDeleteParkingSentAction |
    AdminDeleteParkingReceivedAction |
    AdminDeleteParkingErrorAction |
    ToggleAdminParkingFormAction |
    UpdateAdminParkingLabelAction |
    UpdateAdminParkingLatAction |
    UpdateAdminParkingLngAction |
    UpdateAdminParkingCapacityAction |
    UpdateAdminParkingPriceAction |
    UpdateAdminParkingAirportAction |
    AdminRequestAirportsAction |
    AdminAirportsReceivedAction |
    SubmitAdminParkingAction |
    AdminParkingSentAction |
    AdminParkingReceivedAction |
    ResetAdminParkingFormAction |
    AdminParkingSavedAction;