import type { TMatrix4 } from "../../matrix/Matrix4.ts";
import * as sysGL from "../core/sysGL.ts";
import * as vertexBuffer from "../core/vertexBuffer.ts";

import * as text from "../resources/text.ts";

export class SimpleShader {
  mVertexShader: null | WebGLShader;
  mFragmentShader: null | WebGLShader;
  mCompiledShader: null | WebGLProgram;
  mVertexPositionRef: null | GLint;
  mPixelColorRef: null | WebGLUniformLocation;
  mModelMatrixRef: null | WebGLUniformLocation;
  mCameraMatrixRef: null | WebGLUniformLocation;

  constructor(vertexShaderId: string, fragmentShaderId: string) {
    this.mCompiledShader = null;
    this.mVertexPositionRef = null;
    this.mVertexShader = null;
    this.mFragmentShader = null;
    this.mPixelColorRef = null;
    this.mModelMatrixRef = null;
    this.mCameraMatrixRef = null;

    const gl = sysGL.get();

    this.mVertexShader = compileShader(vertexShaderId, gl.VERTEX_SHADER);
    this.mFragmentShader = compileShader(fragmentShaderId, gl.FRAGMENT_SHADER);

    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, this.mVertexShader);
    gl.attachShader(this.mCompiledShader, this.mFragmentShader);
    gl.linkProgram(this.mCompiledShader);

    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
      throw Error("Error linking shader in SimpleShader class");
    }

    this.mVertexPositionRef = gl.getAttribLocation(
      this.mCompiledShader,
      "aVertexPosition"
    );
    console.log(this.mVertexPositionRef);
    this.mPixelColorRef = gl.getUniformLocation(
      this.mCompiledShader,
      "uPixelColor"
    );
    this.mModelMatrixRef = gl.getUniformLocation(
      this.mCompiledShader,
      "uModelXformMatrix"
    );
    this.mCameraMatrixRef = gl.getUniformLocation(
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
