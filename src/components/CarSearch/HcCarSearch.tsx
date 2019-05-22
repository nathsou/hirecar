import React, { Component } from "react";
import HcCarList from "../HcCarList";
import { withRouter, RouteComponentProps, match } from "react-router";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { CarSearchState } from "../../redux/carSearch/types";
import { fetchCars } from "../../redux/carSearch/actions";
import { updateCarSearchInput } from "../../redux/rentCarTab/actions";

interface HcCarSearchPropsMatchParams {
    airport: string
}

interface HcCarSearchProps extends RouteComponentProps, CarSearchState {
    fetchCars: (airport_name: string) => void,
    updateCarSearchInput: (input: string) => void,
    match: match<HcCarSearchPropsMatchParams>
}

class HcCarSearch extends Component<HcCarSearchProps> {

    constructor(props: HcCarSearchProps) {
        super(props);
        const airport = props.match.params.airport || '';
        this.props.fetchCars(airport);
        this.props.updateCarSearchInput(airport);
    }
    public render() {
        return (
            <HcCarList />
        );
    }
}

export default
    withRouter(
        connect(
            (state: HcState) => state.car_search,
            {
                fetchCars: (airport_name: string) => fetchCars({ airport_name }),
                updateCarSearchInput: (input: string) => updateCarSearchInput(input)
            }
        )(HcCarSearch)
    );