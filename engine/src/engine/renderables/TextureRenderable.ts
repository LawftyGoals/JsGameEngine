"use strict";

import { Renderable } from "./Renderable";
import * as shaderResources from "../core/shaderResources";
import type { Camera } from "../Camera";
import { texture } from "../entry";

export class TextureRenderable extends Renderable {
  mTexture: string;
  constructor(texture: string) {
    super();
    super.setColor([1, 1, 1, 0]);
    super._setShader(shaderResources.getTextureShader());

    this.mTexture = texture;
  }

  draw(camera: Camera) {
    texture.activate(this.mTexture);

    super.draw(camera);
  }

  getTexture() {
    return this.mTexture;
  }

  setTexture(newTexture: string) {
    this.mTexture = newTexture;
  }
}
