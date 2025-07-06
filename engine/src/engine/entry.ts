import * as sysGL from "./core/gl.ts";
import * as vertexBuffer from "./core/vertexBuffer.ts";
import * as shaderResources from "./core/shaderResources.ts";
import { Renderable } from "./Renderable.ts";

export async function init(htmlCanvasId: string) {
  sysGL.init(htmlCanvasId);
  vertexBuffer.init();
  await shaderResources.init();
}

export function clearCanvas(color: number[]) {
  const gl = sysGL.get()!;
  gl.clearColor(color[0], color[1], color[2], color[3]);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

export { Renderable };
