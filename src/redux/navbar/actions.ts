import { ToggleSignModalAction, TOGGLE_SIGN_MODAL } from "./types";

export function toggleShowModal(): ToggleSignModalAction {
    return {
        type: TOGGLE_SIGN_MODAL
    };
}