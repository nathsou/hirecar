import { Fuel, Gearbox } from "../../carSearch/types";

export interface UserProfileCarFormDataState {
    [index: string]: string;
    owner_id: string,
    model: string,
    price_per_day: string,
    gearbox_id: string,
    fuel_id: string,
    seats: string,
    doors: string
}

export interface UserProfileCarFeaturesState {
    fuel: Fuel[],
    gearbox: Gearbox[]
}

export interface UserProfileCarTabState {
    form_data: UserProfileCarFormDataState,
    form_errors: {
        model_error: string,
        price_error: string,
        [key: string]: string
    },
    car_features: UserProfileCarFeaturesState,
    show_form: boolean,
    valid_form: boolean,
    sending: boolean,
    saving: boolean,
}

export const defaultUserProfileCarTabState: UserProfileCarTabState = {
    form_data: {
        owner_id: '',
        model: '',
        price_per_day: '',
        gearbox_id: '1',
        fuel_id: '1',
        seats: '2',
        doors: '2'
    },
    form_errors: {
        model_error: '',
        price_error: '',
    },
    car_features: {
        fuel: [
            {
                id: 1,
                type: 'Essence'
            },
            {
                id: 2,
                type: 'Diesel'
            },
            {
                id: 3,
                type: 'GPL'
            },
            {
                id: 4,
                type: 'Électrique'
            },
            {
                id: 5,
                type: 'Hybride'
            }
        ],
        gearbox: [
            {
                id: 1,
                type: 'automatique'
            },
            {
                id: 2,
                type: 'manuelle'
            }
        ]
    },
    show_form: false,
    valid_form: false,
    sending: false,
    saving: false
}

export const TOGGLE_USER_PROFILE_CAR_FORM = "TOGGLE_USER_PROFILE_CAR_FORM";
export interface ToggleUserProfileCarFormAction {
    type: typeof TOGGLE_USER_PROFILE_CAR_FORM
}

export const UPDATE_USER_PROFILE_CAR_MODEL_INPUT = "UPDATE_USER_PROFILE_CAR_MODEL_INPUT";
export interface UpdateUserProfileCarModelAction {
    type: typeof UPDATE_USER_PROFILE_CAR_MODEL_INPUT,
    value: string
}

export const UPDATE_USER_PROFILE_CAR_PRICE_INPUT = "UPDATE_USER_PROFILE_CAR_PRICE_INPUT";
export interface UpdateUserProfileCarPriceAction {
    type: typeof UPDATE_USER_PROFILE_CAR_PRICE_INPUT,
    value: string
}

export const UPDATE_USER_PROFILE_CAR_GEARBOX_SELECT = "UPDATE_USER_PROFILE_CAR_GEARBOX_SELECT";
export interface UpdateUserProfileCarGearboxAction {
    type: typeof UPDATE_USER_PROFILE_CAR_GEARBOX_SELECT,
    value: string
}

export const UPDATE_USER_PROFILE_CAR_FUEL_SELECT = "UPDATE_USER_PROFILE_CAR_FUEL_SELECT";
export interface UpdateUserProfileCarFuelAction {
    type: typeof UPDATE_USER_PROFILE_CAR_FUEL_SELECT,
    value: string
}

export const UPDATE_USER_PROFILE_CAR_SEATS_SELECT = "UPDATE_USER_PROFILE_CAR_SEATS_SELECT";
export interface UpdateUserProfileCarSeatsAction {
    type: typeof UPDATE_USER_PROFILE_CAR_SEATS_SELECT,
    value: string
}

export const UPDATE_USER_PROFILE_CAR_DOORS_SELECT = "UPDATE_USER_PROFILE_CAR_DOORS_SELECT";
export interface UpdateUserProfileCarDoorsAction {
    type: typeof UPDATE_USER_PROFILE_CAR_DOORS_SELECT,
    value: string
}

export const SUMBIT_USER_PROFILE_CAR = "SUMBIT_USER_PROFILE_CAR";
export interface SubmitUserProfileCarAction {
    type: typeof SUMBIT_USER_PROFILE_CAR
}

export const USER_PROFILE_CAR_FORM_SENT = "USER_PROFILE_CAR_FORM_SENT";
export interface UserProfileCarSentAction {
    type: typeof USER_PROFILE_CAR_FORM_SENT
}

export const USER_PROFILE_CAR_FORM_RECEIVED = "USER_PROFILE_CAR_FORM_RECEIVED";
export interface UserProfileCarReceivedAction {
    type: typeof USER_PROFILE_CAR_FORM_RECEIVED
}

export const SET_USER_PROFILE_CAR_OWNER = "SET_USER_PROFILE_CAR_OWNER";
export interface SetUserProfileCarOwnerAction {
    type: typeof SET_USER_PROFILE_CAR_OWNER,
    id: string
}

export const GET_USER_PROFILE_CAR_FEATURES_SENT = "GET_USER_PROFILE_CAR_FEATURES_SENT";
export interface GetUserProfileCarFeaturesSentAction {
    type: typeof GET_USER_PROFILE_CAR_FEATURES_SENT
}

export const GET_USER_PROFILE_CAR_FEATURES_RECEIVED = "GET_USER_PROFILE_CAR_FEATURES_RECEIVED";
export interface GetUserProfileCarFeaturesReceivedAction {
    type: typeof GET_USER_PROFILE_CAR_FEATURES_RECEIVED
}

export const SET_USER_PROFILE_CAR_FEATURES = "SET_USER_PROFILE_CAR_FEATURES";
export interface SetUserProfileCarFeaturesAction {
    type: typeof SET_USER_PROFILE_CAR_FEATURES,
    data: UserProfileCarFeaturesState
}

export const USER_PROFILE_CAR_SAVED = "USER_PROFILE_CAR_SAVED";
export interface UserProfileCarSavedAction {
    type: typeof USER_PROFILE_CAR_SAVED
}

export const RESET_USER_PROFILE_CAR_FORM = "RESET_USER_PROFILE_CAR_FORM";
export interface ResetUserProfileCarFormAction {
    type: typeof RESET_USER_PROFILE_CAR_FORM
}


export type UserProfileCarActionTypes = ToggleUserProfileCarFormAction | UpdateUserProfileCarModelAction | UpdateUserProfileCarPriceAction | UpdateUserProfileCarGearboxAction | UpdateUserProfileCarFuelAction | UpdateUserProfileCarSeatsAction | UpdateUserProfileCarDoorsAction | SubmitUserProfileCarAction | UserProfileCarSentAction | UserProfileCarReceivedAction | SetUserProfileCarOwnerAction | GetUserProfileCarFeaturesSentAction | GetUserProfileCarFeaturesReceivedAction | SetUserProfileCarFeaturesAction | UserProfileCarSavedAction | ResetUserProfileCarFormAction;