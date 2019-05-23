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
import { updateAirportSearchInput } from "../../redux/rentParkingTab/actions";

interface HcParkingSearchPropsMatchParams {
    airport: string
}

interface HcParkingSearchProps extends RouteComponentProps, ParkingSearchState {
    onViewportChange: (viewstate: HcMapViewportProps) => void,
    fetchParkings: (airport_name: string) => void,
    onParkingSearchChange: (value: string) => void,
    match: match<HcParkingSearchPropsMatchParams>
}

export interface HcMapViewportProps extends InteractiveMapProps { };

class HcParkingSearch extends Component<HcParkingSearchProps> {

    constructor(props: HcParkingSearchProps) {
        super(props);
        const airport = props.match.params.airport || '';
        this.props.fetchParkings(airport);
        this.props.onParkingSearchChange(airport);
    }

    public componentDidUpdate(prev_props: Readonly<HcParkingSearchProps>) {

        const { parking_lots } = this.props;

        if (
            (parking_lots.length !== 0) && (
                (prev_props.parking_lots.length !== parking_lots.length) ||
                (parking_lots.some((p, i) => p.id !== prev_props.parking_lots[i].id))
            )
        ) {

            const { viewport, onViewportChange } = this.props;

            let min_lng = Infinity, min_lat = Infinity;
            let max_lng = -Infinity, max_lat = -Infinity;

            parking_lots.forEach(({ lat, lng }) => {
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
                zoom: zoom - 1,
                transitionInterpolator: new FlyToInterpolator(),
                transitionDuration: 2500
            });

        }
    }

    public render() {

        const { fetching, viewport, onViewportChange, parking_lots, fetchParkings } = this.props;

        return (
            <main>
                <HcParkingSearchBox
                    show_labels={!fetching && parking_lots.length === 0}
                    box_mode={false}
                    onInputChange={fetchParkings}
                />
                <Row>
                    <Col lg={5}>
                        {(fetching && parking_lots.length === 0) ?
                            <p>Recherche des parkings en cours...</p> :
                            <HcParkingList />}
                    </Col>
                    <Col lg={7}>
                        <HcMap
                            viewport={viewport}
                            onViewportChange={onViewportChange}
                            parking_lots={parking_lots}
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
                fetchParkings: (airport_name: string) => fetchParkings({ airport_name }),
                onParkingSearchChange: (value: string) => updateAirportSearchInput(value)
            }
        )(HcParkingSearch)
    );