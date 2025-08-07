import { SimpleShader } from "./SimpleShader";
import * as sysGL from "../core/sysGL";
import * as vertexBuffer from "../core/vertexBuffer";
import type { TMatrix4 } from "../../matrix/Matrix4";

export class TextureShader extends SimpleShader {
  mTextureCoordinateRef: number;
  mSamplerRef: WebGLUniformLocation | null;
  constructor(vertexShaderPath: string, fragmentShaderPath: string) {
    super(vertexShaderPath, fragmentShaderPath);

    const gl = sysGL.get();
    const compiledShader = this.mCompiledShader!;

    this.mTextureCoordinateRef = gl.getAttribLocation(
      compiledShader,
      "aTextureCoordinate"
    );
    this.mSamplerRef = gl.getUniformLocation(compiledShader, "uSampler");
  }

  activate(
    pixelColor: Float32List,
    trsMatrix: TMatrix4,
    cameraMatrix: TMatrix4
  ) {
    super.activate(pixelColor, trsMatrix, cameraMatrix);

    const gl = sysGL.get();

    gl.bindBuffer(gl.ARRAY_BUFFER, this._getTextureCoordinateBuffer());
    gl.vertexAttribPointer(
      this.mTextureCoordinateRef,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    gl.enableVertexAttribArray(this.mTextureCoordinateRef);

    gl.uniform1i(this.mSamplerRef, 0);
  }

  _getTextureCoordinateBuffer() {
    return vertexBuffer.getTextureCoordinates();
  }
}
