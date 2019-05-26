import { combineReducers, createStore, applyMiddleware, compose, Action } from 'redux';
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
import { UserState, RESET_USER_LOGGED } from './user/types';
import { userReducer } from './user/reducers';
import { loadState, saveState } from './localStorage';
import throttle from "lodash.throttle";
import { UserProfileTabInfoState } from './userProfile/userProfileTabInfo/types';
import { userProfileTabInfoReducer } from './userProfile/userProfileTabInfo/reducers';
import { UserProfileTabCarState } from './userProfile/userProfileTabCar/types';
import { userProfileTabCarReducer } from './userProfile/userProfileTabCar/reducers';

export interface HcState {
    user: UserState,
    navbar: NavbarState,
    parking_search: ParkingSearchState,
    car_search: CarSearchState,
    rent_tabs: RentTabsState,
    sign_tabs: SignTabsState,
    user_profile_tab_info: UserProfileTabInfoState,
    user_profile_tab_car: UserProfileTabCarState
}

const reducers = combineReducers({
    user: userReducer,
    navbar: navbarReducer,
    parking_search: parkingSearchReducer,
    car_search: carSearchReducer,
    rent_tabs: rentTabsReducer,
    sign_tabs: signTabsReducer,
    user_profile_tab_info: userProfileTabInfoReducer,
    user_profile_tab_car: userProfileTabCarReducer
});

const root_reducer = (state: HcState | undefined, action: Action) => {
    if (action.type === RESET_USER_LOGGED) {
        return reducers(undefined, action);
    }

    return reducers(state, action);
};

const persistedState = loadState();

export function configureStore() {
    return createStore(
        root_reducer,
        persistedState,
        compose(
            applyMiddleware(thunkMiddleware),
            ///@ts-ignore
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        ),
    );
}

export const store = configureStore();

store.subscribe(throttle(() => {
    saveState({
        user: store.getState().user,
        user_profile_tab_info: store.getState().user_profile_tab_info,
        user_profile_tab_car: store.getState().user_profile_tab_car
    });
}, 1000));