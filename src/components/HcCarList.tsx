import React, { Component } from "react";
import HcListItem, { HcListItemProps } from "./HcListItem";
import Container from "react-bootstrap/Container";
import CarPicto from "../res/img/car-picto.svg";

export default class HcCarList extends Component {

    private cars: HcListItemProps[] = [
        {
            title: 'Fiat Punto Evo',
            picto: CarPicto,
            features: ['Manuelle', 'SP95', 'Pneus-neige', '5 places', '3 portes'],
            footer: '42€ • 12€ / jour'
        },
        {
            title: 'Opel Astra',
            picto: CarPicto,
            features: ['Manuelle', 'Diesel', '5 places', '5 portes'],
            footer: '53€ • 15€ / jour'
        },
        {
            title: "Tesla Model 3",
            picto: CarPicto,
            features: ['Automatique', 'Electrique', '5 places', '5 portes'],
            footer: '35€ • 10€ / jour'
        },
    ];

    public render() {

        return (
            <main>
                <Container>
                    <div className='hc-list'>
                        {this.cars.map(p => <HcListItem {...p} />)}
                    </div>
                </Container>
            </main>
        );
    }
}