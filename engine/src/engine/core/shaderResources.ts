"use strict";

import { SimpleShader } from "../shaders/SimpleShader.ts";
import { text } from "../entry.ts";
import * as resourceMap from "./resourceMap.ts";
import { TextureShader } from "../shaders/TextureShader.ts";
import { SpriteShader } from "../shaders/SpriteShader.ts";

const kSimpleVS = "src/shaders/SimpleVertexShader.glsl";
const kSimpleFS = "src/shaders/SimpleFragmentShader.glsl";

const kTextureVS = "src/shaders/TextureVertexShader.glsl";
const kTextureFS = "src/shaders/TextureFragmentShader.glsl";

let mSpriteShader: SpriteShader | null = null;
let mTextureShader: TextureShader | null = null;
let mConstColorShader: SimpleShader | null = null;

async function createShaders() {
  mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
  mTextureShader = new TextureShader(kTextureVS, kTextureFS);
  mSpriteShader = new SpriteShader(kTextureVS, kTextureFS);
}

export function init() {
  const loadPromise = new Promise<void>(async function (resolve) {
    await Promise.all([
      text.load(kSimpleFS),
      text.load(kSimpleVS),
      text.load(kTextureVS),
      text.load(kTextureFS),
    ]);
    resolve();
  }).then(function resolve() {
    createShaders();
  });

  resourceMap.pushPromise(loadPromise);
}

export function getSpriteShader() {
  return mSpriteShader!;
}

export function getTextureShader() {
  return mTextureShader!;
}

export function getConstColorShader() {
  return mConstColorShader!;
}

export function cleanUp() {
  mConstColorShader?.cleanUp();
  mTextureShader?.cleanUp();
  mSpriteShader?.cleanUp();

  text.unload(kSimpleFS);
  text.unload(kSimpleVS);
  text.unload(kTextureVS);
  text.unload(kTextureFS);
}
