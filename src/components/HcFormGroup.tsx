import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

interface MyProps {
    size: string,
    controlId: string,
    className: string,
    label: string,
    type: string,
    placeholder: string
}


export default class HcFormGroup extends Component<MyProps> {
    render() {
        return (
            <Form.Group as={Col} md={this.props.size} controlId={this.props.controlId}>
                <Form.Label className={this.props.className}>{this.props.label}</Form.Label>
                <Form.Control type={this.props.type} placeholder={this.props.placeholder} />
            </Form.Group>
        );
    }
}