
// object props to x-www-form-urlencoded
export function propsToURIParams(props: {}): string {
    return '?' + Object.entries(props).map(([key, val]) => `${key}=${val}`).join('&');
}

export function capitalize(str: string): string {
    return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}