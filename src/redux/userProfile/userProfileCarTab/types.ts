export interface UserProfileCarFormDataState {
    [index: string]: string;
    id: string,
    model: string,
    price: string,
}

export interface Fuel {
    id: string,
    type: string
}

export interface Gearbox {
    id: string,
    type: string
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
    },
    car_features: UserProfileCarFeaturesState,
    show_form: boolean
}

export const defaultUserProfileCarTabState: UserProfileCarTabState = {
    form_data: {
        id: '',
        model: '',
        price: '',
    },
    form_errors: {
        model_error: '',
        price_error: '',
    },
    car_features: {
        fuel: [
            {
                id: '1',
                type: 'Essence'
            },
            {
                id: '2',
                type: 'Diesel'
            },
            {
                id: '3',
                type: 'GPL'
            },
            {
                id: '4',
                type: 'Électrique'
            },
            {
                id: '5',
                type: 'Hybride'
            }
        ],
        gearbox: [
            {
                id: '1',
                type: 'automatique'
            },
            {
                id: '2',
                type: 'manuelle'
            }
        ]
    },
    show_form: false
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

export type UserProfileCarActionTypes = ToggleUserProfileCarFormAction | UpdateUserProfileCarModelAction | UpdateUserProfileCarPriceAction | GetUserProfileCarFeaturesSentAction | GetUserProfileCarFeaturesReceivedAction | SetUserProfileCarFeaturesAction;