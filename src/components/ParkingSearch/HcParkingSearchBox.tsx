import React, { FunctionComponent } from "react";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import HcFormGroup from "../Form/HcFormGroup";
import HcAirportSearchInput, { HcAirportSearchInputProps } from "./HcAirportSearchInput";

export interface HcParkingSearchBoxProps extends Pick<HcAirportSearchInputProps, 'onAirportsReceived' | 'onInputChange'> {
    box_mode: boolean,
    show_labels: boolean
}

const HcParkingSearchBox: FunctionComponent<HcParkingSearchBoxProps> = (
    { box_mode, show_labels, children, onAirportsReceived, onInputChange }) => {

    const dir = box_mode ? Col : Row;

    return (
        <Form>
            <Form.Row>

                <Form.Group as={Col} md={box_mode ? 12 : 4} controlId="parkingLocation">
                    {show_labels ? <Form.Label>Lieu de stationnement</Form.Label> : null}
                <HcAirportSearchInput
                    onAirportsReceived={onAirportsReceived}
                    onInputChange={onInputChange}
                />
                </Form.Group>

            <HcFormGroup
                size="4"
                controlId="parkingStartDate"
                className=""
                label="Début de la location"
                showLabel={show_labels}
                name="parkingStartDate"
                type="date"
                placeholder=""
                value=""
                as={dir}
                onChange={() => { }}
            />

            <HcFormGroup
                size="2"
                controlId="parkingStartHour"
                className=""
                label="Heure"
                showLabel={show_labels}
                type="time"
                name="parkingStartHour"
                placeholder=""
                value=""
                as={dir}
                onChange={() => { }}
            />

            <HcFormGroup
                size="4"
                controlId="parkingEndDate"
                className=""
                label="Fin de la location"
                showLabel={show_labels}
                type="date"
                name="parkingEndDate"
                placeholder=""
                value=""
                as={dir}
                onChange={() => { }}
            />

            <HcFormGroup
                size="2"
                controlId="parkingEndHour"
                className=""
                label="Heure"
                showLabel={show_labels}
                type="time"
                name="parkingEndHour"
                placeholder=""
                value=""
                as={dir}
                onChange={() => { }}
            />
            </Form.Row>

            { children }
        </Form >
    );
};

export default HcParkingSearchBox;