import { defaultSignTabsState, SignTabsActionTypes, SignTabsState } from "./types";
import { signUpTabReducer } from "../signUpTab/reducers";
import { signInTabReducer } from "../SignInTab/reducers";

export function signTabsReducer(
    state = defaultSignTabsState,
    action: SignTabsActionTypes | any
): SignTabsState {
    return {
        signin_tab: signInTabReducer(state.signin_tab, action),
        signup_tab: signUpTabReducer(state.signup_tab, action),
        active_tab_key: action.type === 'CHANGE_SIGN_TAB' ? action.active_tab_key : state.active_tab_key
    }
}