"use strict";

import * as vertexBuffer from "./core/vertexBuffer.ts";
//import { SimpleShader } from "./SimpleShader.ts";
import { AsyncSimpleShader } from "./AsyncSimpleShader.ts";

let mGL: WebGL2RenderingContext | null = null;

export function getGL() {
  return mGL;
}

function initWebGl(canvasId: string) {
  const canvas = document.getElementById(canvasId);

  mGL = (canvas! as HTMLCanvasElement).getContext("webgl2");

  if (mGL === null) {
    document.write("<b>WebGL 2 is not supported by your browser.</b>");
  }
}

let mShader: AsyncSimpleShader | null = null;
async function createShader() {
  mShader = new AsyncSimpleShader();
  await mShader.runShaderProcess("SimpleVertexShader", "SimpleFragmentShader");
}

export function clearCanvas(color: number[]) {
  if (mGL) {
    mGL.clearColor(color[0], color[1], color[2], color[3]);
    mGL.clear(mGL.COLOR_BUFFER_BIT);
  }
}

export function drawSquare(color: Float32List) {
  mShader!.activate(color);
  mGL!.drawArrays(mGL!.TRIANGLE_STRIP, 0, 4);
}

export async function init(htmlCanvasId: string) {
  initWebGl(htmlCanvasId);
  vertexBuffer.init();
  await createShader();
}
