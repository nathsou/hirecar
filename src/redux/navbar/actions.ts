import { TOGGLE_MODAL, ToggleModalAction } from "./types";

export function toggleShowModal(): ToggleModalAction {
    return {
        type: TOGGLE_MODAL
    };
}