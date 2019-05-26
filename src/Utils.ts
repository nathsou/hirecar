import { Car, IdentifiedType, ParkingSpot, CarRental } from "./redux/carSearch/types";
import { ParkingLot } from "./redux/parkingSearch/types";
import { Airport } from "./redux/rentParkingTab/types";

// object props to x-www-form-urlencoded
export function propsToURIParams(props: {}): string {
    return '?' + Object.entries(props)
        .filter(([_, val]) => val !== undefined && val !== null)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');
}

export function capitalize(str: string): string {
    return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}

export function emptyLocalStorage() {
    localStorage.setItem('state', '');
}

export function dayTimeToDate(day: string | null, time: string | null, separator = '-'): string | null {
    return day !== null && day.trim() !== '' ?
        `${day.trim()}${(time !== null && time.trim() !== '' ? `${separator}${time.trim()}` : '')}` : null;
}

export type RawAirport = { [K in keyof Airport]: string };

export function parseAirport(airport: RawAirport): Airport {

    const { id, name, lat, lng } = airport;

    return {
        id: parseInt(id),
        name,
        lat: parseFloat(lat),
        lng: parseFloat(lng)
    };
}

export type RawParkingLot = { [K in keyof ParkingLot]: K extends 'airport' ? RawAirport : string };

export function parseParkingLot(parking_lot: RawParkingLot): ParkingLot {

    const { id, label, lat, lng, capacity, price_per_day, airport } = parking_lot;

    return {
        id: parseInt(id),
        label,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        capacity: parseInt(capacity),
        price_per_day: parseFloat(price_per_day),
        airport: parseAirport(airport)
    };
}

export type RawIdentifiedType = { [K in keyof IdentifiedType]: string };

export function parseIdentifiedType(raw: RawIdentifiedType): IdentifiedType {
    return {
        id: parseInt(raw.id),
        type: raw.type
    };
}

export type RawCar = { [K in keyof Car]: K extends 'fuel' | 'gearbox' ? RawIdentifiedType : string };

export function parseCar(car: RawCar): Car {
    const { id, model, seats, doors, owner_id, price_per_day, gearbox, fuel } = car;

    return {
        id: parseInt(id),
        model,
        seats: parseInt(seats),
        doors: parseInt(doors),
        owner_id: parseInt(owner_id),
        price_per_day: price_per_day !== undefined ? parseFloat(price_per_day) : undefined,
        gearbox: parseIdentifiedType(gearbox),
        fuel: parseIdentifiedType(fuel)
    };
}

export type RawParkingSpot = {
    [K in keyof ParkingSpot]: (
        K extends 'car' ? RawCar :
        (K extends 'parking_lot' ? RawParkingLot : string)
    )
};


export function parseParkingSpot(spot: RawParkingSpot): ParkingSpot {
    const { id, start_date, end_date, car, parking_lot } = spot;

    return {
        id: parseInt(id),
        start_date,
        end_date,
        car: parseCar(car),
        parking_lot: parseParkingLot(parking_lot)
    };
}

/*
   id: number;
    start_date: string;
    end_date: string;
    user_id: number;
    parking_spot: ParkingSpot;
*/

export type RawCarRental = { [K in keyof CarRental]: K extends 'parking_spot' ? RawParkingSpot : string };

export function parseCarRental(rental: RawCarRental): CarRental {
    const { id, start_date, end_date, user_id, parking_spot } = rental;

    return {
        id: parseInt(id),
        start_date,
        end_date,
        user_id: parseInt(user_id),
        parking_spot: parseParkingSpot(parking_spot)
    };
}