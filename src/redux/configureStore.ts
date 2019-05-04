import { combineReducers, createStore } from 'redux';
import { carSearchReducer } from './carSearch/reducers';
import { CarSearchState } from './carSearch/types';
import { parkingSearchReducer } from './parkingSearch/reducers';
import { ParkingSearchState } from './parkingSearch/types';
import { rentTabsReducer } from './rentTabs/reducers';
import { RentTabsState } from './rentTabs/types';
import { SignUpState } from './signUp/types';
import { signUpReducer } from './signUp/reducers';

export interface HcState {
    parking_search: ParkingSearchState,
    car_search: CarSearchState,
    rent_tabs: RentTabsState,
    sign_up: SignUpState
}

const root_reducer = combineReducers({
    parking_search: parkingSearchReducer,
    car_search: carSearchReducer,
    rent_tabs: rentTabsReducer,
    sign_up: signUpReducer,
});

export default function configureStore() {
    return createStore(
        root_reducer,
        {},
        ///@ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}