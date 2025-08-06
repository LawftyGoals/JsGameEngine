"use strict";

import * as mGL from "./sysGL.ts";

let mGLVertexBuffer: WebGLBuffer | null = null;
let mGLTextureCoordinatesBuffer: WebGLBuffer | null = null;

export function get() {
  return mGLVertexBuffer;
}

export function getTextureCoordinates() {
  return mGLTextureCoordinatesBuffer;
}

const mVerticesOfSquare = [
  0.5, 0.5, 0.0,
  -0.5, 0.5, 0.0,
  0.5, -0.5, 0.0,
  -0.5, -0.5, 0.0,
];

const mTextureCoordinates = [
  1.0, 1.0,
  0.0, 1.0,
  1.0, 0.0,
  0.0, 0.0
];

export function init() {
  const gl = mGL.get();

  mGLVertexBuffer = gl.createBuffer();
  mGLTextureCoordinatesBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);
  gl.bindBuffer(gl.ARRAY_BUFFER, mGLTextureCoordinatesBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mVerticesOfSquare), gl.STATIC_DRAW);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mTextureCoordinates), gl.STATIC_DRAW);
}

export function cleanUp() {
  const gl = mGL.get()!;
  if (mGLVertexBuffer) {
    gl.deleteBuffer(mGLVertexBuffer);
    mGLVertexBuffer = null;
  }

  if (mGLTextureCoordinatesBuffer) {
    gl.deleteBuffer(mGLTextureCoordinatesBuffer);
    mGLTextureCoordinatesBuffer = null;
  }
}
