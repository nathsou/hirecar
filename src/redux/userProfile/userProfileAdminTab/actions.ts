import { AdminRequestParkingsAction, ADMIN_REQUEST_PARKINGS, AdminParkingsReceivedAction, ADMIN_PARKINGS_RECEIVED, UserProfileAdminActionTypes, ADMIN_DELETE_PARKING, AdminDeleteParkingAction, TOGGLE_ADMIN_PARKING_MODAL, ToggleAdminParkingModalAction, CancelAdminDeleteParkingAction, CANCEL_ADMIN_DELETE_PARKING, AdminDeleteParkingSentAction, AdminDeleteParkingReceivedAction, ADMIN_DELETE_PARKING_SENT, ADMIN_DELETE_PARKING_RECEIVED, AdminDeleteParkingErrorAction, ADMIN_DELETE_PARKING_ERROR_MSG, TOGGLE_ADMIN_PARKING_FORM, ToggleAdminParkingFormAction, UPDATE_ADMIN_PARKING_LABEL_INPUT, UpdateAdminParkingLabelAction, UpdateAdminParkingLatAction, UpdateAdminParkingLngAction, UPDATE_ADMIN_PARKING_LAT_INPUT, UPDATE_ADMIN_PARKING_LNG_INPUT, UpdateAdminParkingCapacityAction, UPDATE_ADMIN_PARKING_CAPACITY_INPUT, UpdateAdminParkingPriceAction, UPDATE_ADMIN_PARKING_PRICE_INPUT, UPDATE_ADMIN_PARKING_AIRPORT_SELECT, UpdateAdminParkingAirportAction, ADMIN_REQUEST_AIRPORTS, AdminRequestAirportsAction, AdminAirportsReceivedAction, ADMIN_AIRPORTS_RECEIVED, SubmitAdminParkingAction, SUMBIT_ADMIN_PARKING, AdminParkingSentAction, ADMIN_PARKING_FORM_SENT, ADMIN_PARKING_FORM_RECEIVED, AdminParkingReceivedAction, ResetAdminParkingFormAction, RESET_ADMIN_PARKING_FORM, AdminParkingSavedAction, ADMIN_PARKING_SAVED } from "./types";
import { ParkingLot } from "../../parkingSearch/types";
import { Dispatch } from "react";
import Axios, { AxiosResponse, AxiosError } from "axios";
import { resToJSON, RawParkingLot, parseParkingLot, RawAirport, parseAirport } from "../../../Utils";
import { Airport } from "../../rentParkingTab/types";
import { MIN_API_CALL_DELAY } from "../../..";
import throttle from "lodash.throttle";

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

export function toggleAdminParkingForm(): ToggleAdminParkingFormAction {
    return {
        type: TOGGLE_ADMIN_PARKING_FORM
    }
}

export function updateAdminParkingLabelInput(value: string): UpdateAdminParkingLabelAction {
    return {
        type: UPDATE_ADMIN_PARKING_LABEL_INPUT,
        value
    };
}

export function updateAdminParkingLatInput(value: string): UpdateAdminParkingLatAction {
    return {
        type: UPDATE_ADMIN_PARKING_LAT_INPUT,
        value
    };
}
export function updateAdminParkingLngInput(value: string): UpdateAdminParkingLngAction {
    return {
        type: UPDATE_ADMIN_PARKING_LNG_INPUT,
        value
    };
}

export function updateAdminParkingCapacityInput(value: string): UpdateAdminParkingCapacityAction {
    return {
        type: UPDATE_ADMIN_PARKING_CAPACITY_INPUT,
        value
    };
}
export function updateAdminParkingPriceInput(value: string): UpdateAdminParkingPriceAction {
    return {
        type: UPDATE_ADMIN_PARKING_PRICE_INPUT,
        value
    };
}

export function updateAdminParkingAirportSelect(value: number): UpdateAdminParkingAirportAction {
    return {
        type: UPDATE_ADMIN_PARKING_AIRPORT_SELECT,
        value
    }
}

export function requestAirports(): AdminRequestAirportsAction {
    return {
        type: ADMIN_REQUEST_AIRPORTS
    };
}

export function airportsReceived(airports: Airport[]): AdminAirportsReceivedAction {
    return {
        type: ADMIN_AIRPORTS_RECEIVED,
        airports
    };
}

export const fetchAdminAirports = throttle(() => {
    return (dispatch: Dispatch<UserProfileAdminActionTypes>) => {

        dispatch(requestAirports());
        Axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/airports`)
            .then((res: AxiosResponse) => {
                const airports = resToJSON(res).airports as RawAirport[];
                const parsed_airports = airports.map(parseAirport);

                dispatch(airportsReceived(parsed_airports));
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    };
}, MIN_API_CALL_DELAY);

export function submitAdminParkingForm(): SubmitAdminParkingAction {
    return {
        type: SUMBIT_ADMIN_PARKING
    }
}

export function adminParkingFormSent(): AdminParkingSentAction {
    return {
        type: ADMIN_PARKING_FORM_SENT
    };
}

export function adminParkingFormReceived(data: ParkingLot, id: number): AdminParkingReceivedAction {
    return {
        type: ADMIN_PARKING_FORM_RECEIVED,
        data,
        id
    };
}

export function adminParkingSaved(): AdminParkingSavedAction {
    return {
        type: ADMIN_PARKING_SAVED
    };
}

export function resetAdminParkingForm(): ResetAdminParkingFormAction {
    return {
        type: RESET_ADMIN_PARKING_FORM
    };
}

export function postUserAdminParkingForm(data: ParkingLot) {

    return (dispatch: Dispatch<UserProfileAdminActionTypes>) => {
        dispatch(adminParkingFormSent());

        Axios.post(`${process.env.REACT_APP_HIRECAR_API_URI}/parking_lots`, data)

            .then((res: AxiosResponse) => {
                const { id } = res.data;
                dispatch(resetAdminParkingForm());
                dispatch(adminParkingFormReceived(data, parseInt(id)));
                setTimeout(() => {
                    dispatch(adminParkingSaved());
                }, 1000);

            }).catch((error: AxiosError) => {
                const response = error.response;
                console.log(response);
            });
    }
}