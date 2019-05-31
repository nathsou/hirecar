import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

interface HcInputFormGroupProps {
    md?: number,
    controlId: string,
    validationMessage?: string,
    label: string,
    showLabel?: boolean,
    type: string,
    placeholder: string,
    value: string,
    validate?: boolean,
    as?: typeof Col | typeof Row,
    onChange: (event: any) => void
}

export default class HcInputFormGroup extends Component<HcInputFormGroupProps> {
    public render() {

        const dir = this.props.as ? this.props.as : Col;
        const show_label = this.props.showLabel !== undefined ? this.props.showLabel : true;
        const { validationMessage } = this.props;
        const validate = this.props.validate !== undefined ? this.props.validate : true;

        return (
            <Form.Group as={dir} md={this.props.md} controlId={this.props.controlId}>
                {show_label ? <Form.Label className={validationMessage}>{this.props.label}</Form.Label> : null}
                <Form.Control
                    className={`form-control ${validationMessage ? 'is-invalid' : ''}`}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
                {validate && validationMessage ? <div className='invalid-feedback'>{validationMessage}</div> : null}
            </Form.Group>
        );
    }
}
