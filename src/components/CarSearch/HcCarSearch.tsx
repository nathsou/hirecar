import React, { Component } from "react";
import { connect } from "react-redux";
import { match, RouteComponentProps, withRouter } from "react-router";
import { CarSearchParams, fetchCars } from "../../redux/carSearch/actions";
import { CarSearchState } from "../../redux/carSearch/types";
import { HcState } from "../../redux/configureStore";
import { setRentCarSearchEndDay, setRentCarSearchEndTime, setRentCarSearchStartDay, setRentCarSearchStartTime } from "../../redux/rentCarTab/actions";
import { setAirportSearchInput } from "../../redux/rentParkingTab/actions";
import HcCarList from "../HcCarList";
import HcCarSearchBox from "./HcCarSearchBox";
import { RentCarTabState } from "../../redux/rentCarTab/types";
import { dayTimeToDate } from "../../Utils";

interface HcCarSearchPropsMatchParams {
    airport: string,
    start: string,
    end: string
}

interface HcCarSearchProps extends RouteComponentProps, CarSearchState, RentCarTabState {
    airport_input: string,
    fetchCars: (params: CarSearchParams) => void,
    updateCarSearchInput: (input: string) => void,
    setStartDay: (day: string) => void,
    setEndDay: (day: string) => void,
    setStartTime: (time: string) => void,
    setEndTime: (time: string) => void,
    match: match<HcCarSearchPropsMatchParams>
}

class HcCarSearch extends Component<HcCarSearchProps> {

    constructor(props: HcCarSearchProps) {
        super(props);
        const airport = props.match.params.airport || '';
        const start = props.match.params.start || null;
        const end = props.match.params.end || null;

        const start_day = start !== null ? start.slice(0, 10) : null;
        const start_time = start_day !== null ? (start as string).slice(11) : null;

        const end_day = end !== null ? end.slice(0, 10) : null;
        const end_time = end_day !== null ? (end as string).slice(11) : null;

        const start_date = dayTimeToDate(start_day, start_time, ' ');
        const end_date = dayTimeToDate(end_day, end_time, ' ');
        const { setStartDay, setStartTime, setEndDay, setEndTime, updateCarSearchInput, fetchCars } = this.props;

        fetchCars({ airport_name: airport, start_date, end_date });
        updateCarSearchInput(airport);
        setStartDay(start_day || '');
        setStartTime(start_time || '');
        setEndDay(end_day || '');
        setEndTime(end_time || '');
    }

    private onInputChange(): void {

        const { airport_input: input } = this.props;

        if (input !== undefined) {
            const { start_day, start_time, end_day, end_time } = this.props;
            const start = dayTimeToDate(start_day, start_time);
            const end = dayTimeToDate(end_day, end_time);

            this.props.fetchCars({
                airport_name: input,
                start_date: dayTimeToDate(start_day, start_time, ' '),
                end_date: dayTimeToDate(end_day, end_time, '')
            });

            const params = `${input}${start !== null ? `/${start}${end !== null ? `/${end}` : ''}` : ''}`;

            this.props.history.push(`/voiture/${params}`);
        }
    }

    public componentDidUpdate(prev_props: Readonly<HcCarSearchProps>): void {
        const { start_day, start_time, end_day, end_time, airport_input } = this.props;

        if (
            prev_props.airport_input !== airport_input ||
            prev_props.start_day !== start_day ||
            prev_props.start_time !== start_time ||
            prev_props.end_day !== end_day ||
            prev_props.end_time !== end_time
        ) {
            this.onInputChange();
        }
    }

    public render() {
        return (
            <main className="search-page">
                <HcCarSearchBox
                    show_labels={true}
                    box_mode={false}
                />
                <HcCarList />
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
                airport_input: state.rent_tabs.rent_parking_spot_tab.parking_search_input_value
            }),
            {
                fetchCars: (params: CarSearchParams) => fetchCars(params),
                updateCarSearchInput: (input: string) => setAirportSearchInput(input),
                setStartDay: (day: string) => setRentCarSearchStartDay(day),
                setEndDay: (day: string) => setRentCarSearchEndDay(day),
                setStartTime: (time: string) => setRentCarSearchStartTime(time),
                setEndTime: (time: string) => setRentCarSearchEndTime(time)
            }
        )(HcCarSearch)
    );