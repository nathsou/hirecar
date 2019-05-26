import { defaultUserProfileTabCarState, UserProfileCarActionTypes, UserProfileTabCarState, TOGGLE_USER_PROFILE_CAR_FORM, UPDATE_USER_PROFILE_CAR_MODEL_INPUT, UPDATE_USER_PROFILE_CAR_PRICE_INPUT, SET_USER_PROFILE_CAR_FEATURES, UPDATE_USER_PROFILE_CAR_GEARBOX_SELECT, UPDATE_USER_PROFILE_CAR_FUEL_SELECT, UPDATE_USER_PROFILE_CAR_SEATS_SELECT, UPDATE_USER_PROFILE_CAR_DOORS_SELECT, SUMBIT_USER_PROFILE_CAR, USER_PROFILE_CAR_FORM_RECEIVED, USER_PROFILE_CAR_FORM_SENT, SET_USER_PROFILE_CAR_OWNER, RESET_USER_PROFILE_CAR_FORM, USER_PROFILE_CAR_SAVED, USER_PROFILE_CARS_SENT, SET_USER_PROFILE_CARS, USER_PROFILE_CARS_RECEIVED, UPDATE_USER_PROFILE_CAR } from "./types";

export function userProfileTabCarReducer(
    state = defaultUserProfileTabCarState,
    action: UserProfileCarActionTypes
): UserProfileTabCarState {

    let isValid = true;

    switch (action.type) {
        case TOGGLE_USER_PROFILE_CAR_FORM:
            return {
                ...state,
                show_form: !state.show_form,
                editing: false
            };
        case UPDATE_USER_PROFILE_CAR_MODEL_INPUT:
            isValid = action.value.length >= 5;
            return {
                ...state,
                form_data: { ...state.form_data, model: action.value },
                form_errors: { ...state.form_errors, model_error: isValid ? '' : 'Le nom du modèle doit contenir au moins 5 caractères' }
            };
        case UPDATE_USER_PROFILE_CAR_PRICE_INPUT:
            isValid = /^\d+([,|.]\d{1,2})?$/.test(action.value);
            return {
                ...state,
                form_data: { ...state.form_data, price_per_day: action.value },
                form_errors: { ...state.form_errors, price_error: isValid ? '' : 'Veuillez entrer un prix valide' }
            };
        case UPDATE_USER_PROFILE_CAR_GEARBOX_SELECT:
            return {
                ...state,
                form_data: {
                    ...state.form_data,
                    gearbox: {
                        ...state.form_data.gearbox,
                        id: parseInt(action.value)
                    }
                },
            };
        case UPDATE_USER_PROFILE_CAR_FUEL_SELECT:
            return {
                ...state,
                form_data: {
                    ...state.form_data,
                    fuel: {
                        ...state.form_data.fuel,
                        id: parseInt(action.value)
                    }
                },
            };
        case UPDATE_USER_PROFILE_CAR_SEATS_SELECT:
            return {
                ...state,
                form_data: { ...state.form_data, seats: action.value },
            };
        case UPDATE_USER_PROFILE_CAR_DOORS_SELECT:
            return {
                ...state,
                form_data: { ...state.form_data, doors: action.value },
            };
        case SET_USER_PROFILE_CAR_OWNER:
            return {
                ...state,
                form_data: { ...state.form_data, owner_id: action.id }
            }
        case SET_USER_PROFILE_CAR_FEATURES:
            const { fuel, gearbox } = action.data;
            return {
                ...state,
                car_features: { fuel, gearbox }
            }
        case SUMBIT_USER_PROFILE_CAR:
            const { model, price_per_day } = state.form_data;
            isValid = (Object
                .keys(state.form_errors)
                .every(key => state.form_errors[key] === '')) &&
                ([
                    model,
                    price_per_day
                ].every(field => field !== ''));
            return {
                ...state,
                valid_form: isValid ? true : false,
                form_errors: {
                    ...state.form_errors,
                    model_error:
                        (model === '' ? 'Le nom du modéle n\'est pas indiqué' : '') ||
                        (model.length >= 5 ? '' : 'Le nom du modèle doit contenir au moins 5 caractères'),
                    price_error:
                        (price_per_day === '' ? 'Le prix n\'est pas indiqué' : '') ||
                        (/^\d+([,|.]\d{1,2})?$/.test(price_per_day) ? '' : 'Veuillez entrer un prix valide'),
                },
                submit_form: true
            };
        case USER_PROFILE_CAR_FORM_SENT:
            return {
                ...state,
                sending: true
            };
        case USER_PROFILE_CAR_FORM_RECEIVED:
            return {
                ...state,
                sending: false,
                saving: true
            };
        case USER_PROFILE_CAR_SAVED:
            return {
                ...state,
                saving: false
            };
        case RESET_USER_PROFILE_CAR_FORM:
            const { form_data, form_errors, show_form, valid_form, sending, saving, submit_form } = defaultUserProfileTabCarState
            return {
                ...state,
                form_data,
                form_errors,
                show_form,
                valid_form,
                sending,
                saving,
                submit_form
            }
        case USER_PROFILE_CARS_SENT:
            return {
                ...state,
                cars_data: { ...state.cars_data, fetching: true }
            }
        case SET_USER_PROFILE_CARS:
            const { cars } = action.data
            return {
                ...state,
                cars_data: { ...state.cars_data, cars }
            }
        case USER_PROFILE_CARS_RECEIVED:
            return {
                ...state,
                cars_data: { ...state.cars_data, fetching: false }
            }
        case UPDATE_USER_PROFILE_CAR:
            const selected_car = state.cars_data.cars.filter(car => car.id === action.id)[0];

            const { id: selectedId, model: selectedModel, price_per_day: selectedPrice, gearbox: selectedGearbox, fuel: selectedFuel, seats: selectedSeats, doors: selectedDoors } = selected_car;
            return {
                ...state,
                form_data: {
                    ...state.form_data,
                    id: selectedId.toString(),
                    model: selectedModel,
                    price_per_day: (selectedPrice as number).toString(),
                    gearbox: {
                        id: selectedGearbox.id,
                        type: selectedGearbox.type
                    },
                    fuel: {
                        id: selectedFuel.id,
                        type: selectedFuel.type
                    },
                    seats: selectedSeats.toString(),
                    doors: selectedDoors.toString()
                },
                editing: true,
                show_form: true
            }
        default:
            return state;
    }

}