
// object props to x-www-form-urlencoded
export function propsToURIParams(props: {}): string {
    return '?' + Object.entries(props).map(([key, val]) => `${key}=${val}`).join('&');
}