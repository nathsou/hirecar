import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { carSearchReducer } from './carSearch/reducers';
import { CarSearchState } from './carSearch/types';
import { parkingSearchReducer } from './parkingSearch/reducers';
import { ParkingSearchState } from './parkingSearch/types';
import { rentTabsReducer } from './rentTabs/reducers';
import { RentTabsState } from './rentTabs/types';
import { SignTabsState } from './signTabs/types';
import { signTabsReducer } from './signTabs/reducers';
import { NavbarState } from './navbar/types';
import { navbarReducer } from './navbar/reducers';
import thunkMiddleware from 'redux-thunk'
import { UserState } from './user/types';
import { userReducer } from './user/reducers';

export interface HcState {
    user: UserState,
    navbar: NavbarState,
    parking_search: ParkingSearchState,
    car_search: CarSearchState,
    rent_tabs: RentTabsState,
    sign_tabs: SignTabsState
}

const root_reducer = combineReducers({
    user: userReducer,
    navbar: navbarReducer,
    parking_search: parkingSearchReducer,
    car_search: carSearchReducer,
    rent_tabs: rentTabsReducer,
    sign_tabs: signTabsReducer
});

export default function configureStore() {
    return createStore(
        root_reducer,
        compose(
            applyMiddleware(thunkMiddleware),
            ///@ts-ignore
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
}