import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FlyToInterpolator, InteractiveMapProps } from 'react-map-gl';
import { connect } from "react-redux";
import { match, RouteComponentProps, withRouter } from "react-router";
import WebMercatorViewport, { WebMercatorViewportOptions } from "viewport-mercator-project";
import { HcState } from "../../redux/configureStore";
import { fetchParkings, updateViewport, setSelectedParkingLot, fetchAirports } from "../../redux/parkingSearch/actions";
import { ParkingLot, ParkingSearchState } from "../../redux/parkingSearch/types";
import { setAirportSearchInput } from "../../redux/rentParkingTab/actions";
import HcParkingList from "../HcParkingList";
import HcMap from "./HcMap";
import HcParkingSearchBox from "./HcParkingSearchBox";

interface HcParkingSearchPropsMatchParams {
    airport: string
}

interface HcParkingSearchProps extends RouteComponentProps, ParkingSearchState {
    onViewportChange: (viewstate: HcMapViewportProps) => void,
    fetchParkings: (airport_name: string) => void,
    fetchAirports: (name: string) => void,
    onParkingSearchChange: (value: string) => void,
    setSelectedParkingLot: (pl: number | null) => void,
    match: match<HcParkingSearchPropsMatchParams>
}

export interface HcMapViewportProps extends InteractiveMapProps { };

class HcParkingSearch extends Component<HcParkingSearchProps> {

    private show_map = false;

    constructor(props: HcParkingSearchProps) {
        super(props);
        const airport = props.match.params.airport || '';
        this.props.fetchParkings(airport);
        this.props.fetchAirports(airport);
        this.props.onParkingSearchChange(airport);
        this.show_map = airport.trim() !== '';
    }

    private flyTo = (latitude: number, longitude: number, zoom: number, duration: number) => {
        this.props.onViewportChange({
            ...this.props.viewport,
            latitude,
            longitude,
            zoom: zoom - 1,
            transitionInterpolator: new FlyToInterpolator(),
            transitionDuration: duration
        });
    }

    public flyToParkingLots = (parking_lots: ParkingLot[]) => {
        const { viewport } = this.props;

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

        this.flyTo(latitude, longitude, zoom - 1, 2500);
    }

    public flyToSelectedParkingLot = () => {
        const { parking_lots, selected_parking_lot } = this.props;
        const selected = parking_lots.find(p => p.id === selected_parking_lot);
        if (selected !== undefined) {
            const { lat, lng } = selected;
            this.flyTo(lat, lng, 17, 1000);
        }
    }

    public componentDidUpdate(prev_props: Readonly<HcParkingSearchProps>) {

        if (!this.show_map) return;

        const { parking_lots, selected_parking_lot } = this.props;

        if (
            selected_parking_lot !== null && selected_parking_lot !== prev_props.selected_parking_lot) {
            this.flyToSelectedParkingLot();
        } else if (
            (parking_lots.length !== 0) && (
                (prev_props.parking_lots.length !== parking_lots.length) ||
                (parking_lots.some((p, i) => p.id !== prev_props.parking_lots[i].id))
            )
        ) {
            this.flyToParkingLots(parking_lots);
        }
    }

    private onInputChange = (input: string) => {
        if (input !== undefined) {
            this.props.fetchParkings(input);
            this.show_map = input.trim() !== '';
            this.props.history.push(`/parking/${input}`);
        }
    }

    public render() {

        const {
            fetching_parking_lots,
            viewport,
            onViewportChange,
            parking_lots,
            setSelectedParkingLot,
            airports
        } = this.props;

        return (
            <main className="search-page">
                <HcParkingSearchBox
                    show_labels={true}
                    box_mode={false}
                    onInputChange={this.onInputChange}
                />

                {this.show_map ?
                    (<Row>
                        <Col lg={5} className="search-list">
                            <Col lg={{ span: 10, offset: 1 }} className="search-list-container">
                                {(fetching_parking_lots && parking_lots.length === 0) ?
                                    <p>Recherche des parkings en cours...</p> :
                                    <HcParkingList />}
                            </Col>
                        </Col>
                        <Col lg={7} className="search-map">
                            <HcMap
                                viewport={viewport}
                                onViewportChange={onViewportChange}
                                parking_lots={parking_lots}
                                airports={airports}
                                onParkingLotMarkerClick={setSelectedParkingLot}
                                onAirportMarkerClick={() => { }}
                            />
                        </Col>
                    </Row>)
                    : null}
            </main >
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
                fetchAirports: (name: string) => fetchAirports({ name }),
                onParkingSearchChange: (value: string) => setAirportSearchInput(value),
                setSelectedParkingLot: (pl: number | null) => setSelectedParkingLot(pl)
            }
        )(HcParkingSearch)
    );