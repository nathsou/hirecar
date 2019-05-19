import axios, { AxiosResponse, AxiosError } from "axios";
import { Dispatch } from "redux";
import { propsToURIParams } from "../../Utils";
import { RentParkingTabActionTypes, UpdateParkingSearchAction, UPDATE_PARKING_SEARCH_INPUT, Airport, AirportsReceivedAction, AIRPORTS_RECEIVED } from "./types";

export function updateParkingSearchInput(value: string): UpdateParkingSearchAction {
    return {
        type: UPDATE_PARKING_SEARCH_INPUT,
        value
    };
}

export function airportsReceived(airports: Airport[]): AirportsReceivedAction {
    return {
        type: AIRPORTS_RECEIVED,
        airports: airports.map(({ name }) => name)
    };
}

export function searchAirports(input: string) {
    return (dispatch: Dispatch<RentParkingTabActionTypes>) => {
        axios.get(`${process.env.REACT_APP_HIRECAR_API_URI}/airports${propsToURIParams({ name: input })}`)
            .then((res: AxiosResponse) => {
                dispatch(airportsReceived((res.data).airports as Airport[]))
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    };
}