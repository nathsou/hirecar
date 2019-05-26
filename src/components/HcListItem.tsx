import React, { Component } from "react";

export interface HcListItemProps {
    picto?: string,
    title: string,
    features: string,
    footer: string,
    id: number,
    onMouseEnter?: (id: number | null) => void,
    onMouseLeave?: (id: number | null) => void,
}

export default class HcListItem extends Component<HcListItemProps> {

    public render() {

        const { picto, title, features, footer, onMouseEnter, onMouseLeave, id } = this.props;

        return (
            <div className='hc-list-item'>
                <img src={picto} alt="Picto" width="50" height="50" />
                <div
                    onMouseEnter={() => onMouseEnter ? onMouseEnter(id) : {}}
                    onMouseLeave={() => onMouseLeave ? onMouseLeave(id) : {}}
                >
                    <h2 className='hc-list-item-title'>{title}</h2>
                    <p className='hc-list-item-features'>{features}</p>
                    <p className='hc-list-footer'>{footer}</p>
                    <hr />
                </div>
            </div>
        );
    }
}