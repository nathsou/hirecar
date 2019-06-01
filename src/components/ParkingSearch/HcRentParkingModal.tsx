import React, { Component } from "react";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { setRentModalParkingLot, setRentParkingSpotUserCarIdx, sendRentParkingSpotRequest, ParkingSpotRentalRequestData } from "../../redux/parkingSearch/actions";
import { ParkingLot, ParkingSearchState } from "../../redux/parkingSearch/types";
import { UserState } from "../../redux/user/types";
import HcSecondaryButton from "../Button/HcSecondaryButton";
import HcModal from "../HcModal";
import HcSignTabs from "../Sign/HcSignTabs";
import HcParkingSearchBox from "./HcParkingSearchBox";
import HcSelectFormGroup from "../Form/HcSelectFormGroup";
import { checkRentParkingSpotForm } from "../../redux/rentParkingTab/actions";
import { RentParkingTabState } from "../../redux/rentParkingTab/types";
import { UserProfileCarsState } from "../../redux/userProfile/userProfileCarTab/types";
import { fetchUserProfileCarRentals } from "../../redux/userProfile/userProfileCarRentalTab/actions";

export interface HcRentParkingModalProps extends ParkingSearchState {
    setModalParkingLot: (id: number | null) => void,
    fetchUserProfileCars: (id: number) => void,
    checkForm: () => void,
    setCarIdx: (idx: number) => void,
    sendRentParkingSpotRequest: (data: ParkingSpotRentalRequestData) => void,
    user_cars: UserProfileCarsState,
    user: UserState,
    form: RentParkingTabState
}

class HcRentParkingModal extends Component<HcRentParkingModalProps> {

    private cars_fetched = false;

    constructor(props: HcRentParkingModalProps) {
        super(props);
        this.fetchCars();
    }

    private fetchCars = () => {
        if (!this.cars_fetched && this.props.user.logged_in) {
            this.props.fetchUserProfileCars(this.props.user.data.id);
            this.cars_fetched = true;
        }
    }

    public componentDidUpdate(prev_props: Readonly<HcRentParkingModalProps>): void {
        if (
            prev_props.rent_modal_parking_lot_id === null &&
            this.props.rent_modal_parking_lot_id !== null
        ) {
            this.props.checkForm();
        }

        if (
            !this.cars_fetched &&
            this.props.user.logged_in &&
            prev_props.user.data.id !== this.props.user.data.id
        ) {
            this.fetchCars();
        }
    }

    public sendRentalRequest = () => {

        const { start_day, start_time, end_day, end_time } = this.props.form;

        const data: ParkingSpotRentalRequestData = {
            parking_lot_id: this.props.rent_modal_parking_lot_id as number,
            car_id: this.props.user_cars.cars[this.props.selected_user_car_idx].id,
            start_date: `${start_day} ${start_time}`,
            end_date: `${end_day} ${end_time}`
        };

        this.props.sendRentParkingSpotRequest(data);
    }

    public render() {

        const {
            rent_modal_parking_lot_id,
            setModalParkingLot,
            parking_lots,
            user,
            user_cars,
            form,
            selected_user_car_idx,
            setCarIdx,
            awaiting_rental_request_response,
            parking_spot_rental_id
        } = this.props;

        if (rent_modal_parking_lot_id === null) {
            return null;
        }

        const parking_lot = parking_lots.find(p => p.id === rent_modal_parking_lot_id) as ParkingLot;
        let total_cost = null;

        if (form.valid_form) {
            const { start_day, start_time, end_day, end_time } = form;
            const days = (new Date(`${end_day} ${end_time}`).getTime() -
                new Date(`${start_day} ${start_time}`).getTime()) / (3600 * 24 * 1000);

            total_cost = (days * parking_lot.price_per_day).toFixed(2);
        }

        return (
            <HcModal
                show={true}
                size={'lg'}
                handleClose={() => setModalParkingLot(null)}
                title={user.logged_in ? `Location de ${parking_lot.label}` : ''}
            >

                {awaiting_rental_request_response ?
                    <p>Spinner</p>
                    : parking_spot_rental_id !== null ?
                        <p>Votre location a été enregistrée</p>
                        : (!user.logged_in ?
                            <HcSignTabs />
                            : (<div>
                                <HcParkingSearchBox
                                    validate={true}
                                    show_input={false}
                                    show_labels={true}
                                    box_mode={true}
                                />

                                {user_cars.fetching ?
                                    <p>Chargement de vos voitures en cours...</p>
                                    : (<HcSelectFormGroup
                                        value={selected_user_car_idx.toString()}
                                        options={user_cars.cars.map(c => ({ id: c.id, text: c.model }))}
                                        controlId='userCars'
                                        label='Véhicule à laisser'
                                        onChange={setCarIdx}
                                    />)
                                }

                                <HcSecondaryButton
                                    disabled={!form.valid_form}
                                    handleClick={this.sendRentalRequest}
                                >
                                    Réserver {total_cost !== null ? `pour ${total_cost} €` : ''}
                                </HcSecondaryButton>
                            </div>)
                        )
                }

            </HcModal>
        );
    }

}

export default connect(
    (state: HcState) => ({
        ...state.parking_search,
        user_cars: state.user_profile_tabs.user_profile_tab_car.cars_data,
        user: state.user,
        form: state.rent_tabs.rent_parking_spot_tab
    }),
    {
        setModalParkingLot: (id: number | null) => setRentModalParkingLot(id),
        fetchUserProfileCars: (id: number) => fetchUserProfileCarRentals(id),
        checkForm: () => checkRentParkingSpotForm(),
        setCarIdx: (idx: number) => setRentParkingSpotUserCarIdx(idx),
        sendRentParkingSpotRequest: (data: ParkingSpotRentalRequestData) => sendRentParkingSpotRequest(data)
    }
)(HcRentParkingModal);