import React, { Component } from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HcNavPills from "./HcNavPills";

export default class HcJumbotron extends Component {

    public render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <Row>
                        <Col lg={5}>
                            <h2 className="jumbotron-text">
                                Louez un parking d'aéroport, laissez votre véhicule et faites en profiter
                                quelqu'un pendant votre absence.
                            </h2>
                        </Col>
                        <Col lg={7}>
                            <HcNavPills />
                        </Col>
                    </Row>
                </Container>
            </Jumbotron >
        );
    }
}