import Axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { parseIdentifiedType, RawIdentifiedType } from "../../../Utils";
import { GetUserProfileCarFeaturesReceivedAction, GetUserProfileCarFeaturesSentAction, GET_USER_PROFILE_CAR_FEATURES_RECEIVED, GET_USER_PROFILE_CAR_FEATURES_SENT, SetUserProfileCarFeaturesAction, SET_USER_PROFILE_CAR_FEATURES, ToggleUserProfileCarFormAction, TOGGLE_USER_PROFILE_CAR_FORM, UpdateUserProfileCarModelAction, UpdateUserProfileCarPriceAction, UPDATE_USER_PROFILE_CAR_MODEL_INPUT, UPDATE_USER_PROFILE_CAR_PRICE_INPUT, UserProfileCarActionTypes, UserProfileCarFeaturesState } from "./types";

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

export function getUserProfileCarFeaturesSent(): GetUserProfileCarFeaturesSentAction {
    return {
        type: GET_USER_PROFILE_CAR_FEATURES_SENT
    };
}

export function getUserProfileCarFeaturesReceived(): GetUserProfileCarFeaturesReceivedAction {
    return {
        type: GET_USER_PROFILE_CAR_FEATURES_RECEIVED
    };
}

export function setUserProfilCarFeatures(data: UserProfileCarFeaturesState): SetUserProfileCarFeaturesAction {
    return {
        type: SET_USER_PROFILE_CAR_FEATURES,
        data
    }
}

// Save Car feature in state
export function getUserProfileCarFeaturesForm() {

    return (dispatch: Dispatch<UserProfileCarActionTypes>) => {
        dispatch(getUserProfileCarFeaturesSent());

        Axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/cars/features`)
            .then((res: AxiosResponse) => {
                const data: UserProfileCarFeaturesState = {
                    fuel: (res.data.fuel as RawIdentifiedType[]).map(parseIdentifiedType),
                    gearbox: (res.data.gearbox as RawIdentifiedType[]).map(parseIdentifiedType),
                };

                dispatch(setUserProfilCarFeatures(data));
                dispatch(getUserProfileCarFeaturesReceived());
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            });
    }
}