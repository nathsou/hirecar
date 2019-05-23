import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { HcState } from "../../redux/configureStore";
import { searchAirports, updateAirportSearchInput } from "../../redux/rentParkingTab/actions";
import { RentParkingTabState } from "../../redux/rentParkingTab/types";
import HcSecondaryButton from "../HcSecondaryButton";
import HcParkingSearchBox from "../ParkingSearch/HcParkingSearchBox";


export interface RentParkingTabProps extends RentParkingTabState {
    onParkingSearchChange: typeof updateAirportSearchInput,
    searchAirports: (input: string) => void
}

const RentParkingTab: FunctionComponent<RentParkingTabProps> = ({ parking_search_input_value }) => {

    return (
        <HcParkingSearchBox box_mode={true} show_labels={true}>
            <div style={{ textAlign: "right", marginTop: "15px" }}>
                <Link to={`parking/${parking_search_input_value}`}>
                    <HcSecondaryButton>Rechercher</HcSecondaryButton>
                </Link>
            </div>
        </HcParkingSearchBox>
    );
};

export default connect(
    (state: HcState) => state.rent_tabs.rent_parking_spot_tab,
    {
        onParkingSearchChange: (value: string) => updateAirportSearchInput(value),
        searchAirports: (input: string) => searchAirports(input)
    }
)(RentParkingTab);