import React, { FunctionComponent } from "react";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import HcFormGroup from "../Form/HcFormGroup";
import HcAirportSearchInput from "../ParkingSearch/HcAirportSearchInput";
import { HcParkingSearchBoxProps } from "../ParkingSearch/HcParkingSearchBox";

const HcCarSearchBox: FunctionComponent<HcParkingSearchBoxProps> = (
    { box_mode, show_labels, children, onAirportsReceived, onInputChange }) => {

    const dir = box_mode ? Col : Row;

    return (
        <Form>
            <Form.Row>

                <Form.Group as={Col} md={box_mode ? 12 : 4} controlId="carLocation">
                    {show_labels ? <Form.Label>Aéroport de départ</Form.Label> : null}
                    <HcAirportSearchInput
                        onAirportsReceived={onAirportsReceived}
                        onInputChange={onInputChange}
                    />
                </Form.Group>

                <HcFormGroup
                    size="4"
                    controlId="carStartDate"
                    className=""
                    label="Date de départ"
                    showLabel={show_labels}
                    name="carStartDate"
                    type="date"
                    placeholder=""
                    value=""
                    as={dir}
                    onChange={() => { }}
                />

                <HcFormGroup
                    size="2"
                    controlId="carStartHour"
                    className=""
                    label="Heure"
                    showLabel={show_labels}
                    type="time"
                    name="carStartHour"
                    placeholder=""
                    value=""
                    as={dir}
                    onChange={() => { }}
                />

                <HcFormGroup
                    size="4"
                    controlId="carEndDate"
                    className=""
                    label="Date de retour"
                    showLabel={show_labels}
                    type="date"
                    name="carEndDate"
                    placeholder=""
                    value=""
                    as={dir}
                    onChange={() => { }}
                />

                <HcFormGroup
                    size="2"
                    controlId="carEndHour"
                    className=""
                    label="Heure"
                    showLabel={show_labels}
                    type="time"
                    name="carEndHour"
                    placeholder=""
                    value=""
                    as={dir}
                    onChange={() => { }}
                />
            </Form.Row>

            {children}
        </Form>
    );
};

export default HcCarSearchBox;