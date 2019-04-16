import React from "react";
import Col from "react-bootstrap/Col";

export default function RecordItem(props: any) {
    return (
        <Col>
            <div>
                <p className="record-value">{props.value}</p>
                <p className="record-text">{props.text}</p>
            </div>
        </Col>
    );
}