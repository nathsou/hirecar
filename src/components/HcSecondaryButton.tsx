import React from 'react';
import Button from "react-bootstrap/Button";

export default function (props: any) {
    if (props.type === "submit") {
        return (
            ///@ts-ignore
            <Button variant='hc-secondary' type={props.type}>{props.children}</Button>
        );
    } else {
        return (
            ///@ts-ignore
            <Button variant='hc-secondary' type={props.type} onClick={() => props.handleClick()}>{props.children}</Button>
        );
    }
}