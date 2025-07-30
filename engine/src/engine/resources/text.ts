"use strict";

import { get, has, loadDecodeParse, unload } from "../core/resourceMap";

const decodeText = (data: Response) => data.text();
const parseText = (text: string) => text;

export function load(path: string) {
    return loadDecodeParse(path, decodeText, parseText);
}

export { get, has, unload };