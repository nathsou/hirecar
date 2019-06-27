import React, { Component } from "react";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { setCarSearchInput } from "../../redux/rentCarTab/actions";
import { RentCarTabState } from "../../redux/rentCarTab/types";
import HcCarSearchBox from "../CarSearch/HcCarSearchBox";
import HcSecondaryButton from "../Button/HcSecondaryButton";
import { Link } from "react-router-dom";
import { dayTimeToDate } from "../../Utils";

interface RentCarTabProps extends RentCarTabState {
    onCarSearchChange: typeof setCarSearchInput
}

export class RentCarTab extends Component<RentCarTabProps> {

    private formatParams(): string {
        const {
            car_search_input_value: input,
            start_day,
            start_time,
            end_day,
            end_time
        } = this.props;

        const start = dayTimeToDate(start_day, start_time);
        const end = dayTimeToDate(end_day, end_time);

        return `${input}${start !== '' ? `/${start}${end !== '' ? `/${end}` : ''}` : ''}`;
    }

    public render() {
        const { onCarSearchChange } = this.props;

        return (
            <HcCarSearchBox labels_type='parking_spots' show_labels={true} box_mode={true} onInputChange={onCarSearchChange}
            >
                <div style={{ textAlign: "right", marginTop: "15px" }}>
                    <Link to={`voiture/${this.formatParams()}`}>
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