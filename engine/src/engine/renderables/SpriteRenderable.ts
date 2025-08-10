import { TextureRenderable } from "./TextureRenderable";
import * as shaderResources from "../core/shaderResources";
import { Camera, texture } from "../entry";
import type { TextureInfo } from "../resources/texture";
import type { SpriteShader } from "../shaders/SpriteShader";
import type { TVector8 } from "../../matrix/VectorTypes";

export class SpriteRenderable extends TextureRenderable {
    mElementBottom: number;
    mElementTop: number;
    mElementRight: number;
    mElementLeft: number;
    constructor(texturePath: string) {
        super(texturePath);
        super._setShader(shaderResources.getSpriteShader());
        this.mElementLeft = 0.0;
        this.mElementRight = 1.0;
        this.mElementTop = 1.0;
        this.mElementBottom = 0.0;
    }

    setElementUVCoordinate(left: number, right: number, top: number, bottom: number) {
        this.mElementLeft = left;
        this.mElementRight = right;
        this.mElementTop = top;
        this.mElementBottom = bottom;
    }

    setElementPixelPositions(left: number, right: number, top: number, bottom: number) {

        const textureInfo = texture.get(this.mTexture) as TextureInfo;
        const imageWidth = textureInfo.mWidth;
        const imageHeight = textureInfo.mHeight;

        this.mElementLeft = left / imageWidth;
        this.mElementRight = right / imageWidth;
        this.mElementTop = top / imageHeight;
        this.mElementBottom = bottom / imageHeight;

    }

    getElementUVCoordinates(): TVector8 {
        return [this.mElementRight, this.mElementTop, this.mElementLeft, this.mElementTop, this.mElementRight, this.mElementBottom, this.mElementLeft, this.mElementBottom];
    }

    draw(camera: Camera) {
        (this.mShader as SpriteShader).setTextureCoordinate(this.getElementUVCoordinates());
        super.draw(camera);
    }

}


export const eTextureCoordinatesIndex = Object.freeze({
    eLeft: 2,
    eRight: 0,
    eTop: 1,
    eBottom: 5
})