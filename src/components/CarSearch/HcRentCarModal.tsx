import React, { Component } from "react";
import { connect } from "react-redux";
import { CarRentalRequestData, sendRentCarRequest, setRentModalParkingSpot } from "../../redux/carSearch/actions";
import { CarSearchState } from "../../redux/carSearch/types";
import { HcState } from "../../redux/configureStore";
import { RentParkingTabState } from "../../redux/rentParkingTab/types";
import { UserState } from "../../redux/user/types";
import HcModal from "../HcModal";
import HcParkingSearchBox from "../ParkingSearch/HcParkingSearchBox";
import HcRentParkingBtn from "../ParkingSearch/HcRentParkingBtn";
import HcSignTabs from "../Sign/HcSignTabs";

export interface HcRentCarProps extends CarSearchState {
    setModalParkingSpot: (id: number | null) => void,
    user: UserState,
    form: RentParkingTabState,
    sendRentalRequest: (data: CarRentalRequestData) => void,
    onUpdate?: () => void
}

class HcRentCarModal extends Component<HcRentCarProps> {

    private sendRentalRequest() {
        const { start_day, start_time, end_day, end_time } = this.props.form;
        const user_id = this.props.user.data.id;
        const parking_spot_id = this.props.rent_modal_parking_spot_id as number;

        const data: CarRentalRequestData = {
            start_date: `${start_day} ${start_time}`,
            end_date: `${end_day} ${end_time}`,
            user_id,
            parking_spot_id
        };

        this.props.sendRentalRequest(data);
    }

    public render() {

        const spot = this.props.parking_spots.find(
            spot => spot.id === this.props.rent_modal_parking_spot_id
        );

        if (spot === undefined) {
            return null;
        }

        const {
            user,
            form,
            awaiting_rental_request_response,
            inserted_car_rental_id,
            onUpdate
        } = this.props;

        let total_cost = 0;

        const { start_day, start_time, end_day, end_time } = form;

        if (form.valid_form) {
            const days = (new Date(`${end_day} ${end_time}`).getTime() -
                new Date(`${start_day} ${start_time}`).getTime()) / (3600 * 24 * 1000);

            total_cost = (days * spot.car.price_per_day);
        }

        return <HcModal
            show={this.props.rent_modal_parking_spot_id !== null}
            handleClose={() => {
                if (onUpdate) onUpdate();
                this.props.setModalParkingSpot(null);
            }}
            title={`Location de ${spot.car.model} - ${spot.parking_lot.label}`}
            size={'lg'}
        >
            {awaiting_rental_request_response ?
                <p>Vérifications en cours..</p>
                : inserted_car_rental_id !== null ?
                    (<div>
                        <p>Votre location a bien été enregistrée !</p>
                    </div>)
                    :
                    (!user.logged_in ?
                        <HcSignTabs />
                        : (<div>
                            <HcParkingSearchBox
                                validate={true}
                                show_input={false}
                                show_labels={true}
                                box_mode={true}
                                min_day={start_day}
                                max_day={end_day}
                                // onStartDateChange={() => { if (onUpdate) onUpdate() }}
                                // onStartTimeChange={() => { if (onUpdate) onUpdate() }}
                                // onEndDateChange={() => { if (onUpdate) onUpdate() }}
                                // onEndTimeChange={() => { if (onUpdate) onUpdate() }}
                                labels_type='parking_spots'
                            />

                            <HcRentParkingBtn
                                cost={total_cost}
                                disabled={!form.valid_form}
                                onSuccess={(details) => {
                                    console.log(details);
                                    this.sendRentalRequest();
                                    console.log('paypal success');
                                }}
                            />
                        </div>)
                    )
            }
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
        setModalParkingSpot: (id: number | null) => setRentModalParkingSpot(id),
        sendRentalRequest: (data: CarRentalRequestData) => sendRentCarRequest(data)
    }
)(HcRentCarModal);