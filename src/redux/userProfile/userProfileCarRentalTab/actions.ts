import { UserProfileCarRentalsSentAction, USER_PROFILE_CAR_RENTALS_SENT, USER_PROFILE_CAR_RENTALS_RECEIVED, UserProfileCarRentalsReceivedAction, UserProfileCarRentalsActionTypes, DeleteUserProfileCarRentalAction, DELETE_USER_PROFILE_CAR_RENTAL, CancelDeleteUserProfileCarRentalAction, CANCEL_DELETE_USER_PROFILE_CAR_RENTAL, DELETE_USER_PROFILE_CAR_RENTAL_SENT, DeleteUserProfileCarRentalSentAction, DeleteUserProfileCarRentalReceivedAction, DELETE_USER_PROFILE_CAR_RENTAL_RECEIVED, ToggleUserProfileCarRentalModalAction, TOGGLE_USER_PROFILE_CAR_RENTAL_MODAL } from "./types";
import { CarRental } from "../../carSearch/types";
import Axios, { AxiosResponse, AxiosError } from "axios";
import { Dispatch } from "react";
import { RawCarRental, parseCarRental, resToJSON } from "../../../Utils";

export function userProfileCarRentalsSent(): UserProfileCarRentalsSentAction {
    return {
        type: USER_PROFILE_CAR_RENTALS_SENT
    };
}

export function userProfileCarRentalsReceived(car_rentals: CarRental[]): UserProfileCarRentalsReceivedAction {
    return {
        type: USER_PROFILE_CAR_RENTALS_RECEIVED,
        car_rentals
    };
}

export function fetchUserProfileCarRentals(id: number) {
    return (dispatch: Dispatch<UserProfileCarRentalsActionTypes>) => {
        dispatch(userProfileCarRentalsSent());

        Axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/car_rentals?user_id=${id}`)
            .then((res: AxiosResponse) => {
                const car_rentals = resToJSON(res).car_rentals as RawCarRental[];
                const parsed_car_rentals = car_rentals.map(parseCarRental);
                dispatch(userProfileCarRentalsReceived(parsed_car_rentals));
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            });
    }
}

export function onUserProfileCarRentalDelete(id: number): DeleteUserProfileCarRentalAction {
    return {
        type: DELETE_USER_PROFILE_CAR_RENTAL,
        id
    }
}

export function onUserProfileCarRentalDeleteCancel(): CancelDeleteUserProfileCarRentalAction {
    return {
        type: CANCEL_DELETE_USER_PROFILE_CAR_RENTAL
    }
}

export function deleteUserProfileCarRentalSent(): DeleteUserProfileCarRentalSentAction {
    return {
        type: DELETE_USER_PROFILE_CAR_RENTAL_SENT
    };
}

export function deleteUserProfileCarRentalReceived(id: number): DeleteUserProfileCarRentalReceivedAction {
    return {
        type: DELETE_USER_PROFILE_CAR_RENTAL_RECEIVED,
        id
    };
}

export function postDeleteUserProfileCarRental(id: number) {

    return (dispatch: Dispatch<UserProfileCarRentalsActionTypes>) => {
        dispatch(deleteUserProfileCarRentalSent());

        Axios.delete(`${process.env.REACT_APP_HIRECAR_API_URI}/car_rentals/${id}`)
            .then(() => {
                dispatch(deleteUserProfileCarRentalReceived(id));
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            })
    }
}

export function toggleUserProfileCarRentalModal(show: boolean): ToggleUserProfileCarRentalModalAction {
    return {
        type: TOGGLE_USER_PROFILE_CAR_RENTAL_MODAL,
        show
    };
}