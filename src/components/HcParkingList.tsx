import React, { Component } from "react";
import HcListItem, { HcListItemProps } from "./HcListItem";
import Container from "react-bootstrap/Container";
import ParkingPicto from "../res/img/parking-picto.svg";

export default class HcParkingList extends Component {

    private parkings: HcListItemProps[] = [
        {
            title: 'Bâle-Mulhouse',
            picto: ParkingPicto,
            features: ['Lavage', 'Navettes', 'Sous-terrain', 'Vidéo-surveillance'],
            footer: '42€ • 12€ / jour'
        },
        {
            title: 'Roissy-Charles-de-Gaulle',
            picto: ParkingPicto,
            features: ['Lavage', 'Navettes', 'Sous - terrain', 'Vidéo - surveillance'],
            footer: '53€ • 15€ / jour'
        },
        {
            title: "Nice Côte d'Azur",
            picto: ParkingPicto,
            features: ['Lavage', 'Navettes', 'Sous-terrain', 'Vidéo-surveillance'],
            footer: '35€ • 10€ / jour'
        },
    ];

    public render() {

        return (
            <div>
                <Container>
                    <div className='hc-list'>
                        {this.parkings.map(p => <HcListItem {...p} />)}
                    </div>
                </Container>
            </div>
        );
    }
}