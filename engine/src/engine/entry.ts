import * as sysGL from "./core/sysGL.ts";
import * as vertexBuffer from "./core/vertexBuffer.ts";
import * as shaderResources from "./core/shaderResources.ts";
import { Renderable } from "./Renderable.ts";
import { Transform } from "./Transform.ts";
import { Camera } from "./Camera.ts";
import * as text from "./resources/text.ts";
import * as input from "./input.ts";
import * as xml from "./resources/xml.ts"

export function init(htmlCanvasId: string) {
  sysGL.init(htmlCanvasId);
  vertexBuffer.init();
  shaderResources.init();
  input.init();
}

export function clearCanvas(color: number[]) {
  const gl = sysGL.get();
  gl.clearColor(color[0], color[1], color[2], color[3]);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

export { Camera, input, Renderable, text, Transform, xml };
