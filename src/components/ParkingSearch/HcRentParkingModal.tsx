import { google } from "googleapis";
import React, { Component } from "react";
import { connect } from "react-redux";
import { HcState } from "../../redux/configureStore";
import { ParkingSpotRentalRequestData, sendRentParkingSpotRequest, setRentModalParkingLot, setRentParkingSpotUserCarId } from "../../redux/parkingSearch/actions";
import { ParkingLot, ParkingSearchState } from "../../redux/parkingSearch/types";
import { checkRentParkingSpotForm } from "../../redux/rentParkingTab/actions";
import { RentParkingTabState } from "../../redux/rentParkingTab/types";
import { UserState } from "../../redux/user/types";
import { fetchUserProfileCarRentals } from "../../redux/userProfile/userProfileCarRentalTab/actions";
import { UserProfileCarsState } from "../../redux/userProfile/userProfileCarTab/types";
import HcSecondaryButton from "../Button/HcSecondaryButton";
import HcSelectFormGroup from "../Form/HcSelectFormGroup";
import HcModal from "../HcModal";
import HcSignTabs from "../Sign/HcSignTabs";
import HcParkingSearchBox from "./HcParkingSearchBox";
import HcRentParkingBtn from "./HcRentParkingBtn";

export interface HcRentParkingModalProps extends ParkingSearchState {
    setModalParkingLot: (id: number | null) => void,
    fetchUserProfileCars: (id: number) => void,
    checkForm: () => void,
    setCarId: (id: number) => void,
    sendRentParkingSpotRequest: (data: ParkingSpotRentalRequestData) => void,
    user_cars: UserProfileCarsState,
    user: UserState,
    form: RentParkingTabState,
    email: string
}

class HcRentParkingModal extends Component<HcRentParkingModalProps> {

    private cars_fetched = false;

    constructor(props: HcRentParkingModalProps) {
        super(props);
        this.fetchCars();
    }

    private fetchCars = () => {
        console.log('cars fetched: ' + this.cars_fetched);
        if (!this.cars_fetched && this.props.user.logged_in) {
            this.props.fetchUserProfileCars(this.props.user.data.id);
            if (this.props.user_cars.cars.length !== 0) {
                this.props.setCarId(this.props.user_cars.cars[0].id);
            }
            this.cars_fetched = true;
        }
    }

    public componentDidMount = () => {
        this.insertEvent();
    }

    public insertEvent() {

        const oauth_client_id = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
        const oauth_secret_id = process.env.REACT_APP_GOOGLE_OAUTH_SECRET_ID;
        const redirect_uri = `${process.env.REACT_APP_HIRECAR_API_URI}/parking`;

        const oauth2Client = new google.auth.OAuth2(
            oauth_client_id,
            oauth_secret_id,
            redirect_uri
        );

        const scopes = ['https://www.googleapis.com/auth/calendar.events'];

        const uri = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        });

        console.log(uri);
        const first_part_code = window.location.search.split('code=') ? window.location.search.split('code=').pop() : '';
        const code = first_part_code ? first_part_code.split('&')[0] : '';

        if (code) {
            oauth2Client.getToken(code).then(({ tokens }) => {
                console.log(tokens);
                oauth2Client.setCredentials(tokens);

            });
        }

        oauth2Client.on('tokens', (tokens) => {
            if (tokens.refresh_token) {
                // store the refresh_token in my database!
                console.log(tokens.refresh_token);
            }
            console.log(tokens.access_token);
        });

        oauth2Client.setCredentials({
            refresh_token: `STORED_REFRESH_TOKEN`
        });

        var event = {
            'summary': 'Google I/O 2015',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'A chance to hear more about Google\'s developer products.',
            'start': {
                'dateTime': '2019-06-11T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': '2019-06-13T17:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            }
        };

        function insertEvent(auth: any) {
            var calendar = google.calendar('v3');
            calendar.events.insert({
                auth: auth,
                calendarId: 'primary',
                requestBody: event
            }, function (err: any) {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    return;
                }
            });
        }
        insertEvent(oauth2Client);

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
        const { firstname, lastname } = this.props.user.data;

        const data: ParkingSpotRentalRequestData = {
            parking_lot_id: this.props.rent_modal_parking_lot_id as number,
            car_id: this.props.selected_user_car_id,
            start_date: `${start_day} ${start_time}`,
            end_date: `${end_day} ${end_time}`,
            email: this.props.email,
            firstname,
            lastname
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
            selected_user_car_id,
            setCarId,
            awaiting_rental_request_response,
            parking_spot_rental_id
        } = this.props;

        if (rent_modal_parking_lot_id === null) {
            return null;
        }

        const parking_lot = parking_lots.find(p => p.id === rent_modal_parking_lot_id) as ParkingLot;
        let total_cost = 0;

        if (form.valid_form) {
            const { start_day, start_time, end_day, end_time } = form;
            const days = (new Date(`${end_day} ${end_time}`).getTime() -
                new Date(`${start_day} ${start_time}`).getTime()) / (3600 * 24 * 1000);

            total_cost = (days * parking_lot.price_per_day);
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
                        (<div>
                            <p>Votre location a été enregistrée</p>
                            <HcSecondaryButton handleClick={() => { }}>
                                Ajouter la réservation dans Google Calendar
                            </HcSecondaryButton>
                        </div>)
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
                                        value={selected_user_car_id.toString()}
                                        options={user_cars.cars.map(c => ({ id: c.id, text: c.model }))}
                                        controlId='userCars'
                                        label='Véhicule à laisser'
                                        onChange={setCarId}
                                    />)
                                }

                                {/* <HcSecondaryButton
                                    disabled={!form.valid_form}
                                    handleClick={this.sendRentalRequest}
                                >
                                    Réserver {total_cost !== null ? `pour ${total_cost} €` : ''}
                                </HcSecondaryButton> */}

                                <HcRentParkingBtn
                                    cost={total_cost}
                                    disabled={!form.valid_form}
                                    onSuccess={details => {
                                        this.sendRentalRequest();
                                        this.props.setModalParkingLot(null);
                                        console.log(details);
                                    }}
                                />
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
        form: state.rent_tabs.rent_parking_spot_tab,
        email: state.user_profile_tabs.user_profile_tab_info.form_data.email
    }),
    {
        setModalParkingLot: (id: number | null) => setRentModalParkingLot(id),
        fetchUserProfileCars: (id: number) => fetchUserProfileCarRentals(id),
        checkForm: () => checkRentParkingSpotForm(),
        setCarId: (idx: number) => setRentParkingSpotUserCarId(idx),
        sendRentParkingSpotRequest: (data: ParkingSpotRentalRequestData) => sendRentParkingSpotRequest(data)
    }
)(HcRentParkingModal);