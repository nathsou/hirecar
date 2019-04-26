import { HcListItemProps } from "../../components/HcListItem";

export interface CarSearchState {
    cars: HcListItemProps[],
}

export const defaultCarSearchState: CarSearchState = {
    cars: [
        {
            title: 'Fiat Punto Evo',
            features: ['Manuelle', 'SP95', 'Pneus-neige', '5 places', '3 portes'],
            footer: '42€ • 12€ / jour'
        },
        {
            title: 'Opel Astra',
            features: ['Manuelle', 'Diesel', '5 places', '5 portes'],
            footer: '53€ • 15€ / jour'
        },
        {
            title: "Tesla Model 3",
            features: ['Automatique', 'Electrique', '5 places', '5 portes'],
            footer: '35€ • 10€ / jour'
        },
    ]
};