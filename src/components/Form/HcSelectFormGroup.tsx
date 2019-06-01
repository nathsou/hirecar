import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FormControlProps } from "react-bootstrap/FormControl";
import Row from 'react-bootstrap/Row';

interface HcSelectFormGroupProps extends Pick<FormControlProps, 'value'> {
    controlId: string,
    md?: number,
    className?: string,
    label: string,
    showLabel?: boolean,
    as?: typeof Col | typeof Row,
    options: { id: number, text: string }[],
    onChange: (selected_idx: number) => void
}

export default class HcSelectFormGroup extends Component<HcSelectFormGroupProps> {

    public render() {

        const dir = this.props.as ? this.props.as : Col;
        const show_label = this.props.showLabel !== undefined ? this.props.showLabel : true;
        const options = this.props.options;

        return (
            <Form.Group as={dir} md={this.props.md} controlId={this.props.controlId}>
                {show_label ? <Form.Label className={this.props.className}>{this.props.label}</Form.Label> : null}
                <Form.Control as="select"
                    value={this.props.value}
                    onChange={(e: any) => this.props.onChange(parseInt(e.target.value))}
                >
                    {options.map((optn) =>
                        (<option value={optn.id} key={optn.id}>
                            {optn.text}
                        </option>)
                    )}
                </Form.Control>
            </Form.Group>
        );
    }
}
