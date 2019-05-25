import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface HcCircleButtonProps {
    icon: IconProp,
    onClick: (e: any) => void
}

export default class HcCircleButton extends Component<HcCircleButtonProps> {


    public render() {
        return (
            <span className="circle-button" onClick={this.props.onClick}>
                <FontAwesomeIcon icon={this.props.icon} />
            </span>
        )
    }
}