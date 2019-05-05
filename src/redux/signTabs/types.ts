import { SignUpState, defaultSignUpState } from "../signUp/types";

export interface SignTabsState {
    signup_tab: SignUpState,
    active_tab_key: string
}

export const defaultSignTabsState: SignTabsState = {
    signup_tab: defaultSignUpState,
    active_tab_key: 'sign_in'
}

export const CHANGE_SIGN_TAB = "CHANGE_SIGN_TAB";
export interface ChangeSignTabAction {
    type: typeof CHANGE_SIGN_TAB,
    active_tab_key: string
}

export type SignTabsActionTypes = ChangeSignTabAction;