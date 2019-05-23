import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { HcState } from "../redux/configureStore";
import { ParkingSearchState } from "../redux/parkingSearch/types";
import ParkingPicto from "../res/img/parking-picto.svg";
import HcListItem from "./HcListItem";

export type HcParkingListProps = Pick<ParkingSearchState, 'parking_lots'>;

class HcParkingList extends Component<HcParkingListProps> {

    public render() {

        const { parking_lots } = this.props;

        const items = parking_lots.map(p => ({
            title: p.label,
            features: `${p.capacity} places`,
            footer: `${p.price_per_day} € / jour`
        }));

        return (
            <div>
                <Container>
                    {
                        parking_lots.length !== 0 ?
                            (<div className='hc-list'>
                                {items.map(item =>
                                    <HcListItem {...item} picto={ParkingPicto} key={item.title} />
                                )}
                            </div>)
                            : (<p>No parking lots found</p>)
                    }
                </Container>
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({ parking_lots: state.parking_search.parking_lots })
)(HcParkingList);