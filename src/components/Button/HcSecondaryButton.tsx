import React from 'react';
import Button from "react-bootstrap/Button";

export default function (props: any) {

    return (
        <Button
            ///@ts-ignore
            variant='hc-secondary'
            type={props.type}
            onClick={() => props.handleClick ? props.handleClick() : {}}>
            {props.children}
        </ Button>
    );
}