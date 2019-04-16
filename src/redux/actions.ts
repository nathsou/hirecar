import { Action } from "redux";

export enum HcActions {
    DUMMY_ACTION
}

export function dummyAction(): Action<HcActions> {
    return {
        type: HcActions.DUMMY_ACTION
    };
}