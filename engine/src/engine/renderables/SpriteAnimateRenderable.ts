import { SpriteRenderable, texture } from "../entry";
import * as shaderResources from "../core/shaderResources";


export class SpriteAnimateRenderable extends SpriteRenderable {
    mElementWidth: number;
    mElementHeight: number;
    mWidthPadding: number;
    mNumberOfElements: number;
    mUpdateInterval: number;
    mAnimationType: number;
    mCurrentAnimateAdvance: number;
    mCurrentElement: number;
    mCurrentTick: number;
    mFirstElementLeft: number;
    constructor(texturePath: string) {
        super(texturePath);
        super._setShader(shaderResources.getSpriteShader());

        this.mFirstElementLeft = 0.0;
        this.mElementTop = 1.0;
        this.mElementWidth = 1.0;
        this.mElementHeight = 1.0;
        this.mWidthPadding = 0.0;
        this.mNumberOfElements = 1;

        this.mUpdateInterval = 1;
        this.mAnimationType = eAnimationType.eRight;
        this.mCurrentTick = 0;

        this.mCurrentAnimateAdvance = -1;
        this.mCurrentElement = 0;
        this._initAnimation();
    }

    private _initAnimation() {
        switch (this.mAnimationType) {
            case eAnimationType.eRight:
                this.mCurrentElement = 0;
                this.mCurrentAnimateAdvance = 1;
                break;
            case eAnimationType.eSwing:
                this.mCurrentAnimateAdvance = -1 * this.mCurrentAnimateAdvance;
                this.mCurrentElement += 2 * this.mCurrentAnimateAdvance;
                break;
            case eAnimationType.eLeft:
                this.mCurrentElement = this.mNumberOfElements - 1;
                this.mCurrentAnimateAdvance = -1;
                break;
        }

        this._setSpriteElement();
    }

    _setSpriteElement() {
        const left = this.mFirstElementLeft + (this.mCurrentElement * (this.mElementWidth + this.mWidthPadding));
        super.setElementUVCoordinate(left, left + this.mElementWidth, this.mElementTop - this.mElementHeight, this.mElementTop);
    }

    setAnimationType(animationType: typeof eAnimationType[TAnimationKeys]) {
        this.mAnimationType = animationType;
        this.mCurrentAnimateAdvance = -1;
        this.mCurrentElement = 0;
        this._initAnimation();
    }

    setSpriteSequence(topPixel: number, leftPixel: number, elementWidthInPixel: number, elementHeightInPixel: number, numberOfElements: number, widthPaddingInPixel: number) {
        const textureInfo = texture.get(this.mTexture);


        const imageWidth = textureInfo.mWidth;
        const imageHeight = textureInfo.mHeight;
        console.log({ textureInfo, imageHeight, topPixel });

        this.mNumberOfElements = numberOfElements;
        this.mFirstElementLeft = leftPixel / imageWidth;
        this.mElementTop = topPixel / imageHeight;
        this.mElementWidth = elementWidthInPixel / imageWidth;
        this.mElementHeight = elementHeightInPixel / imageHeight;
        this.mWidthPadding = widthPaddingInPixel / imageWidth;

        this._initAnimation();
    }

    setAnimationSpeed(tickInterval: number) {
        this.mUpdateInterval = tickInterval;
    }

    changeAnimationSpeed(deltaInterval: number) {
        this.mUpdateInterval += deltaInterval;
        if (this.mUpdateInterval < 0) this.mUpdateInterval = 0;

    }

    updateAnimation() {
        this.mCurrentTick++;
        if (this.mCurrentTick >= this.mUpdateInterval) {
            this.mCurrentTick = 0;
            this.mCurrentElement += this.mCurrentAnimateAdvance;
            if ((this.mCurrentElement >= 0) && (this.mCurrentElement < this.mNumberOfElements)) {
                this._setSpriteElement();
            } else {
                this._initAnimation();
            }
        }
    }
}

type TAnimationEnum = { eRight: number, eLeft: number, eSwing: number };

export const eAnimationType: TAnimationEnum = Object.freeze({
    eRight: 0, eLeft: 1, eSwing: 2
} as const);

type TAnimationKeys = keyof typeof eAnimationType

