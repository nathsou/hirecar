import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { CarSearchState } from "../redux/carSearch/types";
import { HcState } from "../redux/configureStore";
import CarPicto from "../res/img/car-picto.svg";
import HcListItem, { HcListItemProps } from "./HcListItem";

export interface HcCarListProps extends Pick<CarSearchState, 'car_rentals'> { }

class HcCarList extends Component<HcCarListProps> {

    public render() {

        const cars: HcListItemProps[] = this.props.car_rentals.map(rental => {
            const c = rental.parking_spot.car;
            const { start_date, end_date } = rental;
            return {
                title: c.model,
                features: `${c.fuel.type} - ${c.seats} places - ${c.doors} portes`,
                footer: `${c.price_per_day} € / jour - ${start_date} > ${end_date}`,
                id: c.id
            };
        });

        return (
            <main>
                <Container>
                    <div className='hc-list'>
                        {cars.map((car, i) =>
                            <HcListItem {...car} picto={CarPicto} key={`rent_car_${i}`} />
                        )}
                    </div>
                </Container>
            </main>
        );
    }
}

export default connect(
    (state: HcState) => state.car_search
)(HcCarList);

