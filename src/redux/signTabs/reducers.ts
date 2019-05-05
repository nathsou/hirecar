import { defaultSignTabsState, SignTabsActionTypes, SignTabsState } from "./types";
import { signUpReducer } from "../signUp/reducers";

export function signTabsReducer(
    state = defaultSignTabsState,
    action: SignTabsActionTypes | any
): SignTabsState {
    return {
        signup_tab: signUpReducer(state.signup_tab, action),
        active_tab_key: action.type === 'CHANGE_SIGN_TAB' ? action.active_tab_key : state.active_tab_key
    }
}