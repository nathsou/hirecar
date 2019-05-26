import Axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { parseIdentifiedType, RawIdentifiedType } from "../../../Utils";
import { UserProfileCarFeaturesReceivedAction, UserProfileCarFeaturesSentAction, USER_PROFILE_CAR_FEATURES_RECEIVED, USER_PROFILE_CAR_FEATURES_SENT, SetUserProfileCarFeaturesAction, SET_USER_PROFILE_CAR_FEATURES, ToggleUserProfileCarFormAction, TOGGLE_USER_PROFILE_CAR_FORM, UpdateUserProfileCarModelAction, UpdateUserProfileCarPriceAction, UPDATE_USER_PROFILE_CAR_MODEL_INPUT, UPDATE_USER_PROFILE_CAR_PRICE_INPUT, UserProfileCarActionTypes, UserProfileCarFeaturesState, UpdateUserProfileCarGearboxAction, UPDATE_USER_PROFILE_CAR_GEARBOX_SELECT, UpdateUserProfileCarFuelAction, UPDATE_USER_PROFILE_CAR_FUEL_SELECT, UpdateUserProfileCarSeatsAction, UPDATE_USER_PROFILE_CAR_SEATS_SELECT, UpdateUserProfileCarDoorsAction, UPDATE_USER_PROFILE_CAR_DOORS_SELECT, SubmitUserProfileCarAction, SUMBIT_USER_PROFILE_CAR, UserProfileCarSentAction, USER_PROFILE_CAR_FORM_SENT, USER_PROFILE_CAR_FORM_RECEIVED, UserProfileCarReceivedAction, UserProfileCarFormDataState, SET_USER_PROFILE_CAR_OWNER, SetUserProfileCarOwnerAction, ResetUserProfileCarFormAction, RESET_USER_PROFILE_CAR_FORM, UserProfileCarSavedAction, USER_PROFILE_CAR_SAVED, UserProfileCarsSentAction, USER_PROFILE_CARS_SENT, UserProfileCarsReceivedAction, USER_PROFILE_CARS_RECEIVED, SetUserProfileCarsAction, SET_USER_PROFILE_CARS, UserProfileCarsState } from "./types";

export function toggleUserProfileCarForm(): ToggleUserProfileCarFormAction {
    return {
        type: TOGGLE_USER_PROFILE_CAR_FORM
    }
}

export function updateUserProfileCarModelInput(value: string): UpdateUserProfileCarModelAction {
    return {
        type: UPDATE_USER_PROFILE_CAR_MODEL_INPUT,
        value
    };
}

export function updateUserProfileCarPriceInput(value: string): UpdateUserProfileCarPriceAction {
    return {
        type: UPDATE_USER_PROFILE_CAR_PRICE_INPUT,
        value
    };
}

export function updateUserProfileCarGearboxSelect(value: string): UpdateUserProfileCarGearboxAction {
    return {
        type: UPDATE_USER_PROFILE_CAR_GEARBOX_SELECT,
        value
    }
}

export function updateUserProfileCarFuelSelect(value: string): UpdateUserProfileCarFuelAction {
    return {
        type: UPDATE_USER_PROFILE_CAR_FUEL_SELECT,
        value
    }
}

export function updateUserProfileCarSeatsSelect(value: string): UpdateUserProfileCarSeatsAction {
    return {
        type: UPDATE_USER_PROFILE_CAR_SEATS_SELECT,
        value
    }
}

export function updateUserProfileCarDoorsSelect(value: string): UpdateUserProfileCarDoorsAction {
    return {
        type: UPDATE_USER_PROFILE_CAR_DOORS_SELECT,
        value
    }
}

export function submitUserProfileCarForm(): SubmitUserProfileCarAction {
    return {
        type: SUMBIT_USER_PROFILE_CAR
    }
}

export function userProfileCarFormSent(): UserProfileCarSentAction {
    return {
        type: USER_PROFILE_CAR_FORM_SENT
    };
}

export function userProfileCarFormReceived(): UserProfileCarReceivedAction {
    return {
        type: USER_PROFILE_CAR_FORM_RECEIVED
    };
}

export function userProfileCarSaved(): UserProfileCarSavedAction {
    return {
        type: USER_PROFILE_CAR_SAVED
    }
}


export function resetUserProfileCarForm(): ResetUserProfileCarFormAction {
    return {
        type: RESET_USER_PROFILE_CAR_FORM
    };
}

export function postUserProfileCarForm(data: UserProfileCarFormDataState) {

    return (dispatch: Dispatch<UserProfileCarActionTypes>) => {
        dispatch(userProfileCarFormSent());
        const id = parseInt(data.owner_id);
        Axios.post(`${process.env.REACT_APP_HIRECAR_API_URI}/cars`, data)
            .then(() => {
                dispatch(resetUserProfileCarForm());
                dispatch(setUserProfileCarOwner(data.owner_id));
                dispatch(userProfileCarFormReceived());

                setTimeout(() => {
                    dispatch(userProfileCarSaved());
                }, 2000);
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            });
    }
}

export function setUserProfileCarOwner(id: string): SetUserProfileCarOwnerAction {
    return {
        type: SET_USER_PROFILE_CAR_OWNER,
        id
    }
}

export function userProfileCarFeaturesSent(): UserProfileCarFeaturesSentAction {
    return {
        type: USER_PROFILE_CAR_FEATURES_SENT
    };
}

export function userProfileCarFeaturesReceived(): UserProfileCarFeaturesReceivedAction {
    return {
        type: USER_PROFILE_CAR_FEATURES_RECEIVED
    };
}

export function setUserProfilCarFeatures(data: UserProfileCarFeaturesState): SetUserProfileCarFeaturesAction {
    return {
        type: SET_USER_PROFILE_CAR_FEATURES,
        data
    }
}

export function fetchUserProfileCarFeaturesForm() {

    return (dispatch: Dispatch<UserProfileCarActionTypes>) => {
        dispatch(userProfileCarFeaturesSent());

        Axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/cars/features`)
            .then((res: AxiosResponse) => {
                const data: UserProfileCarFeaturesState = {
                    fuel: (res.data.fuel as RawIdentifiedType[]).map(parseIdentifiedType),
                    gearbox: (res.data.gearbox as RawIdentifiedType[]).map(parseIdentifiedType),
                };

                dispatch(setUserProfilCarFeatures(data));
                dispatch(userProfileCarFeaturesReceived());
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            });
    }
}

export function userProfileCarsSent(): UserProfileCarsSentAction {
    return {
        type: USER_PROFILE_CARS_SENT
    };
}

export function userProfileCarsReceived(): UserProfileCarsReceivedAction {
    return {
        type: USER_PROFILE_CARS_RECEIVED
    };
}

export function setUserProfileCars(data: UserProfileCarsState): SetUserProfileCarsAction {
    return {
        type: SET_USER_PROFILE_CARS,
        data
    }
}

export function fetchUserProfileCars(id: number) {
    return (dispatch: Dispatch<UserProfileCarActionTypes>) => {
        dispatch(userProfileCarsSent());

        Axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/cars/${id}`)
            .then((res: AxiosResponse) => {
                dispatch(setUserProfileCars(res.data));
                dispatch(userProfileCarsReceived());
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            });
    }
}