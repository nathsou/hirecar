import { HcActions } from "./actions";
import { Action } from "redux";

export function reducer(state = {}, action: Action<HcActions.DUMMY_ACTION>) {
    return state;
}