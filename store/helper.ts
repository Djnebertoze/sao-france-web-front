import { store } from './store';

export const getAPIUrl = () => {
    let url;

    url = process.env.NEXT_PUBLIC_API_URL;

    return url;
};