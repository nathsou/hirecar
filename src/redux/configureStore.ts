import throttle from "lodash.throttle";
import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { carSearchReducer } from './carSearch/reducers';
import { CarSearchState } from './carSearch/types';
import { loadState, saveState } from './localStorage';
import { navbarReducer } from './navbar/reducers';
import { NavbarState } from './navbar/types';
import { parkingSearchReducer } from './parkingSearch/reducers';
import { ParkingSearchState } from './parkingSearch/types';
import { rentTabsReducer } from './rentTabs/reducers';
import { RentTabsState } from './rentTabs/types';
import { signTabsReducer } from './signTabs/reducers';
import { SignTabsState } from './signTabs/types';
import { userReducer } from './user/reducers';
import { RESET_USER_LOGGED, UserState } from './user/types';
import { userProfileTabCarReducer } from './userProfile/userProfileTabCar/reducers';
import { UserProfileTabCarState } from './userProfile/userProfileTabCar/types';
import { userProfileTabInfoReducer } from './userProfile/userProfileTabInfo/reducers';
import { UserProfileTabInfoState } from './userProfile/userProfileTabInfo/types';

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

///@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export function configureStore() {
    return createStore(
        root_reducer,
        persistedState,
        composeEnhancers(
            applyMiddleware(thunkMiddleware),
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