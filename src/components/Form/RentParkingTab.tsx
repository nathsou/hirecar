import React, { Component, Fragment } from "react";
import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { HcState } from "../../redux/configureStore";
import { searchAirports, updateParkingSearchInput } from "../../redux/rentParkingTab/actions";
import { RentParkingTabState } from "../../redux/rentParkingTab/types";
import HcSecondaryButton from "../HcSecondaryButton";
import HcFormGroup from "./HcFormGroup";
import { Typeahead } from 'react-bootstrap-typeahead';
import Col from "react-bootstrap/Col";


interface RentParkingTabProps extends RentParkingTabState {
    onParkingSearchChange: typeof updateParkingSearchInput,
    searchAirports: (input: string) => void
}

class RentParkingTab extends Component<RentParkingTabProps> {

    public onInput = (input: string) => {
        this.props.onParkingSearchChange(input);
        this.props.searchAirports(input);
    }

    public onSelected = (selected: string[]) => {
        this.onInput(selected[0]);
    }

    public render() {

        const { autocomplete_airports, parking_search_input_value } = this.props;

        return (
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="parkingLocation">
                        <Form.Label className="">Lieu de stationnement</Form.Label>
                        <Fragment>                    
                            <Typeahead
                                id='airport'
                                multiple={false}
                                options={autocomplete_airports}
                                placeholder="Lieu de stationnement"
                                onInputChange={this.onInput}
                                onChange={this.onSelected}
                            />
                        </Fragment>
                    </Form.Group>                
                </Form.Row>
                <Form.Row>
                    <HcFormGroup
                        size="4" controlId="parkingStartDate"
                        className="" label="Début de la location"
                        name="parkingStartDate" type="date" placeholder=""
                        value=""
                        onChange={() => { }} />
                    <HcFormGroup
                        size="2" controlId="parkingStartHour"
                        className="" label="Heure" type="time"
                        name="parkingStartHour" placeholder=""
                        value=""
                        onChange={() => { }} />
                    <HcFormGroup
                        size="4" controlId="parkingEndDate"
                        className="" label="Fin de la location" type="date"
                        name="parkingEndDate" placeholder=""
                        value=""
                        onChange={() => { }} />
                    <HcFormGroup
                        size="2" controlId="parkingEndHour"
                        className="" label="Heure" type="time"
                        name="parkingEndHour" placeholder=""
                        value=""
                        onChange={() => { }} />
                </Form.Row>
                <div style={{ textAlign: "right", marginTop: "15px" }}>
                    <Link to={`parking/${parking_search_input_value}`}>
                        <HcSecondaryButton>Rechercher</HcSecondaryButton>
                    </Link>
                </div>
            </Form>
        );
    }
}

export default connect(
    (state: HcState) => state.rent_tabs.rent_parking_spot_tab,
    {
        onParkingSearchChange: (value: string) => updateParkingSearchInput(value),
        searchAirports: (input: string) => searchAirports(input)
    }
)(RentParkingTab);