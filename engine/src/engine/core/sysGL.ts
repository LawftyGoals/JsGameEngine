"use strict";

let mCanvas: HTMLCanvasElement | null = null;
let mGL: WebGL2RenderingContext | null = null;

export function get() {
  return mGL!;
}

export function init(htmlCanvasId: string) {
  mCanvas = document.getElementById(htmlCanvasId) as HTMLCanvasElement;

  if (!mCanvas) {
    throw new Error(`Canvas with id ${htmlCanvasId} not found.`);
  }

  mGL = mCanvas.getContext("webgl2")!;

  if (mGL === null) {
    document.write("<b>WebGL 2 is not supported by your browser.</b>");
  }

  mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
  mGL.enable(mGL.BLEND);

  mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true);


}

export function cleanUp() {
  if (mGL === null || mCanvas === null) {
    throw new Error("Engine cleanup: gl system not initialized.");
  }
  mGL = null;
  mCanvas.style.position = "fixed";
  mCanvas.style.backgroundColor = "rgba(200,200,200,0.5)";
  mCanvas = null;
  document.body.innerHTML +=
    "<br><br><h1>End of Game</h1><h2>GL System Ended</h2>";
}
