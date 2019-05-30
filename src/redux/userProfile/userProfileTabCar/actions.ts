import Axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { parseIdentifiedType, RawIdentifiedType, parseCar, RawCar } from "../../../Utils";
import { ResetUserProfileCarFormAction, RESET_USER_PROFILE_CAR_FORM, SetUserProfileCarOwnerAction, SET_USER_PROFILE_CAR_OWNER, SubmitUserProfileCarAction, SUMBIT_USER_PROFILE_CAR, ToggleUserProfileCarFormAction, TOGGLE_USER_PROFILE_CAR_FORM, UpdateUserProfileCarAction, UpdateUserProfileCarDoorsAction, UpdateUserProfileCarFuelAction, UpdateUserProfileCarGearboxAction, UpdateUserProfileCarModelAction, UpdateUserProfileCarPriceAction, UpdateUserProfileCarReceivedAction, UpdateUserProfileCarSeatsAction, UpdateUserProfileCarSentAction, UPDATE_USER_PROFILE_CAR, UPDATE_USER_PROFILE_CAR_DOORS_SELECT, UPDATE_USER_PROFILE_CAR_FUEL_SELECT, UPDATE_USER_PROFILE_CAR_GEARBOX_SELECT, UPDATE_USER_PROFILE_CAR_MODEL_INPUT, UPDATE_USER_PROFILE_CAR_PRICE_INPUT, UPDATE_USER_PROFILE_CAR_RECEIVED, UPDATE_USER_PROFILE_CAR_SEATS_SELECT, UPDATE_USER_PROFILE_CAR_SENT, UserProfileCarActionTypes, UserProfileCarFeaturesReceivedAction, UserProfileCarFeaturesSentAction, UserProfileCarFeaturesState, UserProfileCarReceivedAction, UserProfileCarSavedAction, UserProfileCarSentAction, UserProfileCarsReceivedAction, UserProfileCarsSentAction, UserProfileCarsState, USER_PROFILE_CARS_RECEIVED, USER_PROFILE_CARS_SENT, USER_PROFILE_CAR_FEATURES_RECEIVED, USER_PROFILE_CAR_FEATURES_SENT, USER_PROFILE_CAR_FORM_RECEIVED, USER_PROFILE_CAR_FORM_SENT, USER_PROFILE_CAR_SAVED, DeleteUserProfileCarAction, DELETE_USER_PROFILE_CAR, DeleteUserProfileCarSentAction, DELETE_USER_PROFILE_CAR_SENT, DeleteUserProfileCarReceivedAction, DELETE_USER_PROFILE_CAR_RECEIVED } from "./types";
import { toggleShowModal } from "../../navbar/actions";
import { Car, Fuel, Gearbox } from "../../carSearch/types";

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

export function updateUserProfileCarGearboxSelect(gearbox: Gearbox): UpdateUserProfileCarGearboxAction {
    return {
        type: UPDATE_USER_PROFILE_CAR_GEARBOX_SELECT,
        gearbox
    }
}

export function updateUserProfileCarFuelSelect(fuel: Fuel): UpdateUserProfileCarFuelAction {
    return {
        type: UPDATE_USER_PROFILE_CAR_FUEL_SELECT,
        fuel
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

export function userProfileCarFormReceived(data: Car, id: number): UserProfileCarReceivedAction {
    return {
        type: USER_PROFILE_CAR_FORM_RECEIVED,
        data,
        id
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

export function postUserProfileCarForm(data: Car) {

    return (dispatch: Dispatch<UserProfileCarActionTypes>) => {
        dispatch(userProfileCarFormSent());

        Axios.post(`${process.env.REACT_APP_HIRECAR_API_URI}/cars`, data)

            .then((res: AxiosResponse) => {
                const { id } = res.data;
                dispatch(resetUserProfileCarForm());
                dispatch(userProfileCarFormReceived(data, parseInt(id)));
                setTimeout(() => {
                    dispatch(userProfileCarSaved());
                }, 1000);

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

export function userProfileCarFeaturesReceived(data: UserProfileCarFeaturesState): UserProfileCarFeaturesReceivedAction {
    return {
        type: USER_PROFILE_CAR_FEATURES_RECEIVED,
        data
    };
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
                dispatch(userProfileCarFeaturesReceived(data));

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

export function userProfileCarsReceived(cars: Car[]): UserProfileCarsReceivedAction {
    return {
        type: USER_PROFILE_CARS_RECEIVED,
        cars
    };
}

export function fetchUserProfileCars(id: number) {
    return (dispatch: Dispatch<UserProfileCarActionTypes>) => {
        dispatch(userProfileCarsSent());
        Axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/cars/${id}`)
            .then((res: AxiosResponse) => {
                const parsed_cars = (res.data.cars as RawCar[]).map(parseCar);
                dispatch(userProfileCarsReceived(parsed_cars));
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            });
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

export function updateUserProfileCarReceived(data: Car): UpdateUserProfileCarReceivedAction {
    return {
        type: UPDATE_USER_PROFILE_CAR_RECEIVED,
        data
    };
}

export function postUpdateUserProfileCarForm(data: Car) {

    return (dispatch: Dispatch<UserProfileCarActionTypes>) => {

        dispatch(updateUserProfileCarSent());

        Axios.put(`${process.env.REACT_APP_HIRECAR_API_URI}/cars/${data.id}`, data)
            .then(() => {
                dispatch(resetUserProfileCarForm());
                dispatch(updateUserProfileCarReceived(data));
                setTimeout(() => {
                    dispatch(userProfileCarSaved());
                }, 1000);
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            });
    }
}

export function onUserProfileCarDelete(id: number): DeleteUserProfileCarAction {
    return {
        type: DELETE_USER_PROFILE_CAR,
        id
    }
}

export function deleteUserProfileCarSent(): DeleteUserProfileCarSentAction {
    return {
        type: DELETE_USER_PROFILE_CAR_SENT
    };
}

export function deleteUserProfileCarReceived(id: number): DeleteUserProfileCarReceivedAction {
    return {
        type: DELETE_USER_PROFILE_CAR_RECEIVED,
        id
    };
}

export function postDeleteUserProfileCar(data: UserProfileCarsState) {

    const id = data.current_car_id;
    return (dispatch: Dispatch<UserProfileCarActionTypes>) => {
        Axios.delete(`${process.env.REACT_APP_HIRECAR_API_URI}/cars/${id}`)
            .then(() => {
                dispatch(toggleShowModal());
                dispatch(deleteUserProfileCarReceived(id));
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            })
    }
}