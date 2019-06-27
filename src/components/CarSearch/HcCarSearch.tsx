import React, { Component } from "react";
import { connect } from "react-redux";
import { match, RouteComponentProps, withRouter } from "react-router";
import { CarSearchParams, fetchCars, fetchParkingSpots, ParkingSpotSearchParams } from "../../redux/carSearch/actions";
import { CarSearchState } from "../../redux/carSearch/types";
import { HcState } from "../../redux/configureStore";
import { setRentCarSearchEndDay, setRentCarSearchEndTime, setRentCarSearchStartDay, setRentCarSearchStartTime } from "../../redux/rentCarTab/actions";
import { RentCarTabState } from "../../redux/rentCarTab/types";
import { setAirportSearchInput } from "../../redux/rentParkingTab/actions";
import { dayTimeToDate } from "../../Utils";
import HcCarList from "../HcCarList";
import HcParkingSearchBox from "../ParkingSearch/HcParkingSearchBox";
import HcRentCarModal from "./HcRentCarModal";
import { RentParkingTabState } from "../../redux/rentParkingTab/types";

interface HcCarSearchPropsMatchParams {
    airport: string,
    start: string,
    end: string
}

interface HcCarSearchProps extends RouteComponentProps, CarSearchState, RentCarTabState {
    airport_input: string,
    form: RentParkingTabState,
    fetchCars: (params: CarSearchParams) => void,
    updateCarSearchInput: (input: string) => void,
    setStartDay: (day: string) => void,
    setEndDay: (day: string) => void,
    setStartTime: (time: string) => void,
    setEndTime: (time: string) => void,
    fetchParkingSpotRentals: (params: ParkingSpotSearchParams) => void,
    match: match<HcCarSearchPropsMatchParams>
}

class HcCarSearch extends Component<HcCarSearchProps> {

    constructor(props: HcCarSearchProps) {
        super(props);
    }

    private onInputChange = (input: string): void => {

        if (input !== undefined) {
            const { start_day, start_time, end_day, end_time } = this.props.form;
            // const start = dayTimeToDate(start_day, start_time);
            // const end = dayTimeToDate(end_day, end_time);

            this.props.fetchParkingSpotRentals({
                airport_name: input,
                start_date: dayTimeToDate(start_day, start_time, ' '),
                end_date: dayTimeToDate(end_day, end_time, '')
            });

            this.props.history.push(`/voiture/${input}`);
        }
    }

    public render() {
        return (
            <main className="search-page">
                <HcParkingSearchBox
                    show_labels={true}
                    box_mode={false}
                    validate={false}
                    init={true}
                    labels_type='parking_spots'
                    onInputChange={this.onInputChange}
                />
                <HcCarList />
                <HcRentCarModal />
            </main>
        );
    }
}

export default
    withRouter(
        connect(
            (state: HcState) => ({
                ...state.car_search,
                ...state.rent_tabs.rent_car_tab,
                form: state.rent_tabs.rent_parking_spot_tab,
                airport_input: state.rent_tabs.rent_parking_spot_tab.parking_search_input_value
            }),
            {
                fetchCars: (params: CarSearchParams) => fetchCars(params),
                fetchParkingSpotRentals: (params: ParkingSpotSearchParams) => fetchParkingSpots(params),
                updateCarSearchInput: (input: string) => setAirportSearchInput(input),
                setStartDay: (day: string) => setRentCarSearchStartDay(day),
                setEndDay: (day: string) => setRentCarSearchEndDay(day),
                setStartTime: (time: string) => setRentCarSearchStartTime(time),
                setEndTime: (time: string) => setRentCarSearchEndTime(time)
            }
        )(HcCarSearch)
    );