import { AdminRequestParkingsAction, ADMIN_REQUEST_PARKINGS, AdminParkingsReceivedAction, ADMIN_PARKINGS_RECEIVED, UserProfileAdminActionTypes, ADMIN_DELETE_PARKING, AdminDeleteParkingAction, TOGGLE_ADMIN_PARKING_MODAL, ToggleAdminParkingModalAction, CancelAdminDeleteParkingAction, CANCEL_ADMIN_DELETE_PARKING, AdminDeleteParkingSentAction, AdminDeleteParkingReceivedAction, ADMIN_DELETE_PARKING_SENT, ADMIN_DELETE_PARKING_RECEIVED, AdminDeleteParkingErrorAction, ADMIN_DELETE_PARKING_ERROR_MSG } from "./types";
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

export function onAdminParkingDelete(id: number): AdminDeleteParkingAction {
    return {
        type: ADMIN_DELETE_PARKING,
        id
    };
}

export function onAdminParkingDeleteCancel(): CancelAdminDeleteParkingAction {
    return {
        type: CANCEL_ADMIN_DELETE_PARKING
    };
}

export function fetchAdminParkingLots() {
    return (dispatch: Dispatch<UserProfileAdminActionTypes>) => {
        dispatch(adminRequestParking());

        Axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/parking_lots`)
            .then((res: AxiosResponse) => {
                const parking_lots = resToJSON(res).parking_lots as RawParkingLot[];
                const parsed_parking_lots = parking_lots.map(parseParkingLot);
                dispatch(adminParkingsReceived(parsed_parking_lots));
            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            });
    }
}

export function toggleAdminParkingModal(show: boolean): ToggleAdminParkingModalAction {
    return {
        type: TOGGLE_ADMIN_PARKING_MODAL,
        show
    };
}

export function onAdminParkingDeleteSent(): AdminDeleteParkingSentAction {
    return {
        type: ADMIN_DELETE_PARKING_SENT
    };
}

export function onAdminParkingDeleteReceived(id: number): AdminDeleteParkingReceivedAction {
    return {
        type: ADMIN_DELETE_PARKING_RECEIVED,
        id
    };
}

export function updateDeleteErrorInput(error: string): AdminDeleteParkingErrorAction {
    return {
        type: ADMIN_DELETE_PARKING_ERROR_MSG,
        error
    }
}

export function postAdminDeleteParking(id: number) {

    return (dispatch: Dispatch<UserProfileAdminActionTypes>) => {
        dispatch(onAdminParkingDeleteSent());

        Axios.delete(`${process.env.REACT_APP_HIRECAR_API_URI}/parking_lots/${id}`)
            .then(() => {
                dispatch(onAdminParkingDeleteReceived(id));
            }).catch((error: AxiosError) => {
                const response = error.response;
                if (response !== undefined && response.status === 409) {
                    if (response.data) {
                        dispatch(updateDeleteErrorInput("Des réservations de parkings sont en cours sur ce site."));
                    }
                }
            })
    }
}