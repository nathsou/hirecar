import React, { Component } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { searchAirports, updateAirportSearchInput } from "../../redux/rentParkingTab/actions";
import { Airport } from "../../redux/rentParkingTab/types";
import { RentParkingTabProps } from "../Form/RentParkingTab";

export interface HcAirportSearchInputProps extends RentParkingTabProps {
    onAirportsReceived?: (parkings: Airport[]) => void,
    onInputChange?: (input: string) => void
}

class HcAirportSearchInput extends Component<HcAirportSearchInputProps> {

    public onInput = (input: string) => {
        this.props.onParkingSearchChange(input);
        this.props.searchAirports(input);

        if (this.props.onInputChange) {
            this.props.onInputChange(input);
        }
    }

    public onSelected = (selected: string[]) => {
        this.onInput(selected[0]);
    }

    public componentDidUpdate(prev_props: Readonly<HcAirportSearchInputProps>) {
        const { autocomplete_airports: airports, onAirportsReceived } = this.props;
        if (onAirportsReceived && prev_props.autocomplete_airports.length !== airports.length) {
            onAirportsReceived(airports);
        }
    }

    public render() {

        const { autocomplete_airports, parking_search_input_value: value } = this.props;

        return (
            <Typeahead
                id='airport'
                multiple={false}
                options={autocomplete_airports.map(({ name }) => name)}
                placeholder="Lieu de stationnement"
                onInputChange={this.onInput}
                onChange={this.onSelected}
                defaultInputValue={value !== '' ? value : undefined}
            />
        );
    }
}

export default connect(
    (state: HcState) => state.rent_tabs.rent_parking_spot_tab,
    {
        onParkingSearchChange: (value: string) => updateAirportSearchInput(value),
        searchAirports: (input: string) => searchAirports(input)
    }
)(HcAirportSearchInput);