import { SpriteRenderable } from "../entry";
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
}



export const eAnimationType = Object.freeze({
    eRight: 0, eLeft: 1, eSwing: 2
})

