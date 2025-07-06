"use strict";

let mCanvas: HTMLCanvasElement | null = null;
let mGL: WebGL2RenderingContext | null = null;

export function get() {
  return mGL;
}

export function init(htmlCanvasId: string) {
  mCanvas = document.getElementById(htmlCanvasId) as HTMLCanvasElement;

  if (!mCanvas) {
    throw new Error(`Canvas with id ${htmlCanvasId} not found.`);
  }

  mGL = mCanvas.getContext("webgl2");

  if (mGL === null) {
    document.write("<b>WebGL 2 is not supported by your browser.</b>");
  }
}
