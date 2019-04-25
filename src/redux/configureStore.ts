import { createStore, combineReducers } from 'redux';

import { RentParkingTabState } from '../components/Form/RentParkingTab';
import { rentParkingTabReducer } from './rentParkingTab/reducers';
import { rentCarTabReducer } from './rentCarTab/reducers';
import { RentCarTabState } from './rentCarTab/types';

export interface HcState {
    rent_parking_tab: RentParkingTabState,
    rent_car_tab: RentCarTabState
}

const root_reducer = combineReducers({
    rent_parking_tab: rentParkingTabReducer,
    rent_car_tab: rentCarTabReducer
});

export default function configureStore() {
    return createStore(
        root_reducer,
        {},
        ///@ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}