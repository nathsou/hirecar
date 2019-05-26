import Axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { parseIdentifiedType, RawIdentifiedType } from "../../../Utils";
import { ResetUserProfileCarFormAction, RESET_USER_PROFILE_CAR_FORM, SetUserProfileCarFeaturesAction, SetUserProfileCarOwnerAction, SetUserProfileCarsAction, SET_USER_PROFILE_CARS, SET_USER_PROFILE_CAR_FEATURES, SET_USER_PROFILE_CAR_OWNER, SubmitUserProfileCarAction, SUMBIT_USER_PROFILE_CAR, ToggleUserProfileCarFormAction, TOGGLE_USER_PROFILE_CAR_FORM, UpdateUserProfileCarAction, UpdateUserProfileCarDoorsAction, UpdateUserProfileCarFuelAction, UpdateUserProfileCarGearboxAction, UpdateUserProfileCarModelAction, UpdateUserProfileCarPriceAction, UpdateUserProfileCarReceivedAction, UpdateUserProfileCarSeatsAction, UpdateUserProfileCarSentAction, UPDATE_USER_PROFILE_CAR, UPDATE_USER_PROFILE_CAR_DOORS_SELECT, UPDATE_USER_PROFILE_CAR_FUEL_SELECT, UPDATE_USER_PROFILE_CAR_GEARBOX_SELECT, UPDATE_USER_PROFILE_CAR_MODEL_INPUT, UPDATE_USER_PROFILE_CAR_PRICE_INPUT, UPDATE_USER_PROFILE_CAR_RECEIVED, UPDATE_USER_PROFILE_CAR_SEATS_SELECT, UPDATE_USER_PROFILE_CAR_SENT, UserProfileCarActionTypes, UserProfileCarFeaturesReceivedAction, UserProfileCarFeaturesSentAction, UserProfileCarFeaturesState, UserProfileCarFormDataState, UserProfileCarReceivedAction, UserProfileCarSavedAction, UserProfileCarSentAction, UserProfileCarsReceivedAction, UserProfileCarsSentAction, UserProfileCarsState, USER_PROFILE_CARS_RECEIVED, USER_PROFILE_CARS_SENT, USER_PROFILE_CAR_FEATURES_RECEIVED, USER_PROFILE_CAR_FEATURES_SENT, USER_PROFILE_CAR_FORM_RECEIVED, USER_PROFILE_CAR_FORM_SENT, USER_PROFILE_CAR_SAVED } from "./types";

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
    const id = parseInt(data.owner_id);

    return (dispatch: Dispatch<UserProfileCarActionTypes>) => {
        dispatch(userProfileCarFormSent());
        // const id = parseInt(data.owner_id);
        Axios.post(`${process.env.REACT_APP_HIRECAR_API_URI}/cars`, data)

            .then(() => {
                dispatch(resetUserProfileCarForm());
                dispatch(setUserProfileCarOwner(data.owner_id));
                dispatch(userProfileCarFormReceived());
                dispatch(userProfileCarsSent());
                fetchUserProfileCarsRequest(dispatch, id);
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
        fetchUserProfileCarsRequest(dispatch, id);
    }
}

export function updateUserProfileCar(id: number): UpdateUserProfileCarAction {
    return {
        type: UPDATE_USER_PROFILE_CAR,
        id
    }
}

export function updateUserProfileCarSent(): UpdateUserProfileCarSentAction {
    return {
        type: UPDATE_USER_PROFILE_CAR_SENT
    };
}

export function updateUserProfileCarReceived(): UpdateUserProfileCarReceivedAction {
    return {
        type: UPDATE_USER_PROFILE_CAR_RECEIVED
    };
}

export function postUpdateUserProfileCarForm(data: UserProfileCarFormDataState) {

    return (dispatch: Dispatch<UserProfileCarActionTypes>) => {
        const id = parseInt(data.owner_id);
        dispatch(updateUserProfileCarSent());

        Axios.put(`${process.env.REACT_APP_HIRECAR_API_URI}/cars/${data.id}`, data)
            .then(() => {
                dispatch(resetUserProfileCarForm());
                dispatch(setUserProfileCarOwner(data.owner_id));
                dispatch(updateUserProfileCarReceived());
                fetchUserProfileCarsRequest(dispatch, id);
                setTimeout(() => {
                    dispatch(userProfileCarSaved());
                }, 2000);
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            });
    }
}

export function fetchUserProfileCarsRequest(
    dispatch: Dispatch<UserProfileCarActionTypes>,
    id: number,
) {
    Axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/cars/${id}`)
        .then((res: AxiosResponse) => {
            dispatch(setUserProfileCars(res.data));
            dispatch(userProfileCarsReceived());
        }).catch((error: AxiosError) => {
            const response = error.response;
            console.log(response);
        });
}