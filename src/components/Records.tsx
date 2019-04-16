import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import RecordItem from "./RecordItem";
import Logo from "./Logo";

export default function Records() {
    return (
        <div className="records-container">
            <Container>
                <h2><Logo />, c'est actuellement...</h2>
                <Row>
                    <RecordItem value="21" text="Utilisateurs" />
                    <RecordItem value="12" text="Voitures à louer" />
                    <RecordItem value="145" text="Places de parking" />
                </Row>
            </Container>
        </div>
    );
}