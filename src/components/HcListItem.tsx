import React, { Component } from "react";

export interface HcListItemProps {
    picto?: string,
    title: string,
    features: string,
    footer: string,
    id: number,
    onHover?: (id: number) => void
}

export default class HcListItem extends Component<HcListItemProps> {

    public render() {

        const { picto, title, features, footer, onHover, id } = this.props;

        return (
            <div className='hc-list-item'>
                <img src={picto} alt="Picto" width="50" height="50" />
                <div onMouseOver={() => onHover ? onHover(id) : {}}>
                    <h2 className='hc-list-item-title'>{title}</h2>
                    <p className='hc-list-item-features'>{features}</p>
                    <p className='hc-list-footer'>{footer}</p>
                    <hr />
                </div>
            </div>
        );
    }
}