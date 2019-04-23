import React, { Component } from "react";
import ReactMapGL from 'react-map-gl';
import HcList from "./HcParkingList";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class HcParkingSearch extends Component {

    private nabvarHeigth: number = 52;
    private footerHeigth: number = 82;

    public state = {
        viewport: {
            width: '100%',
            height: `calc(100vh - ${this.nabvarHeigth + this.footerHeigth}px)`,
            latitude: 47.3,
            longitude: 2.2,
            zoom: 4.8
        }
    };

    public render() {
        return (
            <main>
                <Container>
                    <Row>
                        <Col lg={5}>
                            <HcList />
                        </Col>
                        <Col lg={7}>
                            <div className="hc-maps">
                                <ReactMapGL
                                    {...this.state.viewport}
                                    onViewportChange={(viewport) => this.setState({ viewport })}
                                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                                    mapStyle='mapbox://styles/mapbox/streets-v11'
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        );
    }
}