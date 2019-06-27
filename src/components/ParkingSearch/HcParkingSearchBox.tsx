import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { setRentParkingSearchEndDay, setRentParkingSearchEndTime, setRentParkingSearchStartDay, setRentParkingSearchStartTime } from "../../redux/rentParkingTab/actions";
import { RentParkingTabState } from "../../redux/rentParkingTab/types";
import HcInputFormGroup from "../Form/HcInputFormGroup";
import HcAirportSearchInput, { HcAirportSearchInputProps } from "./HcAirportSearchInput";
import { getDefaultRentDates } from "../../Utils";

export interface HcParkingSearchBoxProps extends Pick<HcAirportSearchInputProps, 'onInputChange'> {
    box_mode: boolean,
    show_labels: boolean,
    show_input?: boolean,
    validate?: boolean,
    min_day?: string,
    max_day?: string,
    init?: boolean,
    labels_type: 'parking_lots' | 'parking_spots',
    onStartDateChange?: (date: string) => void,
    onStartTimeChange?: (time: string) => void,
    onEndTimeChange?: (time: string) => void,
    onEndDateChange?: (date: string) => void,
    setStartDay: (day: string) => void,
    setEndDay: (day: string) => void,
    setStartTime: (time: string) => void,
    setEndTime: (time: string) => void
}

class HcParkingSearchBox extends Component<HcParkingSearchBoxProps & RentParkingTabState> {

    constructor(props: HcParkingSearchBoxProps & RentParkingTabState) {
        super(props);

        if (props.init) {

            const { start_date, start_time, end_date, end_time } = getDefaultRentDates();

            props.setStartDay(start_date);
            props.setStartTime(start_time);
            props.setEndDay(end_date);
            props.setEndTime(end_time);
        }
    }

    public render() {

        const {
            box_mode,
            show_labels,
            show_input,
            children,
            onInputChange,
            setStartDay: setStartDate,
            setEndDay: setEndDate,
            start_day,
            end_day,
            setStartTime,
            setEndTime,
            start_time,
            end_time,
            validate,
            validation,
            labels_type,
            onStartDateChange,
            onStartTimeChange,
            onEndDateChange,
            onEndTimeChange,
            min_day,
            max_day,
        } = this.props;

        const {
            // input_msg,
            start_day_msg,
            end_day_msg,
            start_time_msg,
            end_time_msg
        } = validation;

        const labels = {
            airport: labels_type === 'parking_lots' ? 'Lieu de stationnement' : 'Aéroport de départ',
            start: labels_type === 'parking_lots' ? 'Début de la location' : 'Date de départ',
            end: labels_type === 'parking_lots' ? 'Fin de la location' : 'Date de retour'
        };

        return (
            <div className="search-box-container">
                <Form className="search-box-form">
                    <Form.Row>

                        {(show_input === undefined || show_input === true) ?
                            <Form.Group as={Col} md={box_mode ? 12 : 4} controlId="parkingLocation">
                                {show_labels ? <Form.Label>{labels.airport}</Form.Label> : null}
                                <HcAirportSearchInput onInputChange={onInputChange} />
                            </Form.Group> : null
                        }

                        <HcInputFormGroup
                            md={box_mode ? 4 : 2}
                            controlId="parkingStartDate"
                            label={labels.start}
                            showLabel={show_labels}
                            type="date"
                            placeholder=""
                            min={min_day}
                            max={end_day}
                            value={start_day || ''}

                            as={Col}
                            onChange={e => {
                                const date = e.target.value;
                                if (onStartDateChange) {
                                    onStartDateChange(date);
                                }
                                setStartDate(date);
                            }}
                            validationMessage={start_day_msg}
                            validate={validate}
                        />

                        <HcInputFormGroup
                            md={2}
                            controlId="parkingStartHour"
                            label="Heure"
                            showLabel={show_labels}
                            type="time"
                            placeholder=""
                            value={start_time || ''}
                            as={Col}
                            onChange={e => {
                                const time = e.target.value;
                                if (onStartTimeChange) {
                                    onStartTimeChange(time);
                                }
                                setStartTime(time);
                            }}
                            validationMessage={start_time_msg}
                            validate={validate}
                        />

                        <HcInputFormGroup
                            md={box_mode ? 4 : 2}
                            controlId="parkingEndDate"
                            label={labels.end}
                            showLabel={show_labels}
                            type="date"
                            placeholder=""
                            value={end_day || ''}
                            min={start_day}
                            max={max_day}
                            as={Col}
                            onChange={e => {
                                const date = e.target.value;
                                if (onEndDateChange) {
                                    onEndDateChange(date);
                                }
                                setEndDate(date);
                            }}
                            validationMessage={end_day_msg}
                            validate={validate}
                        />

                        <HcInputFormGroup
                            md={2}
                            controlId="parkingEndHour"
                            label="Heure"
                            showLabel={show_labels}
                            type="time"
                            placeholder=""
                            value={end_time || ''}
                            as={Col}
                            onChange={e => {
                                const time = e.target.value;
                                if (onEndTimeChange) {
                                    onEndTimeChange(time);
                                }
                                setEndTime(time);
                            }}
                            validationMessage={end_time_msg}
                            validate={validate}
                        />
                    </Form.Row>

                    {children}
                </Form >
            </div>
        );
    }
}


export default connect(
    (state: HcState) => state.rent_tabs.rent_parking_spot_tab,
    {
        setStartDay: (day: string) => setRentParkingSearchStartDay(day),
        setEndDay: (day: string) => setRentParkingSearchEndDay(day),
        setStartTime: (time: string) => setRentParkingSearchStartTime(time),
        setEndTime: (time: string) => setRentParkingSearchEndTime(time)
    }
)(HcParkingSearchBox);