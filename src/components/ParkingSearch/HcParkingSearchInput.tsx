import React, { Component } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { searchAirports, updateParkingSearchInput } from "../../redux/rentParkingTab/actions";
import { RentParkingTabProps } from "../Form/RentParkingTab";

class HcParkingSearchInput extends Component<RentParkingTabProps> {

    public onInput = (input: string) => {
        this.props.onParkingSearchChange(input);
        this.props.searchAirports(input);
    }

    public onSelected = (selected: string[]) => {
        this.onInput(selected[0]);
    }

    public render() {

        const { autocomplete_airports, parking_search_input_value: value } = this.props;

        return (
            <Typeahead
                id='airport'
                multiple={false}
                options={autocomplete_airports}
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
        onParkingSearchChange: (value: string) => updateParkingSearchInput(value),
        searchAirports: (input: string) => searchAirports(input)
    }
)(HcParkingSearchInput);