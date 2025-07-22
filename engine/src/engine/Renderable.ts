import type { AsyncSimpleShader } from "./AsyncSimpleShader";
import * as sysGL from "./core/gl.ts";
import * as shaderResources from "./core/shaderResources.ts";

export class Renderable {
  mShader: AsyncSimpleShader;
  mColor: number[];
  constructor() {
    this.mShader = shaderResources.getConstColorShader()!;
    this.mColor = [1.0, 1.0, 1.0, 1.0];
  }

  setColor(color: number[]) {
    this.mColor = color;
  }

  getColor() {
    return this.mColor;
  }

  draw(trsMatrix: number[]) {
    const gl = sysGL.get()!;
    this.mShader.activate(this.mColor, trsMatrix);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
