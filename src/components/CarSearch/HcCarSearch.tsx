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
    onParkingSearchChange: (value: string) => void,
    match: match<HcCarSearchPropsMatchParams>
}

class HcCarSearch extends Component<HcCarSearchProps> {

    constructor(props: HcCarSearchProps) {
        super(props);

        // const airport = props.match.params.airport || '';
        // if (airport !== '') {
        //     this.props.onParkingSearchChange(airport);
        //     this.onInputChange();
        // }
    }

    public componentDidUpdate(prev_props: HcCarSearchProps) {
        const props = this.props;
        if (
            (prev_props.start_day !== props.start_day) ||
            (prev_props.end_day !== props.end_day) ||
            (prev_props.start_time !== props.start_time) ||
            (prev_props.end_time !== props.end_time)
        ) {
            this.onInputChange();
        }
    }

    private onInputChange = (inp?: string): void => {

        const input = inp || this.props.form.parking_search_input_value;

        if (input !== undefined) {
            const { start_day, start_time, end_day, end_time } = this.props.form;

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
                    min_day={new Date().toISOString()}
                    labels_type='parking_spots'
                    onInputChange={this.onInputChange}
                />
                <HcCarList />
                <HcRentCarModal onUpdate={() => { this.onInputChange(); }} />
            </main>
        );
    }
}

export default
    withRouter(
        connect(
            (state: HcState) => ({
                ...state.car_search,
                ...state.rent_tabs.rent_parking_spot_tab,
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
                setEndTime: (time: string) => setRentCarSearchEndTime(time),
                onParkingSearchChange: (value: string) => setAirportSearchInput(value)
            }
        )(HcCarSearch)
    );