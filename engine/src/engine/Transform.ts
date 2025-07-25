import { Matrix4 } from "../matrix/Matrix4";

export class Transform {
    mRotationInRadians: number;
    mScale: number[];
    mPosition: number[];
    constructor() {
        this.mPosition = [0, 0];
        this.mScale = [1, 1];
        this.mRotationInRadians = 0.0;
    }

    getPosition() {
        return this.mPosition;
    }

    setPosition(xPosition: number, yPosition: number) {
        this.setXPosition(xPosition);
        this.setYPosition(yPosition);

        return this;
    }

    getXPosition() {
        return this.mPosition[0];
    }

    setXPosition(xPosition: number) {
        this.mPosition[0] = xPosition;

        return this;
    }

    getYPosition() {
        return this.mPosition[1];
    }

    setYPosition(yPosition: number) {
        this.mPosition[1] = yPosition;

        return this;
    }

    getWidth() {
        return this.mScale[0];
    }

    setWidth(width: number) {
        this.mScale[0] = width;

        return this;
    }

    getHeight() {
        return this.mScale[1];
    }

    setHeight(height: number) {
        this.mScale[1] = height;

        return this;
    }

    getSize() {
        return this.mScale;
    }

    setSize(width: number, height: number) {
        this.setWidth(width);
        this.setHeight(height);

        return this;
    }

    getRotationInRadians() {
        return this.mRotationInRadians;
    }

    setRotationInRadians(rotationInRadians: number) {
        this.mRotationInRadians = rotationInRadians % (2 * Math.PI);

        return this;
    }

    getRotationInDegrees() {
        return this.mRotationInRadians * 180 / Math.PI;
    }

    setRotationInDegree(rotationInDegrees: number) {
        this.setRotationInRadians(rotationInDegrees * Math.PI / 180);

        return this;
    }

    getTransformMatrix() {
        const matrix4 = new Matrix4();

        return matrix4.translate([this.getXPosition(), this.getYPosition(), 0]).rotateZ(this.getRotationInRadians()).scale([this.getWidth(), this.getHeight(), 1]).get();
    }
}