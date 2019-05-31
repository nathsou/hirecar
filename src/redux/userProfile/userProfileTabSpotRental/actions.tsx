import { USER_PROFILE_SPOT_RENTALS_SENT, USER_PROFILE_SPOT_RENTALS_RECEIVED, UserProfileSpotRentalsActionTypes, UserProfileSpotRentalsSentAction, UserProfileSpotRentalsReceivedAction, DeleteUserProfileSpotRentalAction, DELETE_USER_PROFILE_SPOT_RENTAL, DeleteUserProfileSpotRentalSentAction, DELETE_USER_PROFILE_SPOT_RENTAL_SENT, DeleteUserProfileSpotRentalReceivedAction, DELETE_USER_PROFILE_SPOT_RENTAL_RECEIVED, CancelDeleteUserProfileSpotRentalAction, CANCEL_DELETE_USER_PROFILE_SPOT_RENTAL } from "./types";
import { Dispatch } from "react";
import Axios, { AxiosResponse, AxiosError } from "axios";
import { RawParkingSpot, parseParkingSpot } from "../../../Utils";
import { ParkingSpot } from "../../carSearch/types";
import { toggleShowModal } from "../../navbar/actions";

export function userProfileParkingSpotRentalsSent(): UserProfileSpotRentalsSentAction {
    return {
        type: USER_PROFILE_SPOT_RENTALS_SENT
    };
}

export function userProfileSpotRentalsReceived(spot_rentals: ParkingSpot[]): UserProfileSpotRentalsReceivedAction {
    return {
        type: USER_PROFILE_SPOT_RENTALS_RECEIVED,
        spot_rentals
    };
}

export function fetchUserProfileParkingSpotRentals(id: number) {
    return (dispatch: Dispatch<UserProfileSpotRentalsActionTypes>) => {
        dispatch(userProfileParkingSpotRentalsSent());

        Axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/parking_spot_rentals?owner_id=${id}`)
            .then((res: AxiosResponse) => {
                const spot_rentals = (res.data).parking_spot_rentals as RawParkingSpot[];
                const parsed_spot_rentals = spot_rentals.map(parseParkingSpot);
                dispatch(userProfileSpotRentalsReceived(parsed_spot_rentals));
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            });
    }
}

export function onUserProfileSpotRentalDelete(id: number): DeleteUserProfileSpotRentalAction {
    return {
        type: DELETE_USER_PROFILE_SPOT_RENTAL,
        id
    }
}

export function onUserProfileSpotRentalDeleteCancel(): CancelDeleteUserProfileSpotRentalAction {
    return {
        type: CANCEL_DELETE_USER_PROFILE_SPOT_RENTAL
    }
}

export function deleteUserProfileSpotRentalSent(): DeleteUserProfileSpotRentalSentAction {
    return {
        type: DELETE_USER_PROFILE_SPOT_RENTAL_SENT
    };
}

export function deleteUserProfileSpotRentalReceived(id: number): DeleteUserProfileSpotRentalReceivedAction {
    return {
        type: DELETE_USER_PROFILE_SPOT_RENTAL_RECEIVED,
        id
    };
}

export function postDeleteUserProfileSpotRental(id: number) {

    return (dispatch: Dispatch<UserProfileSpotRentalsActionTypes>) => {
        dispatch(deleteUserProfileSpotRentalSent());

        Axios.delete(`${process.env.REACT_APP_HIRECAR_API_URI}/parking_spot_rentals/${id}`)
            .then(() => {
                dispatch(toggleShowModal());
                dispatch(deleteUserProfileSpotRentalReceived(id));
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            })
    }
}