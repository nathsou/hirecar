import React, { Component } from "react";

interface HcCircleButtonProps {
    value: string,
    onClick: (e: any) => void
}

export default class HcCircleButton extends Component<HcCircleButtonProps> {


    public render() {
        return (
            <span className="circle-button" onClick={this.props.onClick}>{this.props.value}</span>
        )
    }
}