import { SignUpTabState, defaultSignUpTabState } from "../signUpTab/types";
import { SignInTabState, defaultSignInTabState } from "../signInTab/types";

export interface SignTabsState {
    signin_tab: SignInTabState,
    signup_tab: SignUpTabState,
    active_tab_key: string
}

export const defaultSignTabsState: SignTabsState = {
    signin_tab: defaultSignInTabState,
    signup_tab: defaultSignUpTabState,
    active_tab_key: 'sign_in'
}

export const CHANGE_SIGN_TAB = "CHANGE_SIGN_TAB";
export interface ChangeSignTabAction {
    type: typeof CHANGE_SIGN_TAB,
    active_tab_key: string
}

export type SignTabsActionTypes = ChangeSignTabAction;