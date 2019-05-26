import React, { FunctionComponent } from "react";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { setRentParkingSearchEndDay, setRentParkingSearchStartDay, setRentParkingSearchStartTime, setRentParkingSearchEndTime } from "../../redux/rentParkingTab/actions";
import { RentParkingTabState } from "../../redux/rentParkingTab/types";
import HcInputFormGroup from "../Form/HcInputFormGroup";
import HcAirportSearchInput, { HcAirportSearchInputProps } from "./HcAirportSearchInput";

export interface HcParkingSearchBoxProps extends Pick<HcAirportSearchInputProps, 'onInputChange'> {
    box_mode: boolean,
    show_labels: boolean,
    setStartDay: (day: string) => void,
    setEndDay: (day: string) => void,
    setStartTime: (time: string) => void,
    setEndTime: (time: string) => void
}

const HcParkingSearchBox: FunctionComponent<HcParkingSearchBoxProps & RentParkingTabState> = (
    {
        box_mode,
        show_labels,
        children,
        onInputChange,
        setStartDay: setStartDate,
        setEndDay: setEndDate,
        start_day,
        end_day,
        setStartTime,
        setEndTime,
        start_time,
        end_time
    }) => {

    return (
        <div className="search-box-container">
            <Form className="search-box-form">
                <Form.Row>

                    <Form.Group as={Col} md={box_mode ? 12 : 4} controlId="parkingLocation">
                        {show_labels ? <Form.Label>Lieu de stationnement</Form.Label> : null}
                        <HcAirportSearchInput onInputChange={onInputChange} />
                    </Form.Group>

                    <HcInputFormGroup
                        size={box_mode ? 4 : 2}
                        controlId="parkingStartDate"
                        className=""
                        label="Début de la location"
                        showLabel={show_labels}
                        name="parkingStartDate"
                        type="date"
                        placeholder=""
                        value={start_day || ''}
                        as={Col}
                        onChange={e => setStartDate(e.target.value)}
                    />

                    <HcInputFormGroup
                        size={2}
                        controlId="parkingStartHour"
                        className=""
                        label="Heure"
                        showLabel={show_labels}
                        type="time"
                        name="parkingStartHour"
                        placeholder=""
                        value={start_time || ''}
                        as={Col}
                        onChange={e => setStartTime(e.target.value)}
                    />

                    <HcInputFormGroup
                        size={box_mode ? 4 : 2}
                        controlId="parkingEndDate"
                        className=""
                        label="Fin de la location"
                        showLabel={show_labels}
                        type="date"
                        name="parkingEndDate"
                        placeholder=""
                        value={end_day || ''}
                        as={Col}
                        onChange={e => setEndDate(e.target.value)}
                    />

                    <HcInputFormGroup
                        size={2}
                        controlId="parkingEndHour"
                        className=""
                        label="Heure"
                        showLabel={show_labels}
                        type="time"
                        name="parkingEndHour"
                        placeholder=""
                        value={end_time || ''}
                        as={Col}
                        onChange={e => setEndTime(e.target.value)}
                    />
                </Form.Row>

                {children}
            </Form >
        </div>
    );
};

export default connect(
    (state: HcState) => state.rent_tabs.rent_parking_spot_tab,
    {
        setStartDay: (day: string) => setRentParkingSearchStartDay(day),
        setEndDay: (day: string) => setRentParkingSearchEndDay(day),
        setStartTime: (time: string) => setRentParkingSearchStartTime(time),
        setEndTime: (time: string) => setRentParkingSearchEndTime(time)
    }
)(HcParkingSearchBox);