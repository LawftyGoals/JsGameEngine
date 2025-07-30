import { Matrix4 } from "../matrix/Matrix4";
import type { TVector2, TVector4 } from "../matrix/VectorTypes";
import * as sysGL from "./core/sysGL";

export class Camera {
    mWCCenter: TVector2;
    mWCWidth: number;
    mViewport: TVector4;
    mCameraMatrix: Matrix4;
    mBGColor: TVector4;
    constructor(vWcCenter: TVector2, vWcWidth: number, viewportArray: TVector4) {
        this.mWCCenter = vWcCenter;
        this.mWCWidth = vWcWidth;
        this.mViewport = viewportArray;

        this.mCameraMatrix = new Matrix4();

        this.mBGColor = [0.8, 0.8, 0.8, 1];


    }

    getWCHeight() {
        return this.mViewport[eViewport.eHeight] / this.mViewport[eViewport.eWidth] * this.getWCWidth();
    }

    getWCWidth() {
        return this.mWCWidth;
    }

    setWCWidth(width: number) {
        this.mWCWidth = width;
    }

    getWCCenter() {
        return this.mWCCenter;
    }

    setWCCenter(xPosition: number, yPosition: number) {
        this.mWCCenter[0] = xPosition;
        this.mWCCenter[1] = yPosition;
    }

    getViewport() {
        return this.mViewport;
    }

    setViewport(viewportArray: TVector4) {
        this.mViewport = viewportArray;
    }

    getBackgroundColor() {
        this.mBGColor;
    }

    setBackgroundColor(newColor: TVector4) {
        this.mBGColor = newColor;
    }

    setViewAndCameraMatrix() {
        const gl = sysGL.get();
        gl.viewport(...this.mViewport);
        gl.scissor(...this.mViewport);

        gl.clearColor(...this.mBGColor);
        gl.enable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);

        const center = this.getWCCenter();

        this.mCameraMatrix.identiy().scale([2.0 / this.getWCWidth(), 2.0 / this.getWCHeight(), 1.0])
            .translate([-center[0], -center[1], 0]);
    }

    getCameraMatrix() {
        return this.mCameraMatrix.get();
    }

}

const eViewport = Object.freeze({
    eOrgX: 0,
    eOrgY: 1,
    eWidth: 2,
    eHeight: 3
});