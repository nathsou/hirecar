import React from 'react';
import Button from "react-bootstrap/Button";

export default function (props: any) {
  return (
    <Button
      ///@ts-ignore
      variant='hc-primary'
      onClick={() => props.handleClick ? props.handleClick() : {}}
      outlined={props.outlined}>
      {props.children}
    </Button>
  );
}