import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ReactMapGL, { ViewState } from 'react-map-gl';
import { connect } from "react-redux";
import { HcState } from "../redux/configureStore";
import { updateViewport } from "../redux/parkingSearch/actions";
import { ParkingSearchState } from "../redux/parkingSearch/types";
import HcParkingList from "./HcParkingList";

interface HcParkingSearchProps extends ParkingSearchState {
    onViewportChange: (viewstate: HcMapViewportProps) => void
}

export interface HcMapViewportProps extends ViewState {
    width: number | string,
    height: number | string
}

class HcParkingSearch extends Component<HcParkingSearchProps> {

    // private nabvarHeigth: number = 52;
    // private footerHeigth: number = 82;

    public render() {
        return (
            <main>
                <Row>
                    <Col lg={5}>
                        <HcParkingList />
                    </Col>
                    <Col lg={7}>
                        <div className="hc-maps">
                            <ReactMapGL
                                {...this.props.viewport}
                                onViewportChange={vp => this.props.onViewportChange(vp as HcMapViewportProps)}
                                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                                mapStyle='mapbox://styles/mapbox/streets-v11'
                            />
                        </div>
                    </Col>
                </Row>
            </main>
        );
    }
}

export default connect(
    (state: HcState) => state.parking_search,
    {
        onViewportChange: (viewport: HcMapViewportProps) => updateViewport(viewport)
    }
)(HcParkingSearch);