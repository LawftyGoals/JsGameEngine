"use strict";

import * as mGL from "./gl.ts";

let mGLVertexBuffer: WebGLBuffer | null = null;

export function get() {
  return mGLVertexBuffer;
}

const testSquare = [
  0.5, 0.5, 0.0, -0.5, 0.5, 0.0, 0.5, -0.5, 0.0, -0.5, -0.5, 0.0,
];

export function init() {
  const gl = mGL.get()!;

  mGLVertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(testSquare), gl.STATIC_DRAW);
}
