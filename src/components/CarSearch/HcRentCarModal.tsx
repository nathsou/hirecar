import React, { Component } from "react";
import { connect } from "react-redux";
import { setRentModalParkingSpot } from "../../redux/carSearch/actions";
import { CarSearchState } from "../../redux/carSearch/types";
import { HcState } from "../../redux/configureStore";
import { RentParkingTabState } from "../../redux/rentParkingTab/types";
import { UserState } from "../../redux/user/types";
import { UserProfileCarsState } from "../../redux/userProfile/userProfileCarTab/types";
import HcModal from "../HcModal";
import HcParkingSearchBox from "../ParkingSearch/HcParkingSearchBox";
import HcRentParkingBtn from "../ParkingSearch/HcRentParkingBtn";
import HcSignTabs from "../Sign/HcSignTabs";

export interface HcRentCarProps extends CarSearchState {
    setModalParkingSpot: (id: number | null) => void,
    user: UserState,
    form: RentParkingTabState,
}

class HcRentCarModal extends Component<HcRentCarProps> {

    public render() {

        const spot = this.props.parking_spots.find(
            spot => spot.id === this.props.rent_modal_parking_spot_id
        );

        console.log(this.props.parking_spots, spot, this.props.rent_modal_parking_spot_id);

        if (spot === undefined) {
            return null;
        }

        const {
            user,
            form
        } = this.props;

        let total_cost = 0;

        if (form.valid_form) {
            const { start_day, start_time, end_day, end_time } = form;
            const days = (new Date(`${end_day} ${end_time}`).getTime() -
                new Date(`${start_day} ${start_time}`).getTime()) / (3600 * 24 * 1000);

            total_cost = (days * spot.car.price_per_day);
        }


        return <HcModal
            show={this.props.rent_modal_parking_spot_id !== null}
            handleClose={() => this.props.setModalParkingSpot(null)}
            title={`Location de ${spot.car.model} - ${spot.parking_lot.label}`}
            size={'lg'}
        >
            {(!user.logged_in ?
                <HcSignTabs />
                : (<div>
                    <HcParkingSearchBox
                        validate={true}
                        show_input={false}
                        show_labels={true}
                        box_mode={true}
                        labels_type='parking_spots'
                    />

                    {/* <HcSecondaryButton
                                    disabled={!form.valid_form}
                                    handleClick={this.sendRentalRequest}
                                >
                                    Réserver {total_cost !== null ? `pour ${total_cost} €` : ''}
                                </HcSecondaryButton> */}

                    <HcRentParkingBtn
                        cost={total_cost}
                        disabled={!form.valid_form}
                        onSuccess={(details) => {
                            console.log(details);
                            // this.sendRentalRequest();
                            console.log('paypal success');
                        }}
                    />
                </div>)
            )}
        </HcModal>
    }
}

export default connect(
    (state: HcState) => ({
        ...state.car_search,
        user: state.user,
        form: state.rent_tabs.rent_parking_spot_tab,
    }),
    {
        setModalParkingSpot: (id: number | null) => setRentModalParkingSpot(id)
    }
)(HcRentCarModal);