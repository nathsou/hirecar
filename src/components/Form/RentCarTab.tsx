import React, { Component } from "react";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { setCarSearchInput } from "../../redux/rentCarTab/actions";
import { RentCarTabState } from "../../redux/rentCarTab/types";
import HcCarSearchBox from "../CarSearch/HcCarSearchBox";
import HcSecondaryButton from "../Button/HcSecondaryButton";
import { Link } from "react-router-dom";

interface RentCarTabProps extends RentCarTabState {
    onCarSearchChange: typeof setCarSearchInput
}

export class RentCarTab extends Component<RentCarTabProps> {
    public render() {
        const { onCarSearchChange, car_search_input_value: input } = this.props;

        return (
            <HcCarSearchBox show_labels={true} box_mode={true} onInputChange={onCarSearchChange}>
                <div style={{ textAlign: "right", marginTop: "15px" }}>
                    <Link to={`voiture/${input}`}>
                        <HcSecondaryButton>Rechercher</HcSecondaryButton>
                    </Link>
                </div>
            </HcCarSearchBox>
        );
    }
}

export default connect(
    (state: HcState) => state.rent_tabs.rent_car_tab,
    {
        onCarSearchChange: (input: string) => setCarSearchInput(input)
    }
)(RentCarTab);