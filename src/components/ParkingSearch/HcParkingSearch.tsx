import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FlyToInterpolator, InteractiveMapProps } from 'react-map-gl';
import { connect } from "react-redux";
import { match, RouteComponentProps, withRouter } from "react-router";
import WebMercatorViewport, { WebMercatorViewportOptions } from "viewport-mercator-project";
import { HcState } from "../../redux/configureStore";
import { fetchParkings, updateViewport } from "../../redux/parkingSearch/actions";
import { ParkingSearchState } from "../../redux/parkingSearch/types";
import HcParkingList from "../HcParkingList";
import HcMap from "./HcMap";
import HcParkingSearchBox from "./HcParkingSearchBox";

interface HcParkingSearchPropsMatchParams {
    airport: string
}

interface HcParkingSearchProps extends RouteComponentProps, ParkingSearchState {
    onViewportChange: (viewstate: HcMapViewportProps) => void,
    fetchParkings: (input: string) => void,
    match: match<HcParkingSearchPropsMatchParams>
}

export interface HcMapViewportProps extends InteractiveMapProps { };

class HcParkingSearch extends Component<HcParkingSearchProps> {

    private zoomed = false;

    constructor(props: HcParkingSearchProps) {
        super(props);
        this.props.fetchParkings(props.match.params.airport);
    }

    public componentDidUpdate() {
        const { parkings, viewport, onViewportChange, fetching } = this.props;

        if (this.zoomed || fetching || parkings.length === 0) return;

        let min_lng = Infinity, min_lat = Infinity;
        let max_lng = -Infinity, max_lat = -Infinity;

        parkings.forEach(({ lat, lng }) => {
            if (lat < min_lat) min_lat = lat;
            if (lat > max_lat) max_lat = lat;
            if (lng < min_lng) min_lng = lng;
            if (lng > max_lng) max_lng = lng;
        });

        const vp = new WebMercatorViewport(viewport as WebMercatorViewportOptions);
        const { longitude, latitude, zoom } = vp.fitBounds(
            [[min_lng, min_lat], [max_lng, max_lat]]
        );

        onViewportChange({
            ...viewport,
            latitude,
            longitude,
            zoom,
            transitionInterpolator: new FlyToInterpolator(),
            transitionDuration: 3000
        });

        this.zoomed = true;
    }

    public render() {

        const { fetching, viewport, onViewportChange, parkings } = this.props;

        return (
            <main>
                <HcParkingSearchBox
                    show_labels={!fetching && parkings.length === 0}
                    multiple_rows={false}
                />
                <Row>
                    <Col lg={5}>
                        {fetching ?
                            <p>Recherche des parkings en cours...</p> :
                            <HcParkingList />}
                    </Col>
                    <Col lg={7}>
                        <HcMap
                            viewport={viewport}
                            onViewportChange={onViewportChange}
                            parkings={parkings}
                        />
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