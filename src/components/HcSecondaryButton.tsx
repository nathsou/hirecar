import React from 'react';
import Button from "react-bootstrap/Button";

export default function (props: any) {
    return (
        ///@ts-ignore
        <Button variant='hc-secondary'>{props.children}</Button>
    );
}