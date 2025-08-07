import type { SimpleShader } from "../shaders/SimpleShader.ts";
import * as sysGL from "../core/sysGL.ts";
import * as shaderResources from "../core/shaderResources.ts";
import { Transform } from "../Transform.ts";
import type { TVector4 } from "../../matrix/VectorTypes.ts";
import type { Camera } from "../Camera.ts";
import type { TextureShader } from "../shaders/TextureShader.ts";

export class Renderable {
  mShader: SimpleShader;
  mColor: TVector4;
  mTransform: Transform;
  constructor() {
    this.mShader = shaderResources.getConstColorShader()!;
    this.mColor = [1.0, 1.0, 1.0, 1.0];
    this.mTransform = new Transform();
  }

  setColor(color: TVector4) {
    this.mColor = color;
  }

  getColor() {
    return this.mColor;
  }

  getTransform() {
    return this.mTransform;
  }

  draw(camera: Camera) {
    const gl = sysGL.get();

    this.mShader.activate(
      this.mColor,
      this.mTransform.getTransformMatrix(),
      camera.getCameraMatrix()
    );
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  _setShader(shader: SimpleShader) {
    this.mShader = shader;
  }
}
