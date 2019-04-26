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

        return (
            <div>
                <Container>
                    <div className='hc-list'>
                        {this.props.parkings.map(p =>
                            <HcListItem {...p} picto={ParkingPicto} key={p.title} />
                        )}
                    </div>
                </Container>
            </div>
        );
    }
}

export default connect(
    (state: HcState) => ({ parkings: state.parking_search.parkings })
)(HcParkingList);