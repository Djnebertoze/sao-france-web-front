import { store } from './store';
import React from "react";

export const getAPIUrl = () => {
    let url;

    url = process.env.NEXT_PUBLIC_API_URL;

    return url;
};

export function occurrences(string: string, subString: string, allowOverlapping: boolean) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

export const transformDescription = (description: string) => {
    let occurrences_count = occurrences(description, '\\n', false)

    let array = []
    let desc_copy = description

    if (occurrences_count > 0) {
        for (let i = 0; i <= occurrences_count; i++) {
            if (desc_copy != undefined) {
                array.push(desc_copy.split('\\n')[i])
            }
        }
    } else {
        array.push(description)
    }

    return (
        <>
            {array.map((text) => (
                    <>{text}<br/></>
                ))}
        </>
    )
}