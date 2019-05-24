import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { capitalize } from "../../Utils";
import { Gearbox, Fuel } from "../../redux/carSearch/types";

interface HcSelectFormGroupProps {
    size: string,
    controlId: string,
    className: string,
    label: string,
    showLabel?: boolean,
    name: string,
    as?: typeof Col | typeof Row,
    values: (number | Gearbox | Fuel)[]
}

export default class HcSelectFormGroup extends Component<HcSelectFormGroupProps> {

    public render() {

        const dir = this.props.as ? this.props.as : Col;
        const show_label = this.props.showLabel !== undefined ? this.props.showLabel : true;
        const values = this.props.values;

        return (
            <Form.Group as={dir} md={this.props.size} controlId={this.props.controlId}>
                {show_label ? <Form.Label className={this.props.className}>{this.props.label}</Form.Label> : null}
                <Form.Control as="select" name={this.props.name}>
                    {values.map((value, index) =>
                        (<option value={typeof value === 'number' ? value : value.id} key={index}>
                            {typeof value === 'number' ? value : capitalize(value.type)}
                        </option>)
                    )}
                </Form.Control>
            </Form.Group>
        );
    }
}
