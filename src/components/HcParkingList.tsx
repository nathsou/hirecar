import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { HcState } from "../redux/configureStore";
import { ParkingSearchState } from "../redux/parkingSearch/types";
import ParkingPicto from "../res/img/parking-picto.svg";
import HcListItem from "./HcListItem";

export type HcParkingListProps = Pick<ParkingSearchState, 'parkings'>;

class HcParkingList extends Component<HcParkingListProps> {

    public render() {

        const { parkings } = this.props;

        const items = parkings.map(p => ({
            title: p.label,
            features: `${p.nb_places} places`,
            footer: `${p.price_per_day} € / jour`
        }));

        return (
            <div>
                <Container>
                    {
                        parkings.length !== 0 ?
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
    (state: HcState) => ({ parkings: state.parking_search.parkings })
)(HcParkingList);