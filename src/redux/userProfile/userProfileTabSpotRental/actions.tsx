import { USER_PROFILE_SPOT_RENTALS_SENT, USER_PROFILE_SPOT_RENTALS_RECEIVED, UserProfileSpotRentalsActionTypes, UserProfileSpotRentalsSentAction, UserProfileSpotRentalsReceivedAction } from "./types";
import { Dispatch } from "react";
import Axios, { AxiosResponse, AxiosError } from "axios";
import { RawParkingSpot, parseParkingSpot } from "../../../Utils";
import { ParkingSpot } from "../../carSearch/types";

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