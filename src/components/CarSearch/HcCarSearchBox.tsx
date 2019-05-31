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
        <div className="search-box-container">
            <Form className="search-box-form">
                <Form.Row>
                    <Form.Group as={Col} md={box_mode ? 12 : 4} controlId="carLocation">
                        {show_labels ? <Form.Label>Aéroport de départ</Form.Label> : null}
                        <HcAirportSearchInput onInputChange={onInputChange} />
                    </Form.Group>

                    <HcInputFormGroup
                        md={4}
                        controlId="carStartDate"
                        validationMessage=""
                        label="Date de départ"
                        showLabel={show_labels}
                        type="date"
                        placeholder=""
                        value={start_day}
                        as={dir}
                        onChange={e => setStartDay(e.target.value)}
                    />

                    <HcInputFormGroup
                        md={2}
                        controlId="carStartHour"
                        label="Heure"
                        showLabel={show_labels}
                        type="time"
                        placeholder=""
                        value={start_time}
                        as={dir}
                        onChange={e => setStartTime(e.target.value)}
                    />

                    <HcInputFormGroup
                        md={4}
                        controlId="carEndDate"
                        label="Date de retour"
                        showLabel={show_labels}
                        type="date"
                        placeholder=""
                        value={end_day}
                        as={dir}
                        onChange={e => setEndDay(e.target.value)}
                    />

                    <HcInputFormGroup
                        md={2}
                        controlId="carEndHour"
                        label="Heure"
                        showLabel={show_labels}
                        type="time"
                        placeholder=""
                        value={end_time}
                        as={dir}
                        onChange={e => setEndTime(e.target.value)}
                    />
                </Form.Row>

                {children}
            </Form>
        </div>
    );
};


export default connect(
    (state: HcState) => state.rent_tabs.rent_car_tab,
    {
        setStartDay: (day: string) => setRentCarSearchStartDay(day),
        setEndDay: (day: string) => setRentCarSearchEndDay(day),
        setStartTime: (time: string) => setRentCarSearchStartTime(time),
        setEndTime: (time: string) => setRentCarSearchEndTime(time)
    }
)(HcCarSearchBox);