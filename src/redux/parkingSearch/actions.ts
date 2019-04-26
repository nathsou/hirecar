import { HcMapViewportProps } from "../../components/HcParkingSearch";
import { UpdateMapViewportAction, UPDATE_MAP_VIEWPORT } from "./types";

export function updateViewport(viewport: HcMapViewportProps): UpdateMapViewportAction {
    return {
        type: UPDATE_MAP_VIEWPORT,
        viewport
    };
}