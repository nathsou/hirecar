import React, { FunctionComponent } from "react";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { setRentCarSearchEndDay, setRentCarSearchEndTime, setRentCarSearchStartDay, setRentCarSearchStartTime } from "../../redux/rentCarTab/actions";
import { RentCarTabState } from "../../redux/rentCarTab/types";
import HcInputFormGroup from "../Form/HcInputFormGroup";
import HcAirportSearchInput from "../ParkingSearch/HcAirportSearchInput";
import { HcParkingSearchBoxProps } from "../ParkingSearch/HcParkingSearchBox";


const HcCarSearchBox: FunctionComponent<HcParkingSearchBoxProps & RentCarTabState> = (
    {
        box_mode,
        show_labels,
        children,
        onInputChange,
        start_day,
        end_day,
        start_time,
        end_time,
        setStartDay,
        setEndDay,
        setStartTime,
        setEndTime
    }) => {

    const dir = box_mode ? Col : Row;

    return (
        <Form>
            <Form.Row>

                <Form.Group as={Col} md={box_mode ? 12 : 4} controlId="carLocation">
                    {show_labels ? <Form.Label>Aéroport de départ</Form.Label> : null}
                    <HcAirportSearchInput onInputChange={onInputChange} />
                </Form.Group>

                <HcInputFormGroup
                    size={4}
                    controlId="carStartDate"
                    className=""
                    label="Date de départ"
                    showLabel={show_labels}
                    name="carStartDate"
                    type="date"
                    placeholder=""
                    value={start_day || ''}
                    as={dir}
                    onChange={e => setStartDay(e.target.value)}
                />

                <HcInputFormGroup
                    size={2}
                    controlId="carStartHour"
                    className=""
                    label="Heure"
                    showLabel={show_labels}
                    type="time"
                    name="carStartHour"
                    placeholder=""
                    value={start_time || ''}
                    as={dir}
                    onChange={e => setStartTime(e.target.value)}
                />

                <HcInputFormGroup
                    size={4}
                    controlId="carEndDate"
                    className=""
                    label="Date de retour"
                    showLabel={show_labels}
                    type="date"
                    name="carEndDate"
                    placeholder=""
                    value={end_day || ''}
                    as={dir}
                    onChange={e => setEndDay(e.target.value)}
                />

                <HcInputFormGroup
                    size={2}
                    controlId="carEndHour"
                    className=""
                    label="Heure"
                    showLabel={show_labels}
                    type="time"
                    name="carEndHour"
                    placeholder=""
                    value={end_time || ''}
                    as={dir}
                    onChange={e => setEndTime(e.target.value)}
                />
            </Form.Row>

            {children}
        </Form>
    );
};


export default connect(
    (state: HcState) => state.rent_tabs.rent_car_tab,
    {
        setStartDay: (day: string | null) => setRentCarSearchStartDay(day),
        setEndDay: (day: string | null) => setRentCarSearchEndDay(day),
        setStartTime: (time: string | null) => setRentCarSearchStartTime(time),
        setEndTime: (time: string | null) => setRentCarSearchEndTime(time)
    }
)(HcCarSearchBox);