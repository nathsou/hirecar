import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface HcFormGroupProps {
    size: string,
    controlId: string,
    className: string,
    label: string,
    showLabel?: boolean,
    type: string,
    name: string,
    placeholder: string,
    value: string,
    as?: typeof Col | typeof Row,
    onChange: (event: any) => void
}

export default class HcFormGroup extends Component<HcFormGroupProps> {
    public render() {

        const dir = this.props.as ? this.props.as : Col;
        const show_label = this.props.showLabel !== undefined ? this.props.showLabel : true;

        return (
            <Form.Group as={dir} md={this.props.size} controlId={this.props.controlId}>
                {show_label ? <Form.Label className={this.props.className}>{this.props.label}</Form.Label> : null}
                <Form.Control
                    className={`form-control ${this.props.className ? 'is-invalid' : ''}`}
                    type={this.props.type}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.onChange} />
                {this.props.className ? <div className='invalid-feedback'>{this.props.className}</div> : null}
            </Form.Group>
        );
    }
}
