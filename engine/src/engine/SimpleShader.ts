import type { TMatrix4 } from "../matrix/Matrix4.ts";
import * as sysGL from "./core/sysGL.ts";
import * as vertexBuffer from "./core/vertexBuffer.ts";

import * as text from "./resources/text.ts";

export class SimpleShader {
  mVertexShader: null | WebGLShader;
  mFragmentShader: null | WebGLShader;
  mCompiledShader: null | WebGLProgram;
  mVertexPositionRef: null | GLint;
  mPixelColorRef: null | WebGLUniformLocation;
  mModelMatrixRef: null | WebGLUniformLocation;
  mCameraMatrixRef: null | WebGLUniformLocation;

  mGl: WebGL2RenderingContext;

  constructor(vertexShaderId: string, fragmentShaderId: string) {
    this.mCompiledShader = null;
    this.mVertexPositionRef = null;
    this.mVertexShader = null;
    this.mFragmentShader = null;
    this.mPixelColorRef = null;
    this.mModelMatrixRef = null;
    this.mCameraMatrixRef = null;

    this.mGl = sysGL.get();

    this.mVertexShader = compileShader(vertexShaderId, this.mGl.VERTEX_SHADER);
    this.mFragmentShader = compileShader(
      fragmentShaderId,
      this.mGl.FRAGMENT_SHADER
    );

    this.mCompiledShader = this.mGl.createProgram();
    this.mGl.attachShader(this.mCompiledShader, this.mVertexShader);
    this.mGl.attachShader(this.mCompiledShader, this.mFragmentShader);
    this.mGl.linkProgram(this.mCompiledShader);

    if (
      !this.mGl.getProgramParameter(this.mCompiledShader, this.mGl.LINK_STATUS)
    ) {
      throw Error("Error linking shader in SimpleShader class");
    }

    this.mVertexPositionRef = this.mGl.getAttribLocation(
      this.mCompiledShader,
      "aVertexPosition"
    );
    this.mPixelColorRef = this.mGl.getUniformLocation(
      this.mCompiledShader,
      "uPixelColor"
    );
    this.mModelMatrixRef = this.mGl.getUniformLocation(
      this.mCompiledShader,
      "uModelXformMatrix"
    );
    this.mCameraMatrixRef = this.mGl.getUniformLocation(
      this.mCompiledShader,
      "uCameraXformMatrix"
    );
  }

  activate(
    pixelColor: Float32List,
    trsMatrix: TMatrix4,
    cameraMatrix: TMatrix4
  ) {
    const gl = sysGL.get();
    gl.useProgram(this.mCompiledShader);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
    gl.vertexAttribPointer(this.mVertexPositionRef!, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.mVertexPositionRef!);

    // load uniforms
    gl.uniform4fv(this.mPixelColorRef!, pixelColor);
    gl.uniformMatrix4fv(this.mModelMatrixRef, false, trsMatrix);
    gl.uniformMatrix4fv(this.mCameraMatrixRef, false, cameraMatrix);
  }

  cleanUp() {
    let gl = sysGL.get();
    gl.detachShader(this.mCompiledShader!, this.mVertexShader!);
    gl.detachShader(this.mCompiledShader!, this.mFragmentShader!);

    gl.deleteShader(this.mVertexShader);
    gl.deleteShader(this.mFragmentShader);
    gl.deleteProgram(this.mCompiledShader);
  }
}

function compileShader(filePath: string, shaderType: GLenum) {
  const gl = sysGL.get();

  const shaderSource = text.get(filePath);
  if (!shaderSource) {
    throw new Error("Warning: " + filePath + "not loaded!");
  }
  const compiledShader = gl.createShader(shaderType)!;

  gl.shaderSource(compiledShader, shaderSource);
  gl.compileShader(compiledShader);

  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    throw Error(
      "Error compiling shader in shaderSupport: " +
        gl.getShaderInfoLog(compiledShader)
    );
  }

  return compiledShader;
}
