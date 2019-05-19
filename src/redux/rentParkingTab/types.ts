
export interface Airport {
    id: number,
    name: string,
    lat: number,
    lng: number
}

export interface RentParkingTabState {
    parking_search_input_value: string,
    start_date: Date | null,
    end_date: Date | null,
    autocomplete_airports: string[]
}

export const defaultRentParkingTabState: RentParkingTabState = {
    parking_search_input_value: '',
    start_date: null,
    end_date: null,
    autocomplete_airports: []
};

export const UPDATE_PARKING_SEARCH_INPUT = "UPDATE_PARKING_SEARCH_INPUT";
export const AIRPORTS_RECEIVED = "AIRPORTS_RECEIVED";


export interface UpdateParkingSearchAction {
    type: typeof UPDATE_PARKING_SEARCH_INPUT,
    value: string
}


export interface AirportsReceivedAction {
    type: typeof AIRPORTS_RECEIVED,
    airports: string[]
}

export type RentParkingTabActionTypes = UpdateParkingSearchAction | AirportsReceivedAction;