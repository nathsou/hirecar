import React, { Component } from "react";

export default class HcListItem extends Component {

    public render() {
        return (
            <div className='hc-list-item'>
                <p className='hc-list-item-title'>Bâle-Mulhouse</p>
                <p className='hc-list-item-features'>Lavage • Navettes • Sous-terrain • Vidéo-surveillance</p>
                <p className='hc-rent-price'>42€ • 12€ / jour</p>
                <hr className='hc-list-item-separator' />
            </div>
        );
    }
}