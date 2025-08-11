import * as sysGL from "./core/sysGL.ts";
import * as vertexBuffer from "./core/vertexBuffer.ts";
import * as shaderResources from "./core/shaderResources.ts";
import { Renderable } from "./renderables/Renderable.ts";
import { Transform } from "./Transform.ts";
import { Camera } from "./Camera.ts";
import * as text from "./resources/text.ts";
import * as input from "./input.ts";
import * as xml from "./resources/xml.ts";
import { Scene } from "./Scene.ts";
import * as loop from "./core/loop.ts";
import * as audio from "./resources/audio.ts";
import * as texture from "./resources/texture.ts";
import { TextureRenderable } from "./renderables/TextureRenderable.ts";
import { SpriteRenderable } from "./renderables/SpriteRenderable.ts";
import { eTextureCoordinatesIndex } from "./renderables/SpriteRenderable.ts";

export function init(htmlCanvasId: string) {
  sysGL.init(htmlCanvasId);
  vertexBuffer.init();
  shaderResources.init();
  input.init();
  audio.init();
}

export function clearCanvas(color: number[]) {
  const gl = sysGL.get();
  gl.clearColor(color[0], color[1], color[2], color[3]);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

export function cleanUp() {
  loop.cleanUp();
  input.cleanUp();
  shaderResources.cleanUp();
  vertexBuffer.cleanUp();
  sysGL.cleanUp();
  audio.cleanUp();
}

export { audio, Camera, eTextureCoordinatesIndex, input, Renderable, Scene, SpriteRenderable, text, texture, TextureRenderable, Transform, xml };
