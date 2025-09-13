import * as xml from "./xml";
import * as texture from "./texture";

const kDescriptionExt = ".fnt";
const kImageExt = ".png";

export class CharacterInfo {
  mTextCooordinateLeft: number;
  mTextCoordinateRight: number;
  mTextcoordinateBotom: number;
  mTextCoordinateTop: number;
  mCharWidth: number;
  mCharHeight: number;
  mCharWidthOffset: number;
  mCharHeightOffset: number;
  mCharAspectRatio: number;
  constructor() {
    this.mTextCooordinateLeft = 0;
    this.mTextCoordinateRight = 1;
    this.mTextcoordinateBotom = 0;
    this.mTextCoordinateTop = 0;

    this.mCharWidth = 1;
    this.mCharHeight = 1;
    this.mCharWidthOffset = 0;
    this.mCharHeightOffset = 0;

    this.mCharAspectRatio = 1;
  }
}

export function descriptionName(fontName: string) {
  return fontName + kDescriptionExt;
}

export function imageName(fontName: string) {
  return fontName + kImageExt;
}

export function load(fontName: string) {
  xml.load(descriptionName(fontName));
  texture.load(imageName(fontName));
}

export function unload(fontName: string) {
  xml.unload(descriptionName(fontName));
  texture.unload(imageName(fontName));
}

export function has(fontName: string) {
  return texture.has(imageName(fontName)) && xml.has(descriptionName(fontName));
}

export function getCharInfo(fontName: string, aChar: string) {
  const returnInfo = new CharacterInfo();

  return returnInfo;
}
