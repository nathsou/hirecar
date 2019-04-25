import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

interface HcFormGroupProps {
    size: string,
    controlId: string,
    className: string,
    label: string,
    type: string,
    name: string,
    placeholder: string,
    value: string,
    onChange: (event: any) => void
}

export default class HcFormGroup extends Component<HcFormGroupProps> {
    render() {
        return (
            <Form.Group as={Col} md={this.props.size} controlId={this.props.controlId}>
                <Form.Label className={this.props.className}>{this.props.label}</Form.Label>
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
