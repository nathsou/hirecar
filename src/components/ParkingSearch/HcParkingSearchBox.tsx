import React, { FunctionComponent, Component } from "react";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { setRentParkingSearchEndDay, setRentParkingSearchEndTime, setRentParkingSearchStartDay, setRentParkingSearchStartTime } from "../../redux/rentParkingTab/actions";
import { RentParkingTabState } from "../../redux/rentParkingTab/types";
import HcInputFormGroup from "../Form/HcInputFormGroup";
import HcAirportSearchInput, { HcAirportSearchInputProps } from "./HcAirportSearchInput";

export interface HcParkingSearchBoxProps extends Pick<HcAirportSearchInputProps, 'onInputChange'> {
    box_mode: boolean,
    show_labels: boolean,
    show_input?: boolean,
    validate?: boolean,
    init?: boolean,
    setStartDay: (day: string) => void,
    setEndDay: (day: string) => void,
    setStartTime: (time: string) => void,
    setEndTime: (time: string) => void
}

class HcParkingSearchBox extends Component<HcParkingSearchBoxProps & RentParkingTabState> {

    constructor(props: HcParkingSearchBoxProps & RentParkingTabState) {
        super(props);

        if (props.init) {
            const now = Date.now();
            const tomorrow = new Date(now + 24 * 3600 * 1000).toISOString().split('T')[0];
            const in_two_weeks = new Date(now + 15 * 24 * 3600 * 1000).toISOString().split('T')[0];

            props.setStartDay(tomorrow);
            props.setStartTime('08:00:00');
            props.setEndDay(in_two_weeks);
            props.setEndTime('17:30:00');
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
            validation
        } = this.props;

        const {
            // input_msg,
            start_day_msg,
            end_day_msg,
            start_time_msg,
            end_time_msg
        } = validation;

        return (
            <div className="search-box-container">
                <Form className="search-box-form">
                    <Form.Row>

                        {(show_input === undefined || show_input === true) ?
                            <Form.Group as={Col} md={box_mode ? 12 : 4} controlId="parkingLocation">
                                {show_labels ? <Form.Label>Lieu de stationnement</Form.Label> : null}
                                <HcAirportSearchInput onInputChange={onInputChange} />
                            </Form.Group> : null
                        }

                        <HcInputFormGroup
                            md={box_mode ? 4 : 2}
                            controlId="parkingStartDate"
                            label="Début de la location"
                            showLabel={show_labels}
                            type="date"
                            placeholder=""
                            value={start_day || ''}
                            as={Col}
                            onChange={e => setStartDate(e.target.value)}
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
                            onChange={e => setStartTime(e.target.value)}
                            validationMessage={start_time_msg}
                            validate={validate}
                        />

                        <HcInputFormGroup
                            md={box_mode ? 4 : 2}
                            controlId="parkingEndDate"
                            label="Fin de la location"
                            showLabel={show_labels}
                            type="date"
                            placeholder=""
                            value={end_day || ''}
                            as={Col}
                            onChange={e => setEndDate(e.target.value)}
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
                            onChange={e => setEndTime(e.target.value)}
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