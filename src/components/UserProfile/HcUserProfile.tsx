import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import HcUserProfileTabs from "./HcUserProfileTabs";
import Col from "react-bootstrap/Col";
import Footer from '../../components/Footer';

export default class HcUserProfile extends Component {
    public render() {
        return (
            <main className="bg-img">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <HcUserProfileTabs />
                        </Col>
                    </Row>

                </Container>
                <Footer />
            </main>
        )
    }
}