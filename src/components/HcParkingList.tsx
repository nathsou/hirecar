import React, { Component } from "react";
import HcListItem, { HcListItemProps } from "./HcListItem";
import Container from "react-bootstrap/Container";
import ParkingPicto from "../res/img/parking-picto.svg";
import { connect } from "react-redux";
import { HcState } from "../redux/configureStore";

export interface HcParkingListProps {
    parkings: HcListItemProps[]
}

class HcParkingList extends Component<HcParkingListProps> {

    public render() {

        const { parkings } = this.props;

        return (
            <div>
                <Container>
                    {
                        parkings.length !== 0 ?
                            (<div className='hc-list'>
                                {parkings.map(p =>
                                    <HcListItem {...p} picto={ParkingPicto} key={p.title} />
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