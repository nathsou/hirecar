import React, { Component } from "react";
import HcPrimaryButton from "./Button/HcPrimaryButton";
import HcSecondaryButton from "./Button/HcSecondaryButton";

export interface HcDeleteModalContainerProps {
    title: string,
    question: string,
    onConfirm: () => void,
    onCancel: () => void
}


export default class HcDeleteModalContainer extends Component<HcDeleteModalContainerProps> {

    public render() {
        return (
            <div className="container-tabs delete">

                <h2 className="user-profile-title">{this.props.title}</h2>
                <p>{this.props.question}</p>

                <div style={{ textAlign: "right", marginTop: "25px" }}>
                    <HcSecondaryButton handleClick={this.props.onConfirm}>
                        Confirmer
                    </HcSecondaryButton>
                    <HcPrimaryButton handleClick={this.props.onCancel}>
                        Annuler
                    </HcPrimaryButton>
                </div>

            </div>
        );
    }
}