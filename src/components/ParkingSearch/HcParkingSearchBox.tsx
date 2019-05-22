import React, { FunctionComponent } from "react";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import HcFormGroup from "../Form/HcFormGroup";
import HcParkingSearchInput from "./HcParkingSearchInput";

export interface HcParkingSearchBoxProps {
    multiple_rows: boolean,
    show_labels: boolean
}

const HcParkingSearchBox: FunctionComponent<HcParkingSearchBoxProps> = ({ multiple_rows, show_labels, children }) => {

    const dir = multiple_rows ? Col : Row;

    return (
        <Form>
            <Form.Row>

                <Form.Group as={Col} md={4} controlId="parkingLocation">
                    {show_labels ? <Form.Label>Lieu de stationnement</Form.Label> : null}
                    <HcParkingSearchInput />
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

            {children}
        </Form>
    );
};

export default HcParkingSearchBox;