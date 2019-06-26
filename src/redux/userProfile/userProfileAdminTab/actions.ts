import { AdminRequestParkingsAction, ADMIN_REQUEST_PARKINGS, AdminParkingsReceivedAction, ADMIN_PARKINGS_RECEIVED, UserProfileAdminActionTypes } from "./types";
import { ParkingLot } from "../../parkingSearch/types";
import { Dispatch } from "react";
import Axios, { AxiosResponse, AxiosError } from "axios";
import { resToJSON, RawParkingLot, parseParkingLot } from "../../../Utils";

export function adminRequestParking(): AdminRequestParkingsAction {
    return {
        type: ADMIN_REQUEST_PARKINGS
    };
}

export function adminParkingsReceived(parking_lots: ParkingLot[]): AdminParkingsReceivedAction {
    return {
        type: ADMIN_PARKINGS_RECEIVED,
        parking_lots
    };
}

export function fetchAdminParkingLots() {
    return (dispatch: Dispatch<UserProfileAdminActionTypes>) => {
        dispatch(adminRequestParking());

        Axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/parking_lots`)
            .then((res: AxiosResponse) => {
                console.log("test");
                const parking_lots = resToJSON(res).parking_lots as RawParkingLot[];
                const parsed_parking_lots = parking_lots.map(parseParkingLot);
                dispatch(adminParkingsReceived(parsed_parking_lots));
                console.log(res);
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            });
    }
}