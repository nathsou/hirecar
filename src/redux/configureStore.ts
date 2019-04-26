import { combineReducers, createStore } from 'redux';
import { rentTabsReducer } from './rentTabs/reducers';
import { RentTabsState } from './rentTabs/types';


export interface HcState {
    rent_tabs: RentTabsState
    // rent_parking_tab: RentParkingTabState,
    // rent_car_tab: RentCarTabState
}

const root_reducer = combineReducers({
    rent_tabs: rentTabsReducer
});

export default function configureStore() {
    return createStore(
        root_reducer,
        {},
        ///@ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}