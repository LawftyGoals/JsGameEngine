import { has, get, unload, loadDecodeParse } from "../core/resourceMap";

const mParser = new DOMParser();

function decodeXML(data: Response) {
    return data.text();
}

function parseXML(text: string) {
    return mParser.parseFromString(text, "text/xml");
}

function load(path: string) {
    return loadDecodeParse(path, decodeXML, parseXML);
}

export { has, get, load, unload };