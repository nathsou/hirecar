import { NavbarActionTypes, defaultNavbarState, NavbarState, TOGGLE_SIGN_MODAL } from "./types";

export function navbarReducer(
    state = defaultNavbarState,
    action: NavbarActionTypes
): NavbarState {
    switch (action.type) {
        case TOGGLE_SIGN_MODAL:
            return {
                ...state,
                show_modal: !state.show_modal
            };

        default:
            return state;
    }
}