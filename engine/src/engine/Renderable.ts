import type { AsyncSimpleShader } from "./AsyncSimpleShader";
import * as sysGL from "./core/gl.ts";
import * as shaderResources from "./core/shaderResources.ts";
import { Transform } from "./Transform.ts";

export class Renderable {
  mShader: AsyncSimpleShader;
  mColor: number[];
  mTransform: Transform;
  constructor() {
    this.mShader = shaderResources.getConstColorShader()!;
    this.mColor = [1.0, 1.0, 1.0, 1.0];
    this.mTransform = new Transform();
  }

  setColor(color: number[]) {
    this.mColor = color;
  }

  getColor() {
    return this.mColor;
  }

  getTransform() {
    return this.mTransform;
  }

  draw(cameraMatrix: number[]) {
    const gl = sysGL.get()!;
    this.mShader.activate(this.mColor, this.mTransform.getTransformMatrix(), cameraMatrix);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
