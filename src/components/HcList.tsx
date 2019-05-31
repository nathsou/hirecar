import React, { Component } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import HcListItem, { HcListItemProps } from "./HcListItem";
import HcSecondaryButton from "./Button/HcSecondaryButton";
import HcCircleButton from "./Button/HcCircleButton";
library.add(faTimes);


export interface HcListProps {
    items: HcListItemProps[],
    className: string,
    picto: string,
    update: boolean,
    onUpdate?: (id: number) => void,
    onDelete: (id: number) => void
}

export default class HcList extends Component<HcListProps> {

    public render() {
        return (
            <div className='hc-user-profile-list'>
                {this.props.items.map((item, i) =>
                    (
                        <div key={`item_${i}`} className={this.props.className}>
                            <HcListItem {...item} picto={this.props.picto} />
                            {this.props.update ? (
                                <div className='hc-user-profile-list-btn'>
                                    <HcSecondaryButton handleClick={() => { this.props.onUpdate && this.props.onUpdate(item.id) }}>
                                        Modifier
                                    </HcSecondaryButton>
                                    <HcCircleButton onClick={() => this.props.onDelete(item.id)} icon="times" />
                                </div>
                            ) : (
                                    <HcSecondaryButton handleClick={() => { this.props.onDelete(item.id) }}>
                                        Annuler
                                    </HcSecondaryButton>
                                )}
                        </div>
                    )
                )}
            </div>
        );
    }
}

