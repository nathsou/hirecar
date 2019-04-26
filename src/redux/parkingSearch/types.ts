import { HcListItemProps } from "../../components/HcListItem";
import { HcMapViewportProps } from "../../components/HcParkingSearch";

export interface ParkingSearchState {
    parkings: HcListItemProps[],
    viewport: HcMapViewportProps
}

export const defaultParkingSearchState: ParkingSearchState = {
    parkings: [
        {
            title: 'Bâle-Mulhouse',
            features: ['Lavage', 'Navettes', 'Sous-terrain', 'Vidéo-surveillance'],
            footer: '42€ • 12€ / jour'
        },
        {
            title: 'Roissy-Charles-de-Gaulle',
            features: ['Lavage', 'Navettes', 'Sous - terrain', 'Vidéo - surveillance'],
            footer: '53€ • 15€ / jour'
        },
        {
            title: "Nice Côte d'Azur",
            features: ['Lavage', 'Navettes', 'Sous-terrain', 'Vidéo-surveillance'],
            footer: '35€ • 10€ / jour'
        }
    ],
    viewport: {
        width: 400,
        height: 400,
        latitude: 47.3,
        longitude: 2.2,
        zoom: 4.8
    }
};

export const UPDATE_MAP_VIEWPORT = "UPDATE_MAP_VIEWPORT";

export interface UpdateMapViewportAction {
    type: typeof UPDATE_MAP_VIEWPORT,
    viewport: HcMapViewportProps
}

export type ParkingSearchActionTypes = UpdateMapViewportAction;