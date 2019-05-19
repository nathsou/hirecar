import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ReactMapGL, { ViewState } from 'react-map-gl';
import { connect } from "react-redux";
import { HcState } from "../redux/configureStore";
import { updateViewport, fetchParkings } from "../redux/parkingSearch/actions";
import { ParkingSearchState } from "../redux/parkingSearch/types";
import HcParkingList from "./HcParkingList";
import { RouteComponentProps, withRouter, match } from "react-router";

interface HcParkingSearchPropsMatchParams {
    airport: string
}

interface HcParkingSearchProps extends RouteComponentProps, ParkingSearchState {
    onViewportChange: (viewstate: HcMapViewportProps) => void,
    fetchParkings: (input: string) => void,
    match: match<HcParkingSearchPropsMatchParams>
}

export interface HcMapViewportProps extends ViewState {
    width: number | string,
    height: number | string
}

class HcParkingSearch extends Component<HcParkingSearchProps> {

    constructor(props: HcParkingSearchProps) {
        super(props);
        this.props.fetchParkings(props.match.params.airport);
    }

    public render() {

        const { fetching } = this.props;

        return (
            <main>
                <Row>
                    <Col lg={5}>
                        {
                            fetching ?
                                <p>Recherche des parkings en cours...</p> :
                                <HcParkingList />
                        }
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

export default
    withRouter(
        connect(
            (state: HcState) => state.parking_search,
            {
                onViewportChange: (viewport: HcMapViewportProps) => updateViewport(viewport),
                fetchParkings: (input: string) => fetchParkings({ airport_name: input })
            }
        )(HcParkingSearch)
    );