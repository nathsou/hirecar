import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import HcListItem, { HcListItemProps } from "./HcListItem";
import { connect } from "react-redux";
import { HcState } from "../redux/configureStore";
import CarPicto from "../res/img/car-picto.svg";

export interface HcCarListProps {
    cars: HcListItemProps[]
}

class HcCarList extends Component<HcCarListProps> {

    public render() {

        return (
            <main>
                <Container>
                    <div className='hc-list'>
                        {this.props.cars.map(car => <HcListItem {...car} picto={CarPicto} />)}
                    </div>
                </Container>
            </main>
        );
    }
}

export default connect(
    (state: HcState) => state.car_search
)(HcCarList);

