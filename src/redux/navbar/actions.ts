import { TOGGLE_SIGN_MODAL, ToggleSignModalAction } from "./types";

export function toggleShowModal(show: boolean): ToggleSignModalAction {
    return {
        type: TOGGLE_SIGN_MODAL,
        show
    };
}