import React, { Component } from "react";
import ParkingPicto from "../res/img/parking-picto.svg";

export default class HcListItem extends Component {

    public render() {
        return (
            <div className='hc-list-item'>
                <img src={ParkingPicto} alt="Picto Parking" width="50" height="50" />
                <div>
                    <h2 className='hc-list-item-title'>Bâle-Mulhouse</h2>
                    <p className='hc-list-item-features'>Lavage • Navettes • Sous-terrain • Vidéo-surveillance</p>
                    <p className='hc-rent-price'>42€ • 12€ / jour</p>
                    <hr />
                </div>
            </div>
        );
    }
}