import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { CarSearchState } from "../redux/carSearch/types";
import { HcState } from "../redux/configureStore";
import CarPicto from "../res/img/car-picto.svg";
import HcListItem, { HcListItemProps } from "./HcListItem";
import { setRentModalParkingSpot } from "../redux/carSearch/actions";

export interface HcCarListProps extends Pick<CarSearchState, 'parking_spots'> {
    setRentModalParkingSpot: (id: number | null) => void
}

class HcCarList extends Component<HcCarListProps> {

    public render() {

        const { setRentModalParkingSpot } = this.props;

        const spots_by_parking = new Map<string, HcListItemProps[]>();

        this.props.parking_spots.forEach(spot => {
            const key = spot.parking_lot.airport.name;
            const spots = spots_by_parking.get(key);

            const car = spot.car;
            const { start_date, end_date } = spot;

            const item = {
                title: `${car.model} - ${spot.parking_lot.label}`,
                features: `${car.fuel.type} - ${car.seats} places - ${car.doors} portes`,
                footer: `${car.price_per_day} € / jour - ${start_date.slice(0, 16)} > ${end_date.slice(0, 16)}`,
                id: spot.id
            };

            if (spots !== undefined) {
                spots.push(item);
            } else {
                spots_by_parking.set(key, [item]);
            }
        });

        let id = 0;

        return (
            <main>
                <Container>
                    <div className='hc-list'>
                        {[...spots_by_parking.entries()].map(([label, spots]) =>
                            (
                                <div key={label}>
                                    <h4>{label}</h4>
                                    {spots.map(spot =>
                                        <HcListItem
                                            show_rent_btn={true}
                                            {...spot} picto={CarPicto}
                                            key={`rent_car_${id++}`}
                                            onRentButtonClick={() => setRentModalParkingSpot(spot.id)}
                                        />
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </Container>
            </main>
        );
    }
}

export default connect(
    (state: HcState) => ({ parking_spots: state.car_search.parking_spots }),
    {
        setRentModalParkingSpot: (id: number | null) => setRentModalParkingSpot(id)
    }
)(HcCarList);

