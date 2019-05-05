export interface NavbarState {
    show_modal: boolean
}

export const defaultNavbarState: NavbarState = {
    show_modal: false
}

export const TOGGLE_SIGN_MODAL = "TOGGLE_SIGN_MODAL";
export interface ToggleSignModalAction {
    type: typeof TOGGLE_SIGN_MODAL
}

export type NavbarActionTypes = ToggleSignModalAction;