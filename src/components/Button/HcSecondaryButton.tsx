import React, { FunctionComponent } from 'react';
import Button, { ButtonProps } from "react-bootstrap/Button";

export interface HcButtonProps extends Pick<ButtonProps, 'type' | 'disabled'> {
    handleClick?: () => void
}

const HcSecondaryButton: FunctionComponent<HcButtonProps> = ({
    type,
    handleClick,
    children,
    disabled
}) => {
    return (
        <Button
            ///@ts-ignore
            variant='hc-secondary'
            type={type}
            disabled={disabled}
            onClick={() => handleClick ? handleClick() : {}}>
            {children}
        </Button>
    );
}

export default HcSecondaryButton;