import { ToggleSignModalAction, TOGGLE_SIGN_MODAL } from "./types";

export function toggleShowModal(show: boolean): ToggleSignModalAction {
    return {
        type: TOGGLE_SIGN_MODAL,
        show
    };
}