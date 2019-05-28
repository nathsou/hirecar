export interface NavbarState {
    show_modal: boolean
}

export const defaultNavbarState: NavbarState = {
    show_modal: false
}

export const TOGGLE_MODAL = "TOGGLE_MODAL";
export interface ToggleModalAction {
    type: typeof TOGGLE_MODAL
}

export type NavbarActionTypes = ToggleModalAction;